/**
 * Cloudflare Pages Function: Empfängt Kontaktformular-Anfragen unter POST /api/contact.
 * Wird von Cloudflare Pages automatisch neben dem statischen Astro-Output deployt.
 *
 * STUB: Der eigentliche Versand (z. B. per E-Mail über MailChannels, Resend o. Ä.)
 * ist noch nicht angebunden – Empfängeradresse und Dienst müssen mit dem Kunden
 * abgestimmt werden. Bis dahin validiert die Function die Eingaben und antwortet
 * mit Erfolg, ohne Daten dauerhaft zu speichern (DSGVO: Datenminimierung).
 */

interface ContactPayload {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
  privacy?: string;
  website?: string; // Honeypot-Feld
}

// Minimaler Kontext-Typ, um ohne @cloudflare/workers-types auszukommen.
// Bei Anbindung eines Mail-Dienstes: `npm i -D @cloudflare/workers-types`
// und durch `PagesFunction<Env>` ersetzen.
interface PagesContext {
  request: Request;
}

export const onRequestPost = async (context: PagesContext): Promise<Response> => {
  let payload: ContactPayload;
  try {
    payload = (await context.request.json()) as ContactPayload;
  } catch {
    return json({ error: 'Ungültige Anfrage.' }, 400);
  }

  // Honeypot: von Bots ausgefüllt → still verwerfen, aber Erfolg melden
  if (payload.website) {
    return json({ ok: true });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const message = payload.message?.trim();

  if (!name || !email || !message || !payload.privacy) {
    return json({ error: 'Bitte füllen Sie alle Pflichtfelder aus.' }, 422);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse an.' }, 422);
  }

  // TODO: E-Mail-Versand anbinden, sobald Dienst und Empfängeradresse feststehen.
  // Beispiel (Resend): await fetch('https://api.resend.com/emails', { ... })
  // API-Schlüssel als Cloudflare-Pages-Umgebungsvariable hinterlegen, NICHT im Code.

  return json({ ok: true });
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
