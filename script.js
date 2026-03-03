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

/* ---- modal logic ---- */
const modal = document.getElementById('deployment-modal');
const modalCloseBtn = document.getElementById('modal-close');
const dtForm = document.getElementById('deployment-form');
const dtBody = document.getElementById('modal-body');
const dtSuccess = document.getElementById('modal-success');

const openBtns = [
  document.getElementById('hero-cta-deploy'),
  document.getElementById('footer-cta-deploy'),
  document.getElementById('nav-cta-deploy')
];

function openModal() {
  if (!modal) return;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

openBtns.forEach(btn => {
  if (btn) btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });
});

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
    closeModal();
  }
});

/* form submit UX simulation */
if (dtForm) {
  dtForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate formatting data to send to corporate email
    const formData = new FormData(dtForm);
    const dataObj = Object.fromEntries(formData.entries());
    console.log("Transmission to corporate email: ", dataObj);

    // Swap UI to confirmation statement
    dtBody.style.display = 'none';
    dtSuccess.style.display = 'block';
  });
}
