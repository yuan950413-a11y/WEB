/* ===== script.js ===== */

// ── Navbar scroll effect ──────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── Hamburger menu ────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// ── Smooth active nav link highlight ─────────────────
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -50% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

// ── Scroll reveal ─────────────────────────────────────
const revealTargets = [
  '.ucan-card',
  '.job-card',
  '.resume-section',
  '.plan-card',
  '.roadmap',
  '.section-header',
  '.plan-intro'
];

// Add reveal class to elements
revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.08}s`;
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ── Skill bars animation on scroll ───────────────────
const skillBars = document.querySelectorAll('.skill-bar, .bar-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => {
  bar.style.animationPlayState = 'paused';
  barObserver.observe(bar);
});

// ── Typed subtitle effect on hero ────────────────────
const heroSub = document.querySelector('.hero-sub');
if (heroSub) {
  const originalText = heroSub.textContent;
  const parts = originalText.split(' ／ ');
  let currentPart = 0;
  let charIndex = 0;
  let displayText = '';
  let isDeleting = false;
  let isPaused = false;

  // Only run after hero animation finishes
  setTimeout(() => {
    heroSub.textContent = '';

    const typeLoop = () => {
      if (isPaused) {
        setTimeout(typeLoop, 1000);
        isPaused = false;
        return;
      }

      const currentStr = parts[currentPart];

      if (!isDeleting) {
        displayText = currentStr.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentStr.length) {
          isPaused = true;
          isDeleting = true;
          charIndex = currentStr.length;
        }
      } else {
        displayText = currentStr.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          charIndex = 0;
          currentPart = (currentPart + 1) % parts.length;
        }
      }

      heroSub.textContent = displayText + (isDeleting || charIndex < currentStr.length ? '|' : '');
      setTimeout(typeLoop, isDeleting ? 40 : 80);
    };

    typeLoop();
  }, 1200);
}

// ── Roadmap step hover glow ───────────────────────────
document.querySelectorAll('.rs-step').forEach(step => {
  step.addEventListener('mouseenter', () => {
    step.style.background = 'rgba(110,231,183,0.06)';
  });
  step.addEventListener('mouseleave', () => {
    step.style.background = '';
  });
});

// ── Fit items stagger on scroll ───────────────────────
const fitItems = document.querySelectorAll('.fit-item');
fitItems.forEach((item, i) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = `opacity 0.5s ${i * 0.1}s, transform 0.5s ${i * 0.1}s`;
});

const fitObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.fit-item');
      items.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      });
      fitObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fit-grid').forEach(grid => {
  fitObserver.observe(grid);
});

// ── Plan cards stagger ────────────────────────────────
const planCards = document.querySelectorAll('.plan-card');
const planObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      planCards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('visible');
        }, i * 120);
      });
      planObserver.disconnect();
    }
  });
}, { threshold: 0.1 });

const planGrid = document.querySelector('.plan-grid');
if (planGrid) planObserver.observe(planGrid);

// ── Console easter egg ────────────────────────────────
console.log('%c吳育安 の 個人職涯網站', 'color:#6EE7B7;font-size:18px;font-weight:bold;');
console.log('%c靜宜大學 資訊管理學系 | MIS 志向', 'color:#9090A8;font-size:12px;');
console.log('%c🏀 籃球控衛 × ♟ 圍棋思維 × 💻 資管魂', 'color:#F59E0B;font-size:12px;');