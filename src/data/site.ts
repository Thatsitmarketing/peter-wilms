/**
 * Zentrale Inhalts- und Konfigurationsdatei.
 * Alle Texte, Leistungen, FAQ-Einträge usw. werden hier gepflegt,
 * damit Sections später ohne Eingriff in die Komponenten angepasst werden können.
 */

export const company = {
  name: 'Peter Willms Bauunternehmung GmbH',
  shortName: 'Peter Willms Bauunternehmung',
  claim: 'Brücken- und Bauwerksinstandsetzung',
  since: 2006,
  address: {
    street: 'Münsterlandstraße 1',
    zip: '59320',
    city: 'Ennigerloh-Westkirchen',
    region: 'Nordrhein-Westfalen',
  },
  contact: {
    phoneCentral: '+49 2587 935006',
    phoneCentralDisplay: '+49 (0) 2587 / 93 50 06',
    phoneOffice: '+49 2587 3849936',
    phoneOfficeDisplay: '+49 (0) 2587 / 384 99 36',
    mobile: '+49 171 9814464',
    mobileDisplay: '+49 (0) 171 / 981 44 64',
    siteManagement: '+49 151 62459691',
    siteManagementDisplay: '+49 (0) 151 / 6245 96 91',
    fax: '+49 (0) 2587 / 935 94 27',
    email: 'willmsbauunternehmung@web.de',
  },
} as const;

export const hero = {
  badge: 'Spezialisiert seit 2006',
  /* Zeilenumbruch: „Bauwerksinstandsetzung" bleibt als Wort zusammen in Zeile 2 */
  title: 'Brücken- und<br>Bauwerksinstandsetzung',
  subline:
    'Fachgerechte Sanierung und Instandsetzung für öffentliche und gewerbliche Auftraggeber in ganz NRW',
  ctaPrimary: { label: 'Projekt anfragen', href: '#kontakt' },
  ctaSecondary: { label: 'Leistungen ansehen', href: '#leistungen' },
  /** Gütezeichen rechts unten im Hero – Platzhalter, echte Logos folgen */
  badges: ['RAL Gütezeichen', 'ib Instandsetzung von Betonbauwerken'],
} as const;

export const stats = [
  { value: 30, suffix: '+', label: 'Jahre Erfahrung' },
  { value: 500, suffix: '+', label: 'Abgeschlossene Projekte' },
  { value: 200, suffix: '+', label: 'zufriedene Auftraggeber' },
] as const;

/** Logoleiste – Auftraggeber und Partner (Dateien unter /public/logos). */
export const clients = [
  { name: 'Straßen.NRW', logo: '/logos/strassen-nrw.png' },
  { name: 'BLB Köln', logo: '/logos/blb-koeln.png' },
  { name: 'Stadt Minden', logo: '/logos/stadt-minden.png' },
  { name: 'Stadt Rietberg', logo: '/logos/stadt-rietberg.png' },
  { name: 'EUROVIA', logo: '/logos/eurovia.png' },
  { name: 'PORR', logo: '/logos/porr.png' },
  { name: 'Heitkamp', logo: '/logos/heitkamp.png' },
  { name: 'Göschler Gruppe', logo: '/logos/goeschler-gruppe.png' },
  { name: 'Karl Pollmann', logo: '/logos/karl-pollmann.png' },
] as const;

/** Firmenlogo in beiden Fassungen (farbig für helle, weiß für dunkle Flächen). */
export const brandLogo = {
  color: '/logo/peter-willms-bauunternehmung.png',
  white: '/logo/peter-willms-bauunternehmung-weiss.png',
  alt: 'Peter Willms Bauunternehmung – Brücken- und Bauwerksinstandsetzung',
} as const;

export const servicesSection = {
  title: 'Gebündelte Kompetenz für Ihre Sanierungsmaßnahme',
  intro:
    'Durch die Zusammenarbeit mit kompetenten Fachpartnern bieten wir das vollständige Leistungsspektrum der Bauwerksinstandsetzung — koordiniert, normkonform und termingerecht.',
} as const;

