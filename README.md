# Peter Willms Bauunternehmung GmbH – Website

Neue Website für die Peter Willms Bauunternehmung GmbH (Brücken- und
Bauwerksinstandsetzung, Ennigerloh-Westkirchen). Gebaut mit
[Astro](https://astro.build), vorbereitet für Deployment auf **Cloudflare Pages**.

## Entwicklung

```bash
npm install
npm run dev       # Entwicklungsserver unter http://localhost:4321
npm run build     # Statischer Build nach ./dist
npm run preview   # Build lokal testen
```

## Deployment auf Cloudflare Pages

1. Repository mit Cloudflare Pages verbinden
2. Build-Kommando: `npm run build`
3. Output-Verzeichnis: `dist`
4. Das Verzeichnis `functions/` wird von Cloudflare Pages automatisch als
   Pages Functions deployt (Formular-Endpoint `POST /api/contact`)

## Projektstruktur

```
src/
  data/site.ts               ← ALLE Inhalte (Texte, Leistungen, FAQ, Kontakte …)
  layouts/BaseLayout.astro   ← Grundgerüst (Header, Footer, Consent, Skripte)
  components/
    Header.astro / Footer.astro
    CookieConsent.astro      ← Consent-UI (Banner + Einstellungs-Dialog)
    MediaPlaceholder.astro   ← Platzhalter für Bilder/Videos
    ServiceIcon.astro        ← Inline-SVG-Icons der Leistungskacheln
    sections/                ← Eine Datei pro Section, einzeln austauschbar
  pages/
    index.astro              ← Startseite (Reihenfolge der Sections)
    impressum.astro          ← Platzhalter, Texte final abstimmen!
    datenschutz.astro        ← Platzhalter, Texte final abstimmen!
  scripts/
    consent.ts               ← Consent-Logik (siehe unten)
    animations.ts            ← Scroll-Reveal, Zähler, Prozess-Hervorhebung
functions/
  api/contact.ts             ← Cloudflare Pages Function (Formular-Stub)
```

Inhalte ändern → fast immer nur `src/data/site.ts` anfassen.
Section-Reihenfolge ändern → `src/pages/index.astro`.

## Medien-Platzhalter

Alle Bilder/Videos sind bewusst als klar erkennbare Platzhalter
(`MediaPlaceholder.astro`, schraffierte Boxen mit Beschriftung) umgesetzt.
Beim Einpflegen echter Medien die jeweilige `<MediaPlaceholder …/>`-Instanz
durch `<img>`/`<Image>` bzw. eine echte Videoeinbindung ersetzen.

## Cookie Consent / DSGVO

- **Kategorien:** notwendig, Darstellung/Funktion, Statistik, Marketing
- **Blockierung:** Nicht notwendige Skripte werden als
  `<script type="text/plain" data-consent-category="statistics" data-src="…">`
  eingebunden und erst nach Einwilligung aktiviert
- **Zwei-Klick-Inhalte:** Google Maps lädt erst nach Klick + Einwilligung
  (Kategorie „Darstellung & Funktion"), vorher fließen keine Daten an Google
- **Wiederöffnen:** Footer-Link „Cookie-Einstellungen" (`data-open-consent`)
- **Speicherung:** `localStorage` (`willms-consent`), versioniert – bei
  Kategorie-Änderungen `CONSENT_VERSION` in `src/scripts/consent.ts` erhöhen,
  dann erscheint der Banner erneut
- **Keine externen Fonts/Skripte:** Systemschriften, alles First-Party

### Austausch gegen eine agenturweite Consent-Lösung

Die gesamte Logik liegt in `src/scripts/consent.ts` (API: `window.wbConsent`,
Events `consent:changed` / `consent:open`), die UI in
`src/components/CookieConsent.astro`. Für einen Wechsel (z. B. Usercentrics,
Cookiebot, Eigenlösung) müssen nur diese beiden Dateien ersetzt werden – der
Rest der Website nutzt ausschließlich die drei dokumentierten Mechanismen
(blockierte Skripte, `data-consent-placeholder`, `data-open-consent`).

## Offene Punkte vor Livegang

- [ ] Impressum und Datenschutzerklärung juristisch final abstimmen (Platzhalter!)
- [ ] Echte Fotos/Videos und Auftraggeber-Logos (mit Freigabe) einpflegen
- [ ] Referenzprojekte mit echten Daten befüllen (`src/data/site.ts`)
- [ ] E-Mail-Versand des Kontaktformulars anbinden (`functions/api/contact.ts`)
- [ ] Finale Domain in `astro.config.mjs` (`site`) prüfen
