// ---------- SMOOTH SCROLL ----------
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---------- SCROLL REVEAL ----------
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .stagger').forEach(el => observer.observe(el));

// ---------- TYPING ANIMATION ----------
const phrases = [
  'Network Engineer.',
  'Web Developer.',
  'Problem Solver.'
];

const typedEl = document.getElementById('typed-text');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 70;
const deleteSpeed = 40;
const pauseBetween = 1500;

function type() {
  const current = phrases[phraseIndex];

  if (!isDeleting) {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, pauseBetween);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
}

if (typedEl) type();

// ---------- THEME TOGGLE ----------
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
  document.body.classList.add('light');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeToggle.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});