export const services = [
  {
    title: 'Betoninstandsetzung',
    description:
      'Sanierung von Schadstellen an Brücken und Ingenieurbauwerken – von Karbonatisierungs- und Chloridschäden bis zur Substanzerhaltung.',
  },
  {
    title: 'Rissverpressung',
    description:
      'Kraftschlüssige und dehnbare Verpressung von Rissen in Betonbauteilen – normgerecht und dokumentiert.',
  },
  {
    title: 'Oberflächenschutz & Korrosionsschutz',
    description:
      'Beschichtungssysteme für dauerhaften Schutz von Beton- und Stahlflächen, ausgeführt durch zertifizierte Fachkräfte.',
  },
  {
    title: 'PCC- & Mörtelspritzarbeiten',
    description:
      'Reprofilierung von Betonquerschnitten mit kunststoffmodifiziertem Zementmörtel – im Spritz- und Handauftrag.',
  },
  {
    title: 'Höchstdruck­wasserstrahlen',
    description:
      'Untergrundvorbereitung und schonender Abtrag geschädigter Betonschichten mit Höchstdruckwassertechnik.',
  },
  {
    title: 'Konstruktiver Ingenieur- und Betonbau',
    description:
      'Begleitende Betonbauarbeiten im Zuge der Instandsetzung – inklusive nachträglicher Bewehrungsanschlüsse.',
  },
  {
    title: 'Austausch von Fahrbahn­übergängen',
    description:
      'Ausbau und Einbau von Fahrbahnübergangskonstruktionen an Brückenbauwerken – termingerecht und verkehrssicher.',
  },
  {
    title: 'Bauwerksabdichtung',
    description:
      'Abdichtungsarbeiten an Brückentafeln, Tunneln und Ingenieurbauwerken für dauerhaften Bauwerksschutz.',
  },
] as const;

export const aboutSection = {
  kicker: 'Über uns',
  title: 'Ihr Partner für anspruchsvolle Instandsetzung',
  blocks: [
    {
      title: 'Spezialisiert seit Jahrzehnten',
      text: 'Brücken- und Bauwerksinstandsetzung ist bei uns nicht eine von vielen Leistungen – es ist das Einzige, womit wir uns seit Jahrzehnten beschäftigen. Dieses Wissen fließt in jede Beurteilung, jedes Angebot und jeden Handgriff auf der Baustelle ein.',
    },
    {
      title: 'Qualifikation, die zählt',
      text: 'SIVV- und KOR-Schein sind bei uns kein Zusatz für besondere Projekte — sie sind Standard. Alle Instandsetzungsarbeiten werden durch zertifizierte Fachkräfte ausgeführt, die die Anforderungen öffentlicher Ausschreibungen kennen und erfüllen.',
    },
    {
      title: 'Verantwortung aus einer Hand',
      text: 'Von der Verkehrssicherung nach RSA bis zur Abnahme übernehmen wir Verantwortung für Sicherheit, Termine und Qualität – verlässlich gegenüber Auftraggebern, Ingenieurbüros und Anwohnern.',
    },
  ],
} as const;

export const videoSection = {
  title: 'Einblicke in unsere Arbeit',
  duration: '2:30 Min.',
  note: 'Imagefilm – Platzhalter, Einbindung folgt',
} as const;

export const processSection = {
  title: 'Von der Anfrage bis zur Übergabe',
  intro:
    'Bauwerksinstandsetzung ist komplex. Wir sorgen dafür, dass jeder Schritt klar kommuniziert und fachgerecht ausgeführt wird.',
} as const;

/** Ablauf-Karten: theme = Farbwelt der Karte (wechselt wie in der Vorlage). */
export const processSteps = [
  {
    chip: 'Anfrage & Ausschreibung',
    subtitle: 'Ihr Projekt erreicht uns – wir melden uns',
    text: 'Ob Direktanfrage, Ausschreibungsverfahren oder Empfehlung: Wir nehmen jede Anfrage ernst und prüfen sie sorgfältig. Sie erhalten eine schnelle Rückmeldung und, wenn sinnvoll, einen ersten Ortstermin zur Bestandsaufnahme.',
    theme: 'light',
    photoLabel: 'Foto: Anfrage & Erstkontakt',
  },
  {
    chip: 'Prüfung & Beratung',
    subtitle: 'Technische Bewertung vor dem Angebot',
    text: 'Wir analysieren den Bauwerkszustand, klären den Sanierungsbedarf und bewerten die technischen Anforderungen. Auf dieser Grundlage erstellen wir ein fundiertes Angebot – transparent, nachvollziehbar und ohne versteckte Positionen.',
    theme: 'dark',
    photoLabel: 'Foto: Bauwerksprüfung vor Ort',
  },
  {
    chip: 'Planung & Koordination',
    subtitle: 'Strukturierte Vorbereitung für reibungslose Abläufe',
    text: 'Vor Baubeginn stimmen wir alle Details mit Ihnen ab: Terminplan, Baustellenorganisation, Verkehrssicherung nach RSA sowie die Abstimmung mit Ingenieurbüros, Bauverwaltungen und weiteren Beteiligten. Wir übernehmen die Koordination.',
    theme: 'red',
    photoLabel: 'Foto: Planung & Terminabstimmung',
  },
  {
    chip: 'Ausführung & Übergabe',
    subtitle: 'Fachgerechte Umsetzung bis zur Abnahme',
    text: 'Unsere qualifizierten Kolonnen führen die Arbeiten nach den einschlägigen Regelwerken aus – mit laufender Qualitätssicherung, lückenloser Dokumentation und einer sauberen Übergabe des Bauwerks.',
    theme: 'light',
    photoLabel: 'Foto: Ausführung auf der Baustelle',
  },
] as const;

