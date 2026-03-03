/* ---- nav scroll state ---- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ---- reveal on scroll ---- */
// Respect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealEls = document.querySelectorAll('.reveal');

if (prefersReducedMotion) {
  // Skip animation entirely if user prefers reduced motion
  revealEls.forEach(el => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: '0px 0px -60px 0px'
    }
  );
  revealEls.forEach(el => observer.observe(el));
}

/* ---- active nav link ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObs = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);

sections.forEach(s => sectionObs.observe(s));
