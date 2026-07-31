// @ts-check
import { defineConfig } from 'astro/config';

// Statischer Build – ideal für Cloudflare Pages.
// Build-Kommando: `npm run build`, Output-Verzeichnis: `dist`.
// Das Formular-Backend liegt als Cloudflare Pages Function unter /functions/api/contact.ts
// und wird von Cloudflare Pages automatisch neben dem statischen Output deployt.
export default defineConfig({
  site: 'https://www.willmsbauunternehmung.de',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
});