export const projectsSection = {
  title: 'Unsere Projekte',
} as const;

/** Referenzprojekte – Platzhalterinhalte, echte Projektdaten folgen. */
export const projects = [
  {
    title: 'Brückeninstandsetzung an einer Landesstraße',
    meta: 'Öffentlicher Auftraggeber · Betoninstandsetzung, Kappensanierung',
  },
  {
    title: 'Fahrbahnübergänge an einem Autobahnbauwerk',
    meta: 'Nachunternehmer · Fahrbahnübergänge, Betonbau',
  },
  {
    title: 'Rissverpressung an einem Ingenieurbauwerk',
    meta: 'Ingenieurbüro · Rissverpressung, Injektion',
  },
] as const;

export const testimonialsSection = {
  title: 'Was Auftraggeber über die Zusammenarbeit sagen',
} as const;

export const testimonials = [
  {
    quote:
      'Sie suchen einen menschlichen und zuverlässigen Partner? Dann sind Sie bei der Peter Willms Bauunternehmung GmbH genau richtig.',
    name: 'Dipl.-Ing. Marco Tankulic',
    role: 'Prokurist und Bauleitung',
    logoLabel: 'Logo Auftraggeber',
  },
  {
    quote:
      'Termintreu, sauber dokumentiert und fachlich überzeugend – die Zusammenarbeit auf der Baustelle war jederzeit verlässlich. (Platzhalter – Kundenstimme folgt.)',
    name: '[Name folgt]',
    role: '[Funktion, Unternehmen]',
    logoLabel: 'Logo Auftraggeber',
  },
  {
    quote:
      'Von der Angebotsphase bis zur Abnahme ein Partner auf Augenhöhe – gerade bei kurzfristigen Änderungen. (Platzhalter – Kundenstimme folgt.)',
    name: '[Name folgt]',
    role: '[Funktion, Unternehmen]',
    logoLabel: 'Logo Auftraggeber',
  },
] as const;

export const jobsSection = {
  title: 'Neuer Job? Pack’s an – Mit Uns',
  text: 'Bauen ist Teamwork. Werde Teil unseres Teams und lege den Grundstein für Deinen beruflichen Erfolg.',
  ctaLabel: 'Jetzt bewerben',
} as const;

export const faqSection = {
  kicker: 'FAQ',
  title: 'Alles, was Sie wissen müssen',
  ctaLabel: 'Kontakt aufnehmen',
} as const;

export const faq = [
  {
    question: 'Welche Qualifikationen haben Ihre Fachkräfte für Betoninstandsetzung?',
    answer:
      'Unsere Kolonnen werden von Fachkräften mit SIVV-Schein (Schützen, Instandsetzen, Verbinden und Verstärken von Betonbauteilen) und KOR-Schein (Korrosionsschutz) geführt. Dazu kommen Fachkräfte für Arbeitssicherheit. Diese Qualifikationen sind bei uns Standard – nicht die Ausnahme.',
  },
  {
    question: 'Können Sie Rissverpressungen an tragenden Bauteilen durchführen?',
    answer:
      'Ja. Wir führen kraftschlüssige und dehnbare Rissverpressungen auch an tragenden Bauteilen aus – nach den einschlägigen Regelwerken und mit vollständiger Dokumentation der Injektionsarbeiten.',
  },
  {
    question: 'Können wir Sie auch als Nachunternehmer für größere Bauprojekte beauftragen?',
    answer:
      'Ja. Neben Aufträgen für öffentliche Auftraggeber übernehmen wir regelmäßig spezialisierte Instandsetzungsleistungen als Nachunternehmer für Bau- und Generalunternehmen – zuverlässig, termingerecht und mit eigenem qualifiziertem Personal.',
  },
  {
    question: 'Übernehmen Sie die gesamte Koordination auf der Baustelle?',
    answer:
      'Ja. Auf Wunsch übernehmen wir die komplette Koordination – von der Baustelleneinrichtung über die Verkehrssicherung nach RSA bis zur Abstimmung mit Ingenieurbüros, Bauverwaltungen und weiteren Gewerken.',
  },
  {
    question: 'Nach welchen Normen und Richtlinien arbeiten Sie?',
    answer:
      'Wir arbeiten nach den einschlägigen Regelwerken der Betoninstandsetzung, unter anderem DAfStb-Richtlinie, ZTV-ING, DIN EN 1504 sowie den RSA für die Verkehrssicherung. Die Einhaltung wird durch unsere qualifizierten Fachkräfte sichergestellt und dokumentiert.',
  },
] as const;

