/**
 * Zentrale Inhalts- und Konfigurationsdatei.
 * Alle Texte, Leistungen, FAQ-Einträge usw. werden hier gepflegt,
 * damit Sections später ohne Eingriff in die Komponenten angepasst werden können.
 */

export const company = {
  name: 'Peter Willms Bauunternehmung GmbH',
  shortName: 'Willms Bauunternehmung',
  claim: 'Spezialisiert auf Brücken- und Bauwerksinstandsetzung',
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

export const stats = [
  { value: 30, suffix: '+', label: 'Jahre Erfahrung im Team' },
  { value: 500, suffix: '+', label: 'Abgeschlossene Projekte' },
  { value: 200, suffix: '+', label: 'Zufriedene Auftraggeber' },
] as const;

/** Logoleiste – Platzhalter, echte Logos folgen nach Freigabe der Auftraggeber. */
export const clients = [
  'Straßen.NRW',
  'Stadt Minden',
  'EUROVIA',
  'PORR',
  'Heitkamp',
  'BLB NRW',
] as const;

export const services = [
  {
    title: 'Betoninstandsetzung',
    description:
      'Sanierung von Schadstellen an Brücken und Ingenieurbauwerken – von Karbonatisierungs- und Chloridschäden bis zur langfristigen Substanzerhaltung.',
    icon: 'concrete',
  },
  {
    title: 'Rissverpressung',
    description:
      'Kraftschlüssige und dehnbare Verpressung von Rissen in Betonbauteilen – auch an tragenden Bauteilen, normgerecht und dokumentiert.',
    icon: 'injection',
  },
  {
    title: 'Oberflächenschutz & Korrosionsschutz',
    description:
      'Beschichtungssysteme für dauerhaften Schutz von Beton- und Stahlflächen, ausgeführt durch Fachkräfte mit KOR-Schein.',
    icon: 'shield',
  },
  {
    title: 'PCC- & Mörtelspritzarbeiten',
    description:
      'Reprofilierung von Betonquerschnitten mit kunststoffmodifiziertem Zementmörtel – im Spritz- und Handauftrag.',
    icon: 'spray',
  },
  {
    title: 'Höchstdruckwasserstrahlen',
    description:
      'Untergrundvorbereitung und schonender Abtrag geschädigter Betonschichten mit Höchstdruckwassertechnik.',
    icon: 'water',
  },
  {
    title: 'Konstruktiver Ingenieur- & Betonbau',
    description:
      'Begleitende Betonbauarbeiten im Zuge der Instandsetzung – inklusive nachträglicher Bewehrungsanschlüsse.',
    icon: 'structure',
  },
  {
    title: 'Austausch von Fahrbahnübergängen',
    description:
      'Ausbau und Einbau von Fahrbahnübergangskonstruktionen an Brückenbauwerken – termingerecht und verkehrssicher.',
    icon: 'road',
  },
  {
    title: 'Baustellenabsicherung nach RSA',
    description:
      'Verkehrssicherung und Absicherung von Baustellen nach RSA – geplant und umgesetzt aus einer Hand.',
    icon: 'cone',
  },
] as const;

export const whyUs = [
  {
    title: 'Spezialisierung statt Bauchladen',
    text: 'Brücken- und Bauwerksinstandsetzung ist bei uns nicht eine von vielen Leistungen – es ist das, womit wir uns seit Jahrzehnten ausschließlich beschäftigen. Diese Tiefe merkt man auf jeder Baustelle.',
  },
  {
    title: 'Qualifikation als Standard',
    text: 'SIVV-Schein, KOR-Schein und Fachkräfte für Arbeitssicherheit sind bei uns kein Zusatz für besondere Projekte – sie sind der Standard, mit dem jede Kolonne auf die Baustelle geht.',
  },
  {
    title: 'Verantwortung aus einer Hand',
    text: 'Von der Verkehrssicherung nach RSA bis zur Abnahme: Wir übernehmen Verantwortung für Sicherheit, Termine und Qualität – verlässlich gegenüber Auftraggebern, Ingenieurbüros und Anwohnern.',
  },
] as const;

export const certifications = [
  { name: 'SIVV-Schein', note: 'Schützen, Instandsetzen, Verbinden und Verstärken von Betonbauteilen' },
  { name: 'KOR-Schein', note: 'Fachkräfte für Korrosionsschutz an Stahlbauten' },
  { name: 'RSA-Qualifikation', note: 'Absicherung von Arbeitsstellen an Straßen' },
  { name: 'Fachkräfte für Arbeitssicherheit', note: 'Sicherheit als fester Bestandteil jeder Baustelle' },
] as const;

export const processSteps = [
  {
    title: 'Anfrage & Ausschreibung',
    text: 'Ob direkte Anfrage, Ausschreibungsverfahren oder Empfehlung – wir reagieren kurzfristig und verschaffen uns ein erstes Bild vom Bauwerk.',
  },
  {
    title: 'Prüfung & Beratung',
    text: 'Technische Bewertung des Zustands vor Ort, Abstimmung mit Planern und ein transparentes, nach Positionen aufgeschlüsseltes Angebot.',
  },
  {
    title: 'Planung & Koordination',
    text: 'Terminplanung, Baustelleneinrichtung, Verkehrssicherung nach RSA und Abstimmung mit Ingenieurbüros und Verwaltungen – alles vor dem ersten Handgriff geregelt.',
  },
  {
    title: 'Ausführung & Dokumentation',
    text: 'Ausführung durch qualifizierte Fachkräfte nach den einschlägigen Regelwerken, laufende Qualitätssicherung und lückenlose Dokumentation bis zur Abnahme.',
  },
] as const;

/** Referenzprojekte – Platzhalterinhalte, echte Projektdaten folgen. */
export const references = [
  {
    title: 'Brückeninstandsetzung an einer Landesstraße',
    tags: ['Betoninstandsetzung', 'Kappensanierung', 'Oberflächenschutz'],
    client: 'Öffentlicher Auftraggeber',
    text: 'Instandsetzung von Überbau und Kappen inklusive Verkehrssicherung nach RSA. (Platzhalter – Projektdetails folgen.)',
  },
  {
    title: 'Fahrbahnübergänge an einem Autobahnbauwerk',
    tags: ['Fahrbahnübergänge', 'Betonbau'],
    client: 'Bauunternehmen (Nachunternehmer)',
    text: 'Austausch von Fahrbahnübergangskonstruktionen unter laufendem Verkehr. (Platzhalter – Projektdetails folgen.)',
  },
  {
    title: 'Rissverpressung an einem Ingenieurbauwerk',
    tags: ['Rissverpressung', 'Injektion'],
    client: 'Ingenieurbüro',
    text: 'Kraftschlüssige Verpressung tragender Bauteile mit vollständiger Dokumentation. (Platzhalter – Projektdetails folgen.)',
  },
] as const;

export const testimonial = {
  quote:
    'Sie suchen einen menschlichen und zuverlässigen Partner? Dann sind Sie bei der Peter Willms Bauunternehmung GmbH genau richtig.',
  name: 'Dipl.-Ing. Marco Tankulic',
  role: 'Prokurist und Bauleitung',
} as const;

export const contacts = [
  {
    name: 'Peter Willms',
    role: 'Geschäftsführung',
    phone: company.contact.phoneCentralDisplay,
    phoneLink: company.contact.phoneCentral,
  },
  {
    name: 'Dipl.-Ing. Marco Tankulic',
    role: 'Prokurist / Bauleitung',
    phone: company.contact.siteManagementDisplay,
    phoneLink: company.contact.siteManagement,
  },
] as const;

export const faq = [
  {
    question: 'Über welche Qualifikationen verfügen Ihre Mitarbeiter?',
    answer:
      'Unsere Kolonnen werden von Fachkräften mit SIVV-Schein (Schützen, Instandsetzen, Verbinden und Verstärken von Betonbauteilen) und KOR-Schein (Korrosionsschutz) geführt. Dazu kommen Fachkräfte für Arbeitssicherheit. Diese Qualifikationen sind bei uns Standard – nicht die Ausnahme.',
  },
  {
    question: 'Führen Sie Rissverpressungen auch an tragenden Bauteilen aus?',
    answer:
      'Ja. Wir führen kraftschlüssige und dehnbare Rissverpressungen auch an tragenden Bauteilen aus – nach den einschlägigen Regelwerken und mit vollständiger Dokumentation der Injektionsarbeiten.',
  },
  {
    question: 'Arbeiten Sie auch als Nachunternehmer für Bauunternehmen?',
    answer:
      'Ja. Neben Aufträgen für öffentliche Auftraggeber übernehmen wir regelmäßig spezialisierte Instandsetzungsleistungen als Nachunternehmer für Bau- und Generalunternehmen – zuverlässig, termingerecht und mit eigenem qualifiziertem Personal.',
  },
  {
    question: 'Übernehmen Sie auch die Verkehrssicherung der Baustelle?',
    answer:
      'Ja. Die Absicherung von Arbeitsstellen an Straßen nach RSA gehört zu unserem Leistungsumfang. Planung, Einrichtung und Betrieb der Verkehrssicherung übernehmen wir auf Wunsch komplett aus einer Hand.',
  },
  {
    question: 'Nach welchen Normen und Regelwerken arbeiten Sie?',
    answer:
      'Wir arbeiten nach den einschlägigen Regelwerken der Betoninstandsetzung, unter anderem DAfStb-Richtlinie, ZTV-ING, DIN EN 1504 sowie den RSA für die Verkehrssicherung. Die Einhaltung wird durch unsere qualifizierten Fachkräfte sichergestellt und dokumentiert.',
  },
] as const;

export const navigation = [
  { label: 'Leistungen', href: '/#leistungen' },
  { label: 'Warum Willms', href: '/#warum-willms' },
  { label: 'Ablauf', href: '/#ablauf' },
  { label: 'Referenzen', href: '/#referenzen' },
  { label: 'Ansprechpartner', href: '/#ansprechpartner' },
  { label: 'FAQ', href: '/#faq' },
] as const;
