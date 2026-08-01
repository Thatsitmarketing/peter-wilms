/**
 * Consent-Manager – schlanke, datensparsame Implementierung.
 *
 * Zwei Betriebsmodi (abgeleitet aus der Service-Registry):
 *   Modus A – kein optionaler Dienst aktiv: der zentrierte Hinweis ist reine
 *             Information, es wird keine Einwilligung eingeholt.
 *   Modus B – mindestens ein optionaler Dienst ist aktiv: vollständiger
 *             Consent-Dialog mit "Alle akzeptieren", "Alle ablehnen",
 *             "Einstellungen".
 *
 * Speichert ausschließlich First-Party in `localStorage`:
 *   - `peter_willms_privacy_consent` (nur in Modus B nach Entscheidung)
 *   - `peter_willms_privacy_notice`  (in Modus A nach Bestätigung "Verstanden")
 *
 * Es werden keine Cookies, keine IP-Adressen, keine Formulardaten und keine
 * Nutzer-IDs gespeichert.
 */

import {
  CONSENT_CATEGORIES,
  CONSENT_MAX_AGE_MS,
  CONSENT_SERVICES,
  CONSENT_VERSION,
  STORAGE_KEYS,
  getActiveCategories,
  getEnabledServices,
  hasEnabledServices,
  type ConsentCategoryDefinition,
  type ConsentCategoryId,
  type ConsentServiceDefinition,
} from './registry';

export type ConsentMode = 'notice-only' | 'full-consent';

export type CategorySelection = Partial<Record<ConsentCategoryId, boolean>>;

export interface ConsentDecision {
  version: number;
  decidedAt: string;
  expiresAt: string;
  categories: CategorySelection;
  services: string[];
}

interface NoticeAcknowledgement {
  version: number;
  acknowledgedAt: string;
}

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function safeWrite(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Storage nicht verfügbar (z. B. Privatmodus) – Entscheidung gilt für die Session. */
  }
}

function safeRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

function nowIso(): string {
  return new Date().toISOString();
}

function expiryIso(): string {
  return new Date(Date.now() + CONSENT_MAX_AGE_MS).toISOString();
}

function readDecision(): ConsentDecision | null {
  const decision = safeParse<ConsentDecision>(localStorage.getItem(STORAGE_KEYS.consent));
  if (!decision || decision.version !== CONSENT_VERSION) return null;
  if (Date.parse(decision.expiresAt) < Date.now()) return null;
  const currentServiceIds = getEnabledServices()
    .map((s) => s.id)
    .sort()
    .join('|');
  const storedServiceIds = [...decision.services].sort().join('|');
  if (currentServiceIds !== storedServiceIds) return null;
  return decision;
}

function readNotice(): NoticeAcknowledgement | null {
  const notice = safeParse<NoticeAcknowledgement>(
    localStorage.getItem(STORAGE_KEYS.notice),
  );
  if (!notice || notice.version !== CONSENT_VERSION) return null;
  return notice;
}

function categoryDefaults(): CategorySelection {
  const defaults: CategorySelection = {};
  for (const cat of CONSENT_CATEGORIES) {
    defaults[cat.id] = cat.required;
  }
  return defaults;
}

function runServiceLoaders(categories: CategorySelection): void {
  for (const service of getEnabledServices()) {
    if (categories[service.category]) {
      try {
        void service.loader();
      } catch (error) {
        console.error(`[consent] Loader für Dienst "${service.id}" fehlgeschlagen`, error);
      }
    }
  }
}

function runServiceCleanups(previous: CategorySelection, next: CategorySelection): void {
  for (const service of getEnabledServices()) {
    const wasAllowed = previous[service.category] === true;
    const isAllowed = next[service.category] === true;
    if (wasAllowed && !isAllowed) {
      try {
        void service.cleanup();
      } catch (error) {
        console.error(`[consent] Cleanup für Dienst "${service.id}" fehlgeschlagen`, error);
      }
    }
  }
}

export interface ConsentChangeDetail {
  mode: ConsentMode;
  categories: CategorySelection;
}

export interface ConsentOpenDetail {
  reason: 'user' | 'initial' | 'revision';
}

