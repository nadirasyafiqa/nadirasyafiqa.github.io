// ===== PARTICLES =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticles() {
  particles = [];
  const count = Math.floor((window.innerWidth * window.innerHeight) / 14000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8 + 0.4,
      color: Math.random() > 0.5 ? 'rgba(168,85,247,' : 'rgba(236,72,153,',
      speed: Math.random() * 0.4 + 0.1,
      alpha: Math.random() * 0.6 + 0.2,
      drift: (Math.random() - 0.5) * 0.3,
    });
  }
}
createParticles();

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color + p.alpha + ')';
    ctx.fill();
    p.y -= p.speed;
    p.x += p.drift;
    if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
    if (p.x < -10 || p.x > canvas.width + 10) p.x = Math.random() * canvas.width;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => { navLinks.classList.remove('open'); hamburger.classList.remove('active'); });
});

// ===== TYPED TEXT =====
const phrases = [
  'Full Stack Developer 💻',
  'UI/UX Enthusiast 🎨',
  'Community Leader 👑',
  'Tech Innovator ⚡',
  'Problem Solver 🔮',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function typeLoop() {
  const current = phrases[phraseIdx];
  if (deleting) {
    typedEl.textContent = current.slice(0, --charIdx);
  } else {
    typedEl.textContent = current.slice(0, ++charIdx);
  }
  let delay = deleting ? 50 : 90;
  if (!deleting && charIdx === current.length) { delay = 1800; deleting = true; }
  else if (deleting && charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; delay = 400; }
  setTimeout(typeLoop, delay);
}
typeLoop();

// ===== SCROLL REVEAL (AOS) =====
const aosEls = document.querySelectorAll('[data-aos]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('aos-visible'), i * 120);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
aosEls.forEach(el => observer.observe(el));

// ===== SKILL BARS =====
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(fill => {
        fill.style.width = fill.dataset.w + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-card').forEach(el => barObserver.observe(el));

// ===== PROFILE PHOTO UPLOAD =====
const profileUpload = document.getElementById('profile-upload');
const profileImg = document.getElementById('profile-img');
profileUpload.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => { profileImg.src = e.target.result; };
    reader.readAsDataURL(file);
  }
});

// ===== GALLERY: change photo =====
document.querySelectorAll('.gallery-file-input').forEach(input => {
  input.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const img = this.closest('.gallery-card').querySelector('.gallery-img');
      const reader = new FileReader();
      reader.onload = e => { img.src = e.target.result; };
      reader.readAsDataURL(file);
    }
  });
});

// ===== GALLERY: add new photo =====
const galleryAddInput = document.getElementById('gallery-add-input');
const galleryGrid = document.getElementById('gallery-grid');
const addCard = document.getElementById('add-photo-card');

galleryAddInput.addEventListener('change', function () {
  const files = Array.from(this.files);
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const card = document.createElement('div');
      card.className = 'gallery-card';
      card.innerHTML = `
        <img src="${e.target.result}" alt="My photo" class="gallery-img"/>
        <div class="gallery-overlay">
          <span>My Memory ✨</span>
          <label class="gallery-upload-btn" title="Change photo">
            <i class="fas fa-camera"></i>
            <input type="file" accept="image/*" class="gallery-file-input" style="display:none"/>
          </label>
        </div>`;
      card.querySelector('.gallery-file-input').addEventListener('change', function () {
        const f = this.files[0];
        if (f) {
          const r2 = new FileReader();
          r2.onload = ev => { card.querySelector('.gallery-img').src = ev.target.result; };
          r2.readAsDataURL(f);
        }
      });
      galleryGrid.insertBefore(card, addCard);
    };
    reader.readAsDataURL(file);
  });
  this.value = '';
});

// ===== CONTACT FORM =====
const form = document.getElementById('contact-form');
const sendBtn = document.getElementById('send-btn');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  sendBtn.disabled = true;
  sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  setTimeout(() => {
    sendBtn.style.display = 'none';
    formSuccess.style.display = 'block';
    form.reset();
  }, 1800);
});

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--white)' : '';
  });
});