export const contactSection = {
  title: 'Projekt anfragen',
  text: 'Ob Ausschreibung, Direktvergabe oder Nachunternehmerleistung – wir melden uns kurzfristig zurück.',
} as const;

/* ============================================================
   Seite „Über Uns“ (/ueber-uns)
   ============================================================ */

export const aboutPage = {
  hero: {
    kicker: 'Über uns',
    title: 'Spezialisiert. Erfahren. Verlässlich.',
    subline:
      'Seit Jahrzehnten stehen wir für die fachgerechte Instandsetzung von Brücken, Betonbauwerken und Infrastruktur – mit dem Anspruch, Bausubstanz zu erhalten statt sie zu ersetzen.',
  },
  intro: {
    kicker: 'Wer wir sind',
    title: 'Spezialisiert auf Betonbauwerke und Infrastruktur seit über 30 Jahren.',
    paragraphs: [
      'Von unserem Standort in Ennigerloh-Westkirchen aus sind wir auf die Instandsetzung von Brücken- und Betonbauwerken spezialisiert. Was als Nebengewerbe eines gelernten Maurers begann, ist heute ein etablierter Fachbetrieb mit eigenen Kolonnen, eigener Technik und einem klaren Schwerpunkt.',
      'Zu unseren Auftraggebern zählen Kommunen und Landesbetriebe, Ingenieurbüros sowie General- und Bauunternehmen, die eine termingerechte, normkonforme Ausführung durch qualifiziertes Fachpersonal erwarten.',
      'Unser Leistungsspektrum reicht von der Betoninstandsetzung über Korrosionsschutz und den Austausch von Fahrbahnübergängen bis zur Bauwerksabdichtung – koordiniert aus einer Hand.',
    ],
  },
  qualifications: {
    kicker: 'Qualifikationen',
    title: 'Zertifiziert für anspruchsvolle Anforderungen im Ingenieurbau.',
    intro:
      'Betoninstandsetzung und Korrosionsschutz im öffentlichen Infrastrukturbereich stellen hohe Anforderungen an Qualifikation, Normkenntnis und Ausführungsqualität. Unsere Fachkräfte verfügen über die notwendigen Nachweise und werden regelmäßig geschult.',
    items: [
      {
        title: 'SIVV-Schein',
        subtitle: 'Schützen, Instandsetzen, Verbinden, Verstärken',
        text: 'Unsere Fachkräfte sind nach der DAfStb-Richtlinie qualifiziert und berechtigt, Betoninstandsetzungsarbeiten gemäß geltender Normen auszuführen.',
      },
      {
        title: 'KOR-Schein',
        subtitle: 'Korrosionsschutz nach Vorschrift',
        text: 'Fachkundige Ausführung von Korrosionsschutzarbeiten an Stahlbauteilen und Bewehrungsanschlüssen durch zertifiziertes Personal.',
      },
      {
        title: 'RSA',
        subtitle: 'Baustellenabsicherung nach Richtlinien',
        text: 'Professionelle Absicherung von Arbeitsstellen an Straßen gemäß der Richtlinien für die Sicherung von Arbeitsstellen (RSA) — zuverlässig und regelkonform.',
      },
      {
        title: 'ZTV-ING / ZTV-SIB',
        subtitle: 'Regelwerke im Brücken- und Ingenieurbau',
        text: 'Erfahrung in der Ausführung nach ZTV-ING und ZTV-SIB — die maßgebenden technischen Vorschriften für Instandsetzungsarbeiten an Bundesfernstraßen und Ingenieurbauwerken.',
      },
      {
        title: 'DIN EN 1504',
        subtitle: 'Normkonforme Betoninstandsetzung',
        text: 'Alle Instandsetzungsmaßnahmen werden nach DIN EN 1504 geplant und ausgeführt — von der Zustandserfassung bis zur abschließenden Qualitätssicherung.',
      },
      {
        title: 'VOB-Erfahrung',
        subtitle: 'Öffentliche Ausschreibungen und Vergabeverfahren',
        text: 'Langjährige Erfahrung in der Abwicklung von Projekten nach VOB — von der Angebotsphase bis zur Abnahme und Dokumentation.',
      },
    ],
  },
  history: {
    kicker: 'Unsere Geschichte',
    title: 'Vom Nebengewerbe zum Spezialisten für Bauwerks­instandsetzung.',
    milestones: [
      {
        year: '2006',
        title: 'Der Anfang',
        text: 'Der gelernte Maurer Peter Willms startet im Nebengewerbe: Kellerabdichtungen, Bodenbeschichtungen und Balkonsanierungen.',
      },
      {
        year: '2012',
        title: 'Industriemeister Hochbau',
        text: 'Peter Willms schließt die Weiterbildung zum Industriemeister Hochbau ab und legt damit die fachliche Grundlage für größere Bauvorhaben.',
      },
      {
        year: '2014',
        title: 'Volle Spezialisierung',
        text: 'Der Betrieb konzentriert sich vollständig auf die Brücken- und Bauwerksinstandsetzung. Die ersten Aufträge öffentlicher Auftraggeber folgen.',
      },
      {
        year: '2015',
        title: 'Verstärkung und neuer Standort',
        text: 'Dipl.-Ing. Marco Tankulic kommt für die Bauleitung an Bord. Der Betrieb zieht an die Münsterlandstraße 1 in Ennigerloh-Westkirchen.',
      },
      {
        year: '2016',
        title: 'Umwandlung in eine GmbH',
        text: 'Zum 1. Januar wird aus dem Einzelbetrieb die Peter Willms Bauunternehmung GmbH. Im Oktober erhält Marco Tankulic Prokura.',
      },
      {
        year: '2017',
        title: 'Zweite Halle',
        text: 'Der Bau einer zweiten Lagerhalle schafft Platz für Technik, Material und die wachsende Zahl an Baustellen.',
      },
      {
        year: 'Heute',
        title: 'Etablierter Spezialist in NRW',
        text: '13 Mitarbeiter und rund 4,5 Mio. € Jahresumsatz: ein fest etablierter Spezialist für Brücken- und Bauwerksinstandsetzung in Nordrhein-Westfalen.',
      },
    ],
  },
  facts: [
    { value: '13', label: 'Mitarbeiter' },
    { value: '4,5 Mio. €', label: 'Jahresumsatz' },
    { value: '2006', label: 'Gegründet' },
  ],
  team: {
    kicker: 'Ansprechpartner',
    title: 'Die Menschen hinter der Bauunternehmung.',
    intro:
      'Kurze Wege, feste Ansprechpartner: Bei uns sprechen Sie mit den Personen, die Ihr Projekt auch tatsächlich verantworten.',
    members: [
      {
        name: 'Peter Willms',
        role: 'Geschäftsführung',
        qualification: 'Maurer · Industriemeister Hochbau',
        text: 'Gründer des Unternehmens und seit 2006 dabei. Er bringt handwerkliche Tiefe und unternehmerische Erfahrung in jedes Projekt ein – und ist auf den Baustellen genauso zu Hause wie im Angebotsgespräch.',
        photo: '/team/peter-willms.jpg',
      },
      {
        name: 'Verena Willms',
        role: 'Geschäftsführung',
        qualification: 'Kaufmännische Leitung',
        text: 'Verantwortet die kaufmännische Leitung des Unternehmens – von der Beschaffung über die Vertragsabwicklung bis zur Abrechnung öffentlicher Bauvorhaben.',
        photo: '/team/verena-willms.jpg',
      },
      {
        name: 'Dipl.-Ing. Marco Tankulic',
        role: 'Prokurist · Oberbauleitung',
        qualification: 'Im Unternehmen seit 2015 · Prokura seit 2016',
        text: 'Leitet die technische Bauleitung und Kalkulation und begleitet Projekte von der Angebotsphase bis zum Projektabschluss – Ansprechpartner für Auftraggeber und Ingenieurbüros.',
        photo: '/team/marco-tankulic.jpg',
      },
    ],
  },
} as const;

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Über Uns', href: '/ueber-uns' },
  { label: 'Projekte', href: '/projekte' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Kontakt', href: '/kontakt' },
] as const;

export const footerNav = {
  leistungen: [
    { label: 'Über Uns', href: '/ueber-uns' },
    { label: 'Leistungen', href: '/#leistungen' },
    { label: 'Ablauf', href: '/#ablauf' },
    { label: 'Projekte', href: '/#projekte' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Kontakt', href: '/#kontakt' },
  ],
} as const;
