/**
 * Zentrale Consent-Service-Registry für die Website der Peter Willms
 * Bauunternehmung GmbH.
 *
 * Alle optionalen Dienste werden hier eingetragen. Solange kein Dienst mit
 * `enabled: true` registriert ist, arbeitet das Consent-System im Modus A
 * (nur ein reiner Datenschutz-Hinweis, keine Einwilligungsabfrage).
 *
 * Sobald mindestens ein optionaler Dienst aktiviert wird, wechselt das System
 * automatisch in Modus B (vollständiger Consent-Banner mit „Alle akzeptieren",
 * „Alle ablehnen", „Einstellungen").
 *
 * Die technische Aktivierung eines Dienstes darf ausschließlich in `loader()`
 * geschehen und nur nach vorhandener Einwilligung. Es dürfen KEINE Requests
 * an Drittanbieter, keine Skripte, keine Preconnects und keine Cookies vor
 * der Einwilligung erzeugt werden.
 */

export type ConsentCategoryId =
  | 'necessary'
  | 'functional'
  | 'analytics'
  | 'marketing'
  | 'externalMedia';

export interface ConsentCategoryDefinition {
  id: ConsentCategoryId;
  label: string;
  description: string;
  /** Notwendige Kategorie ist immer aktiv und kann nicht abgewählt werden. */
  required: boolean;
}

export interface ConsentServiceStorageEntry {
  name: string;
  type: 'cookie' | 'localStorage' | 'sessionStorage' | 'indexedDB' | 'other';
  /** Kurzbeschreibung des Zwecks. */
  purpose: string;
  /**
   * Speicherdauer als menschenlesbarer Text. Wenn nicht bekannt, bitte den
   * Wert `'Zur juristischen Prüfung'` verwenden statt zu erfinden.
   */
  duration: string;
}

export interface ConsentServiceDefinition {
  id: string;
  name: string;
  provider: string;
  /** Klar formulierter Zweck (was macht dieser Dienst konkret?). */
  purpose: string;
  category: ConsentCategoryId;
  /**
   * Solange `false`, wird der Dienst nirgends geladen, nicht im Dialog
   * angezeigt und beeinflusst den Betriebsmodus des Consent-Systems nicht.
   */
  enabled: boolean;
  /** Link zur Datenschutzerklärung des Anbieters. */
  providerPrivacyUrl: string;
  /**
   * Wichtigster Datenschutz-Hinweis für die Anzeige im Dialog (kurz).
   */
  privacyNote: string;
  /**
   * Hinweis auf Drittlandtransfer, falls einschlägig. Bei Unsicherheit
   * ausdrücklich als zu prüfen kennzeichnen.
   */
  thirdCountryTransfer?: string;
  storage: ConsentServiceStorageEntry[];
  /**
   * Wird ausschließlich nach Einwilligung aufgerufen. Muss idempotent sein
   * (mehrfacher Aufruf darf keine doppelten Skripte oder Requests erzeugen).
   */
  loader: () => void | Promise<void>;
  /**
   * Wird bei Widerruf aufgerufen. Muss alle vom Dienst angelegten Cookies /
   * Storage-Einträge entfernen und einen Reload empfehlen, sofern der Dienst
   * bereits in dieser Session geladen wurde.
   */
  cleanup: () => void | Promise<void>;
  /**
   * Consent-Version dieses Dienstes. Wird sie erhöht, muss die Einwilligung
   * erneut eingeholt werden.
   */
  version: number;
}

export const CONSENT_CATEGORIES: readonly ConsentCategoryDefinition[] = [
  {
    id: 'necessary',
    label: 'Notwendig',
    description:
      'Für den sicheren Betrieb dieser Website unverzichtbar (z. B. Speicherung Ihrer Datenschutz-Einstellungen).',
    required: true,
  },
  {
    id: 'functional',
    label: 'Funktion & Darstellung',
    description:
      'Erlaubt zusätzliche Funktionen zur Bedienung oder Darstellung der Website.',
    required: false,
  },
  {
    id: 'analytics',
    label: 'Statistik',
    description:
      'Anonymisierte Reichweitenmessung, um die Website zu verbessern.',
    required: false,
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description:
      'Erfolgsmessung von Werbung und personalisierte Werbeansprache.',
    required: false,
  },
  {
    id: 'externalMedia',
    label: 'Externe Inhalte',
    description:
      'Inhalte externer Anbieter (z. B. Karten, Videos), die erst nach Ihrer Einwilligung geladen werden.',
    required: false,
  },
] as const;

/**
 * Registry aller (potentiellen) optionalen Dienste.
 *
 * WICHTIG: Alle Einträge stehen aktuell auf `enabled: false`. Sie sind reine
 * Vorbereitungs-Blueprints und werden weder geladen noch angezeigt.
 *
 * Vor einer späteren Aktivierung eines Dienstes MÜSSEN:
 *  1. eine tatsächlich vorhandene Anbieter-ID / Konfiguration eingetragen,
 *  2. die Datenschutzerklärung entsprechend aktualisiert,
 *  3. die Angaben zu Cookies, Speicherdauer und Empfängern konkretisiert,
 *  4. die Consent-Version erhöht und
 *  5. der eigentliche Loader implementiert werden.
 *
 * Solange all das nicht erfolgt ist, bitte NICHT auf `enabled: true` schalten.
 */
