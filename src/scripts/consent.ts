/**
 * Consent-Manager – leichtgewichtige, eigenständige Consent-Verwaltung.
 *
 * AUSTAUSCHBARKEIT (wichtig für die spätere agenturweite Lösung):
 * Die gesamte Consent-Logik liegt ausschließlich in dieser Datei und wird über
 * die unten definierte Schnittstelle `window.wbConsent` sowie das Event
 * `consent:changed` angesprochen. Der Rest der Website kennt nur:
 *
 *   1. `<script type="text/plain" data-consent-category="statistics">…</script>`
 *      → blockierte Skripte, die erst nach Einwilligung aktiviert werden
 *   2. Elemente mit `data-consent-placeholder="functional"`
 *      → Zwei-Klick-Inhalte (z. B. Google Maps), die auf Einwilligung reagieren
 *   3. Buttons mit `data-open-consent` → öffnen die Einstellungen erneut
 *
 * Eine andere Consent-Lösung (z. B. Usercentrics, Cookiebot, agentur-eigene
 * Lösung) muss lediglich dieselben drei Mechanismen bedienen bzw. dieses Modul
 * und die UI-Komponente `CookieConsent.astro` ersetzen.
 */

export type ConsentCategory = 'necessary' | 'functional' | 'statistics' | 'marketing';

export interface ConsentState {
  necessary: true;
  functional: boolean;
  statistics: boolean;
  marketing: boolean;
}

interface StoredConsent {
  version: number;
  timestamp: string;
  state: ConsentState;
}

/** Bei inhaltlichen Änderungen an den Kategorien Version erhöhen → Banner erscheint erneut. */
const CONSENT_VERSION = 1;
const STORAGE_KEY = 'willms-consent';

const DEFAULT_STATE: ConsentState = {
  necessary: true,
  functional: false,
  statistics: false,
  marketing: false,
};

function readStored(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function persist(state: ConsentState): void {
  const stored: StoredConsent = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    state,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    /* Storage nicht verfügbar (z. B. Privatmodus) – Consent gilt nur für die Sitzung */
  }
}

/**
 * Aktiviert blockierte Skripte der freigegebenen Kategorien.
 * Blockierte Skripte werden als `type="text/plain"` eingebunden und hier
 * durch ausführbare Klone ersetzt – erst NACH der Einwilligung.
 */
function activateBlockedScripts(state: ConsentState): void {
  const blocked = document.querySelectorAll<HTMLScriptElement>(
    'script[type="text/plain"][data-consent-category]'
  );
  blocked.forEach((script) => {
    const category = script.dataset.consentCategory as ConsentCategory;
    if (!state[category] || script.dataset.consentActivated === 'true') return;

    const clone = document.createElement('script');
    for (const { name, value } of Array.from(script.attributes)) {
      if (name === 'type' || name === 'data-consent-category') continue;
      clone.setAttribute(name, value);
    }
    if (script.dataset.src) {
      clone.src = script.dataset.src;
    } else {
      clone.textContent = script.textContent;
    }
    script.dataset.consentActivated = 'true';
    script.after(clone);
  });
}

function dispatchChange(state: ConsentState): void {
  document.dispatchEvent(new CustomEvent<ConsentState>('consent:changed', { detail: state }));
}

class ConsentManager {
  private state: ConsentState;
  private decided: boolean;

  constructor() {
    const stored = readStored();
    this.state = stored?.state ?? { ...DEFAULT_STATE };
    this.decided = stored !== null;
    if (this.decided) {
      activateBlockedScripts(this.state);
    }
  }

  /** Wurde bereits eine Entscheidung getroffen? (steuert Banner-Anzeige) */
  hasDecided(): boolean {
    return this.decided;
  }

  getConsent(): ConsentState {
    return { ...this.state };
  }

  hasConsent(category: ConsentCategory): boolean {
    return this.state[category] === true;
  }

  save(partial: Partial<Omit<ConsentState, 'necessary'>>): void {
    this.state = { ...this.state, ...partial, necessary: true };
    this.decided = true;
    persist(this.state);
    activateBlockedScripts(this.state);
    dispatchChange(this.state);
  }

  acceptAll(): void {
    this.save({ functional: true, statistics: true, marketing: true });
  }

  acceptNecessaryOnly(): void {
    this.save({ functional: false, statistics: false, marketing: false });
  }

  /** Öffnet den Einstellungs-Dialog (Implementierung liefert die UI-Komponente). */
  open(): void {
    document.dispatchEvent(new CustomEvent('consent:open'));
  }
}

declare global {
  interface Window {
    wbConsent: ConsentManager;
  }
  interface DocumentEventMap {
    'consent:changed': CustomEvent<ConsentState>;
    'consent:open': CustomEvent<void>;
  }
}

export const consentManager = new ConsentManager();
window.wbConsent = consentManager;

// Footer-Button(s) „Cookie-Einstellungen" verdrahten
document.querySelectorAll('[data-open-consent]').forEach((btn) => {
  btn.addEventListener('click', () => consentManager.open());
});
