/**
 * Öffentliche Consent-API der Website.
 *
 * Die eigentliche Logik liegt in `./consent/manager.ts` (Zustand, Speicherung,
 * Aktivierung von Diensten) und `./consent/registry.ts` (Kategorien und
 * Dienste). Diese Datei bindet den Manager global ein und verdrahtet die
 * Footer-Links „Cookie-Einstellungen" (`data-open-consent`).
 */

import { consentManager } from './consent/manager';

export { consentManager };
export type {
  ConsentCategoryId,
  ConsentServiceDefinition,
  ConsentCategoryDefinition,
} from './consent/registry';

document.querySelectorAll('[data-open-consent]').forEach((btn) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    consentManager.open('user');
  });
});
