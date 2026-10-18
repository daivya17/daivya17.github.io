// ===== CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .project-card, .exp-card, .skill-pills span').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('active'); follower.classList.add('active'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('active'); follower.classList.remove('active'); });
});

// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });
}

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal-text, .reveal-text-delay, .reveal-text-delay2, .reveal-text-delay3');

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// Generic scroll-in for sections
function addScrollIn() {
  const targets = [
    ...document.querySelectorAll('.exp-card'),
    ...document.querySelectorAll('.project-card'),
    ...document.querySelectorAll('.skill-group'),
    ...document.querySelectorAll('.cert-card'),
    ...document.querySelectorAll('.contact-link'),
    ...document.querySelectorAll('.stat'),
    ...document.querySelectorAll('.about-text'),
  ];
  targets.forEach((el, i) => {
    el.classList.add('scroll-in');
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
  });

  const scrollObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); scrollObserver.unobserve(e.target); }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => scrollObserver.observe(el));
}
addScrollIn();

// ===== PROJECT CARD GLOW EFFECT =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });
});

// ===== SMOOTH ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + e.target.id ? '#f0ede6' : '';
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));

// ===== STAT COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const isDecimal = String(target).includes('.');
  const step = target / 60;
  const interval = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(interval); }
    el.textContent = isDecimal ? current.toFixed(2) : Math.floor(current) + suffix;
  }, 16);
}

const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const raw = e.target.textContent.trim();
      const num = parseFloat(raw);
      const suffix = raw.replace(/[\d.]/g, '');
      animateCounter(e.target, num, suffix);
      statObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => statObserver.observe(el));

// ===== PARALLAX HERO BG TEXT =====
const heroBg = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
  if (heroBg) {
    heroBg.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.3}px))`;
  }
});

// ===== TYPING EFFECT FOR HERO TAG =====
const heroTag = document.querySelector('.hero-tag');
if (heroTag) {
  const text = ' Available for Opportunities';
  const blink = heroTag.querySelector('.blink');
  heroTag.textContent = '';
  heroTag.appendChild(blink);
  let i = 0;
  const type = () => {
    if (i < text.length) {
      heroTag.appendChild(document.createTextNode(text[i]));
      i++;
      setTimeout(type, 50);
    }
  };
  setTimeout(type, 800);
}

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 100);
});
