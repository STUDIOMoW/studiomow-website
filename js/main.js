/* STUDIOMoW — Main JS */

// ── Nav scroll effect ──
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ── Hamburger menu ──
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── Intersection Observer for fade-in ──
const observerOpts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, observerOpts);

document.querySelectorAll('.fade-in, .stat-item, .strategy-item, .team-card, .market-card, .pillar').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  // Add visible class via CSS
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
});

// ── Talent form submission ──
const talentForm = document.getElementById('talentForm');
if (talentForm) {
  talentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = talentForm.querySelector('.btn-submit');
    const successEl = document.getElementById('formSuccess');
    const errorEl = document.getElementById('formError');

    btn.textContent = '전송 중...';
    btn.disabled = true;

    // Collect form data (in real deployment, send to backend/email)
    const fd = new FormData(talentForm);
    const data = {};
    fd.forEach((v, k) => { data[k] = v; });

    // Save to localStorage for admin demo (in real deployment, use server)
    try {
      const submissions = JSON.parse(localStorage.getItem('talent_submissions') || '[]');
      submissions.unshift({
        id: Date.now(),
        type: 'talent',
        date: new Date().toISOString(),
        status: 'new',
        ...data
      });
      localStorage.setItem('talent_submissions', JSON.stringify(submissions));

      if (successEl) { successEl.style.display = 'block'; }
      talentForm.reset();
    } catch(err) {
      if (errorEl) { errorEl.style.display = 'block'; }
    } finally {
      btn.textContent = '제출 완료 ✓';
      setTimeout(() => {
        btn.textContent = '프로필 제출하기';
        btn.disabled = false;
      }, 3000);
    }
  });
}

// ── Business form submission ──
const bizForm = document.getElementById('bizForm');
if (bizForm) {
  bizForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = bizForm.querySelector('.btn-submit');
    const successEl = document.getElementById('bizSuccess');

    btn.textContent = '전송 중...';
    btn.disabled = true;

    const fd = new FormData(bizForm);
    const data = {};
    fd.forEach((v, k) => { data[k] = v; });

    try {
      const submissions = JSON.parse(localStorage.getItem('biz_submissions') || '[]');
      submissions.unshift({
        id: Date.now(),
        type: 'business',
        date: new Date().toISOString(),
        status: 'new',
        ...data
      });
      localStorage.setItem('biz_submissions', JSON.stringify(submissions));

      if (successEl) { successEl.style.display = 'block'; }
      bizForm.reset();
    } catch(err) {
      console.error(err);
    } finally {
      btn.textContent = '제안서 제출 완료 ✓';
      setTimeout(() => {
        btn.textContent = '제안서 보내기';
        btn.disabled = false;
      }, 3000);
    }
  });
}