export const CONSENT_SERVICES: readonly ConsentServiceDefinition[] = [
  {
    id: 'google-tag-manager',
    name: 'Google Tag Manager',
    provider: 'Google Ireland Limited',
    purpose:
      'Verwaltung und dynamisches Nachladen weiterer Google-Tracking-Dienste.',
    category: 'marketing',
    enabled: false,
    providerPrivacyUrl: 'https://policies.google.com/privacy',
    privacyNote:
      'Lädt weitere Google-Dienste (z. B. Analytics, Ads) über einen Container.',
    thirdCountryTransfer:
      'Zur juristischen Prüfung: potentielle Übermittlung an Google LLC (USA).',
    storage: [],
    loader: () => {
      /* Nicht aktiv – hier würde später der tatsächliche GTM-Loader stehen. */
    },
    cleanup: () => {
      /* Nicht aktiv. */
    },
    version: 1,
  },
  {
    id: 'google-analytics-4',
    name: 'Google Analytics 4',
    provider: 'Google Ireland Limited',
    purpose: 'Reichweitenmessung und Analyse der Nutzung dieser Website.',
    category: 'analytics',
    enabled: false,
    providerPrivacyUrl: 'https://policies.google.com/privacy',
    privacyNote: 'Verarbeitet Nutzungsdaten zur statistischen Auswertung.',
    thirdCountryTransfer:
      'Zur juristischen Prüfung: potentielle Übermittlung an Google LLC (USA).',
    storage: [],
    loader: () => {
      /* Nicht aktiv. */
    },
    cleanup: () => {
      /* Nicht aktiv. */
    },
    version: 1,
  },
  {
    id: 'google-ads',
    name: 'Google Ads / Remarketing',
    provider: 'Google Ireland Limited',
    purpose: 'Conversion-Messung und Retargeting für Werbekampagnen.',
    category: 'marketing',
    enabled: false,
    providerPrivacyUrl: 'https://policies.google.com/privacy',
    privacyNote:
      'Verarbeitet Nutzungsdaten zur Werbeauswertung und Zielgruppenbildung.',
    thirdCountryTransfer:
      'Zur juristischen Prüfung: potentielle Übermittlung an Google LLC (USA).',
    storage: [],
    loader: () => {
      /* Nicht aktiv. */
    },
    cleanup: () => {
      /* Nicht aktiv. */
    },
    version: 1,
  },
  {
    id: 'google-maps-embed',
    name: 'Google Maps (eingebettete Karte)',
    provider: 'Google Ireland Limited',
    purpose:
      'Darstellung einer interaktiven Karte innerhalb der Website. Ein normaler Link zu Google Maps ist davon nicht betroffen.',
    category: 'externalMedia',
    enabled: false,
    providerPrivacyUrl: 'https://policies.google.com/privacy',
    privacyNote:
      'Beim Laden einer eingebetteten Karte werden Daten (u. a. IP-Adresse) an Google übermittelt.',
    thirdCountryTransfer:
      'Zur juristischen Prüfung: potentielle Übermittlung an Google LLC (USA).',
    storage: [],
    loader: () => {
      /* Nicht aktiv. */
    },
    cleanup: () => {
      /* Nicht aktiv. */
    },
    version: 1,
  },
  {
    id: 'external-video',
    name: 'Externe Videodienste',
    provider: 'Zur juristischen Prüfung',
    purpose:
      'Einbindung von Videos externer Anbieter (z. B. YouTube, Vimeo). Aktuell ist kein externer Videodienst eingebunden.',
    category: 'externalMedia',
    enabled: false,
    providerPrivacyUrl: '',
    privacyNote:
      'Beim Abspielen können Nutzungsdaten an den jeweiligen Anbieter übermittelt werden.',
    thirdCountryTransfer:
      'Abhängig vom konkret gewählten Anbieter – vor Aktivierung prüfen.',
    storage: [],
    loader: () => {
      /* Nicht aktiv. */
    },
    cleanup: () => {
      /* Nicht aktiv. */
    },
    version: 1,
  },
] as const;

/** Gesamt-Consent-Version. Wird bei strukturellen Änderungen erhöht. */
export const CONSENT_VERSION = 1;

/** Speichernamen (First-Party localStorage, keine Cookies). */
export const STORAGE_KEYS = {
  consent: 'peter_willms_privacy_consent',
  notice: 'peter_willms_privacy_notice',
} as const;

/** Standard-Speicherdauer der Einwilligung in Millisekunden (12 Monate). */
export const CONSENT_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 365;

/** Anzeige-Konfiguration für den optionalen initialen Hinweis (Modus A). */
export const NOTICE_CONFIG = {
  /** Kann zentral abgeschaltet werden. */
  showInitialNotice: true,
} as const;

export function getEnabledServices(): ConsentServiceDefinition[] {
  return CONSENT_SERVICES.filter((service) => service.enabled);
}

export function hasEnabledServices(): boolean {
  return getEnabledServices().length > 0;
}

export function getActiveCategories(): ConsentCategoryDefinition[] {
  if (!hasEnabledServices()) {
    return CONSENT_CATEGORIES.filter((cat) => cat.required);
  }
  const usedCategoryIds = new Set<ConsentCategoryId>(['necessary']);
  for (const service of getEnabledServices()) {
    usedCategoryIds.add(service.category);
  }
  return CONSENT_CATEGORIES.filter((cat) => usedCategoryIds.has(cat.id));
}
