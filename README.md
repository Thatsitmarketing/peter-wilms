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

## Design

Umsetzung nach der abgestimmten Design-Referenz:

- **Farben:** Rot `#E51E21`, Dunkelgrau `#333333`, Weiß/`#FAFAFA`, Footer Schwarz
- **Schriften:** Syne 700 (Headlines) und Inter 400/600 (Fließtext) – selbst
  gehostet über `@fontsource` (kein Google-Fonts-CDN → DSGVO-unkritisch)
- **Layout:** volle Seitenbreite mit 10 % Innenabstand links und rechts
  (`--gutter` in `src/styles/global.css`, unter 48 rem auf `1.5rem` reduziert,
  weil 10 % auf Mobilgeräten zu wenig Textbreite lassen). Alle Sections nutzen
  dafür `.container`.
- **Section-Reihenfolge (Startseite):** Vollbild-Hero mit Kennzahlen →
  Auftraggeber-Logoleiste → Leistungen (dunkle Bildkacheln) → Über uns →
  Videobereich → Ablauf (horizontaler Kartenstrang 01–04) → Unsere Projekte →
  Kundenstimmen → Job-CTA → FAQ → Kontaktformular
- **Section-Reihenfolge (Über Uns):** Hero → Wer wir sind (inkl. Eckdaten) →
  Qualifikationen → Firmengeschichte (Zeitstrahl) → Ansprechpartner →
  Auftraggeber-Logoleiste → FAQ → Kontaktformular

## Projektstruktur

```
src/
  data/site.ts               ← ALLE Inhalte (Texte, Leistungen, FAQ, Kontakte …)
  layouts/BaseLayout.astro   ← Grundgerüst (Header, Footer, Consent, Skripte)
  components/
    Header.astro / Footer.astro
    CookieConsent.astro      ← Consent-UI (Banner + Einstellungs-Dialog)
    sections/                ← Eine Datei pro Section, einzeln austauschbar
      Hero / ClientLogos / Services / About / VideoSection / Process /
      Projects / Testimonials / JobsCta / Faq / Contact
      about/                 ← nur für /ueber-uns
        AboutHero / AboutIntro / Qualifications / History / Team
  pages/
    index.astro              ← Startseite (Reihenfolge der Sections)
    ueber-uns.astro          ← Seite „Über Uns"
    impressum.astro          ← Platzhalter, Texte final abstimmen!
    datenschutz.astro        ← Platzhalter, Texte final abstimmen!
  scripts/
    consent.ts               ← Consent-Logik (siehe unten)
    animations.ts            ← Scroll-Reveal + Kennzahlen-Zähler
public/
  logo/                      ← Firmenlogo farbig + weiß (für dunkle Flächen)
  logos/                     ← Auftraggeber-/Partnerlogos der Logoleiste
  team/                      ← Porträts der Ansprechpartner
functions/
  api/contact.ts             ← Cloudflare Pages Function (Formular-Stub)
```

Inhalte ändern → fast immer nur `src/data/site.ts` anfassen.
Section-Reihenfolge ändern → `src/pages/index.astro`.

## Medien

Bereits eingepflegt (in `public/`):

- **Firmenlogo** in zwei Fassungen – farbig für helle Flächen, weiß für dunkle.
  Der Header blendet über dem Hero automatisch auf die weiße Fassung um.
- **Auftraggeber-/Partnerlogos** in der Logoleiste (`ClientLogos.astro`),
  standardmäßig in Graustufen, beim Hover in Originalfarbe.
- **Porträts** der drei Ansprechpartner auf der Seite „Über Uns".

Gepflegt werden diese Pfade in `src/data/site.ts` (`brandLogo`, `clients`,
`aboutPage.team`).

## Medien-Platzhalter

Die übrigen Bilder/Videos sind bewusst als klar erkennbare Platzhalter umgesetzt:
schraffierte Flächen (`.photo-placeholder`) mit Beschriftungs-Tag bzw. eine
Videobox mit Play-Symbol. Beim Einpflegen echter Medien die jeweilige
Platzhalterfläche durch `<img>`/`<Image>` (als `object-fit: cover`-Hintergrund)
bzw. eine echte Videoeinbindung ersetzen – die Beschriftung nennt jeweils das
vorgesehene Motiv.

## Datenschutz-System (Consent)

Die Website hat zwei automatische Betriebsmodi, gesteuert über die zentrale
Service-Registry `src/scripts/consent/registry.ts`:

- **Modus A (aktuell aktiv):** Kein optionaler Dienst ist in der Registry
  auf `enabled: true` gesetzt. Beim ersten Besuch wird ein zentrierter,
  reiner Datenschutz-Hinweis eingeblendet (kein Consent-Banner, keine
  fiktiven Statistik-/Marketing-Kategorien). Speicherung nur, dass der
  Hinweis gesehen wurde: `localStorage["peter_willms_privacy_notice"]`.
- **Modus B:** Sobald mindestens ein Dienst in der Registry auf
  `enabled: true` steht, wird automatisch der vollständige Consent-Dialog
  aktiviert (Alle akzeptieren / Alle ablehnen / Einstellungen). Vorbereitet
  sind (deaktiviert): Google Tag Manager, Google Analytics 4, Google Ads,
  Google Maps (Embed), externe Videodienste. Diese sind Blueprints ohne
  echte IDs oder Loader – vor Aktivierung müssen Anbieter-Daten,
  Datenschutzhinweise und die Consent-Version aktualisiert werden.

Öffnen des Dialogs: rotes Cookie-Widget links unten oder Footer-Link
„Cookie-Einstellungen" (`[data-open-consent]`). Zusätzlich verfügbar:
`window.wbConsent.open()`, Event `consent:changed`.

Struktur:

```
src/scripts/consent/
  registry.ts   ← Kategorien + Dienste (alle Zukunftsdienste enabled:false)
  manager.ts    ← Manager, Speicherung, Loader-Aufruf
src/scripts/consent.ts       ← Fassade, Footer-Verdrahtung
src/components/CookieConsent.astro    ← Widget + zentrierter Dialog
src/components/CookiePrivacyIcon.astro ← Baustellen-Cookie Inline-SVG
```

Speichernamen (First-Party `localStorage`, keine Cookies):

- `peter_willms_privacy_notice` – Modus A: Hinweis bestätigt
- `peter_willms_privacy_consent` – Modus B: Consent-Entscheidung
  (Version, Zeitpunkt, Ablauf 12 Monate, aktive Kategorien, Dienst-IDs)

## Offene Punkte vor Livegang

- [ ] Impressum und Datenschutzerklärung juristisch final abstimmen
- [ ] E-Mail-Dienstleister für `functions/api/contact.ts` festlegen und
      anbinden (aktuell nur Validierungs-Stub, keine E-Mail wird versandt)
- [ ] Echte Fotos/Videos für die Platzhalterflächen einpflegen
- [ ] Freigabe der Auftraggeber für die Verwendung ihrer Logos einholen
- [ ] Referenzprojekte mit echten Daten befüllen (`src/data/site.ts`)
- [ ] Finale Domain in `astro.config.mjs` (`site`) prüfen
