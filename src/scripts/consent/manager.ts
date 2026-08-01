/**
 * Consent-Manager – schlanke, datensparsame Implementierung.
 *
 * Zeigt eine einheitliche Consent-Oberfläche mit allen Kategorien; der Nutzer
 * entscheidet über "Alle akzeptieren", "Alle ablehnen" oder eine individuelle
 * Auswahl. Optionale Dienste laden nur, wenn sie in der Registry auf
 * `enabled: true` gesetzt sind UND die entsprechende Kategorie akzeptiert
 * wurde.
 *
 * Speichert ausschließlich First-Party in `localStorage` unter
 * `peter_willms_privacy_consent`. Keine Cookies, keine IP-Adressen, keine
 * Formulardaten, keine Nutzer-IDs.
 */

import {
  CONSENT_CATEGORIES,
  CONSENT_MAX_AGE_MS,
  CONSENT_SERVICES,
  CONSENT_VERSION,
  STORAGE_KEYS,
  getEnabledServices,
  hasEnabledServices,
  type ConsentCategoryDefinition,
  type ConsentCategoryId,
  type ConsentServiceDefinition,
} from './registry';

export type CategorySelection = Partial<Record<ConsentCategoryId, boolean>>;

export interface ConsentDecision {
  version: number;
  decidedAt: string;
  expiresAt: string;
  categories: CategorySelection;
  services: string[];
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
  categories: CategorySelection;
}

export interface ConsentOpenDetail {
  reason: 'user' | 'initial' | 'revision';
}

class ConsentManager {
  private currentCategories: CategorySelection = categoryDefaults();
  private hasDecidedFlag = false;

  constructor() {
    const decision = readDecision();
    if (decision) {
      this.currentCategories = { ...categoryDefaults(), ...decision.categories };
      this.hasDecidedFlag = true;
      runServiceLoaders(this.currentCategories);
    }
    /* Aufräumen: alten Notice-Key aus früheren Versionen entfernen. */
    safeRemove(STORAGE_KEYS.notice);
  }

  /** Wird derzeit mindestens ein optionaler Dienst tatsächlich geladen? */
  get hasActiveServices(): boolean {
    return hasEnabledServices();
  }

  get categories(): CategorySelection {
    return { ...this.currentCategories };
  }

  get allCategories(): readonly ConsentCategoryDefinition[] {
    return CONSENT_CATEGORIES;
  }

  get enabledServices(): ConsentServiceDefinition[] {
    return getEnabledServices();
  }

  getServicesByCategory(categoryId: ConsentCategoryId): ConsentServiceDefinition[] {
    return getEnabledServices().filter((s) => s.category === categoryId);
  }

  hasDecided(): boolean {
    return this.hasDecidedFlag;
  }

  hasConsent(category: ConsentCategoryId): boolean {
    return this.currentCategories[category] === true;
  }

  /**
   * Speichert eine explizite Auswahl aktiver Kategorien. Nicht angegebene
   * Kategorien werden als abgelehnt gewertet; die notwendige Kategorie bleibt
   * immer aktiv.
   */
  saveSelection(selection: CategorySelection): void {
    const previous = this.currentCategories;
    const next: CategorySelection = { ...categoryDefaults() };
    for (const cat of CONSENT_CATEGORIES) {
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
    const all: CategorySelection = {};
    for (const cat of CONSENT_CATEGORIES) {
      all[cat.id] = true;
    }
    this.saveSelection(all);
  }

  rejectAll(): void {
    const none: CategorySelection = {};
    for (const cat of CONSENT_CATEGORIES) {
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
        detail: { categories: this.categories },
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
