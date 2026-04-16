/* script.js — 共用互動邏輯 */

// ── NAV active link ───────────────────────
(function () {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path) a.classList.add('active');
  });
})();

// ── Hamburger ─────────────────────────────
const burger = document.querySelector('.nav-burger');
const drawer = document.querySelector('.nav-drawer');
if (burger && drawer) {
  burger.addEventListener('click', () => drawer.classList.toggle('open'));
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => drawer.classList.remove('open')));
}

// ── Scroll reveal ─────────────────────────
const ro = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('show'), e.target.dataset.delay || 0);
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.dataset.delay = i % 4 * 80;
  ro.observe(el);
});

// ── Bar animation ─────────────────────────
const bo = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar-fill[data-w]').forEach(bar => {
        bar.style.width = bar.dataset.w;
      });
      bo.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.bar-group').forEach(g => bo.observe(g));

const words = ["吳育安", "Yu-An Wu"];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement = document.getElementById("typing-name");

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!deleting) {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, deleting ? 60 : 120);
}

typeEffect();