class ConsentManager {
  private currentCategories: CategorySelection = categoryDefaults();
  private hasDecidedFlag = false;

  constructor() {
    if (this.mode === 'full-consent') {
      const decision = readDecision();
      if (decision) {
        this.currentCategories = { ...categoryDefaults(), ...decision.categories };
        this.hasDecidedFlag = true;
        runServiceLoaders(this.currentCategories);
      }
    } else {
      this.hasDecidedFlag = readNotice() !== null;
    }
  }

  get mode(): ConsentMode {
    return hasEnabledServices() ? 'full-consent' : 'notice-only';
  }

  get categories(): CategorySelection {
    return { ...this.currentCategories };
  }

  get activeCategories(): ConsentCategoryDefinition[] {
    return getActiveCategories();
  }

  get enabledServices(): ConsentServiceDefinition[] {
    return getEnabledServices();
  }

  hasDecided(): boolean {
    return this.hasDecidedFlag;
  }

  hasConsent(category: ConsentCategoryId): boolean {
    return this.currentCategories[category] === true;
  }

  /**
   * Modus A: einfache Bestätigung, dass der Datenschutz-Hinweis gesehen wurde.
   * Speichert keinerlei Consent-Zustand für Dienste.
   */
  acknowledgeNotice(): void {
    if (this.mode !== 'notice-only') return;
    const ack: NoticeAcknowledgement = {
      version: CONSENT_VERSION,
      acknowledgedAt: nowIso(),
    };
    safeWrite(STORAGE_KEYS.notice, ack);
    this.hasDecidedFlag = true;
    this.dispatchChange();
  }

  /**
   * Modus B: speichert eine explizite Auswahl aktiver Kategorien.
   * Nicht angegebene Kategorien werden als abgelehnt gewertet.
   */
  saveSelection(selection: CategorySelection): void {
    if (this.mode !== 'full-consent') return;
    const previous = this.currentCategories;
    const next: CategorySelection = { ...categoryDefaults() };
    for (const cat of this.activeCategories) {
      next[cat.id] = cat.required ? true : selection[cat.id] === true;
    }
    this.currentCategories = next;
    this.hasDecidedFlag = true;

    const decision: ConsentDecision = {
      version: CONSENT_VERSION,
      decidedAt: nowIso(),
      expiresAt: expiryIso(),
      categories: next,
      services: getEnabledServices().map((s) => s.id),
    };
    safeWrite(STORAGE_KEYS.consent, decision);
    runServiceCleanups(previous, next);
    runServiceLoaders(next);
    this.dispatchChange();
  }

  acceptAll(): void {
    if (this.mode !== 'full-consent') return;
    const all: CategorySelection = {};
    for (const cat of this.activeCategories) {
      all[cat.id] = true;
    }
    this.saveSelection(all);
  }

  rejectAll(): void {
    if (this.mode !== 'full-consent') return;
    const none: CategorySelection = {};
    for (const cat of this.activeCategories) {
      none[cat.id] = cat.required;
    }
    this.saveSelection(none);
  }

  reset(): void {
    safeRemove(STORAGE_KEYS.consent);
    safeRemove(STORAGE_KEYS.notice);
    this.currentCategories = categoryDefaults();
    this.hasDecidedFlag = false;
    this.dispatchChange();
  }

  open(reason: ConsentOpenDetail['reason'] = 'user'): void {
    document.dispatchEvent(
      new CustomEvent<ConsentOpenDetail>('consent:open', { detail: { reason } }),
    );
  }

  private dispatchChange(): void {
    document.dispatchEvent(
      new CustomEvent<ConsentChangeDetail>('consent:changed', {
        detail: { mode: this.mode, categories: this.categories },
      }),
    );
  }
}

declare global {
  interface Window {
    wbConsent: ConsentManager;
  }
  interface DocumentEventMap {
    'consent:changed': CustomEvent<ConsentChangeDetail>;
    'consent:open': CustomEvent<ConsentOpenDetail>;
  }
}

export const consentManager = new ConsentManager();
window.wbConsent = consentManager;

export { CONSENT_CATEGORIES, CONSENT_SERVICES, CONSENT_VERSION };
