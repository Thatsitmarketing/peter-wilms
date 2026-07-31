/**
 * Scroll-Animationen: Reveal-Effekte und Kennzahlen-Zähler.
 * Alle Effekte respektieren `prefers-reduced-motion`.
 * (Karussell-Logik für Ablauf/Kundenstimmen liegt in den jeweiligen Komponenten.)
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 1. Scroll-Reveal für [data-reveal] ---------- */

function initReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (elements.length === 0) return;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ---------- 2. Zähler-Animation für Kennzahlen ----------
   <span data-counter data-target="500">0</span>            */

function animateCounter(el: HTMLElement, target: number, duration = 1800): void {
  const start = performance.now();

  function frame(now: number) {
    const progress = Math.min((now - start) / duration, 1);
    // Ease-out: schnell anlaufen, weich auslaufen
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = String(Math.round(eased * target));
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function initCounters(): void {
  const counters = document.querySelectorAll<HTMLElement>('[data-counter]');
  if (counters.length === 0) return;

  const setFinal = (el: HTMLElement) => {
    el.textContent = el.dataset.target ?? el.textContent;
  };

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    counters.forEach(setFinal);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const target = Number(el.dataset.target ?? '0');
        animateCounter(el, target);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

initReveal();
initCounters();
