/**
 * Mahabub Islam Portfolio - Main Logic & Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
  initCanvasBackground();
  initTypewriter();
  initSkillsGrid();
  initThemeToggle();
  initNavbar();
  initCounterStats();
  initModals();
  initContactForm();
  initCopyButtons();
  
  // Render projects from projects.js
  if (typeof renderProjects === 'function') {
    renderProjects('all');
    setupProjectFilters();
  }
});

/* --------------------------------------------------------------------------
   1. CANVAS ANIMATED BACKGROUND
   -------------------------------------------------------------------------- */
function initCanvasBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 1.8 + 0.8;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim() || '#6366f1';
      ctx.globalAlpha = 0.4;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim() || '#6366f1';

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = accentColor;
          ctx.globalAlpha = (1 - dist / 130) * 0.15;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   2. HERO TYPEWRITER ANIMATION
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    "Frontend Applications.",
    "Machine Learning Models.",
    "Full-Stack Web Systems.",
    "Responsive React & Next.js UIs."
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      el.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at full text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before new word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. TECHNICAL SKILLS MATRIX & TABS
   -------------------------------------------------------------------------- */
const skillsData = [
  // Programming Languages
  { name: "Python", category: "programming", level: 90, icon: "fa-brands fa-python", color: "#3776ab" },
  { name: "JavaScript (ES6+)", category: "programming", level: 92, icon: "fa-brands fa-js", color: "#f7df1e" },
  { name: "PHP", category: "programming", level: 85, icon: "fa-brands fa-php", color: "#777bb4" },
  { name: "C#", category: "programming", level: 78, icon: "fa-solid fa-code", color: "#239120" },
  { name: "SQL", category: "programming", level: 88, icon: "fa-solid fa-database", color: "#4479a1" },

  // Frontend Frameworks & Libraries
  { name: "React.js", category: "frontend", level: 92, icon: "fa-brands fa-react", color: "#61dafb" },
  { name: "Next.js", category: "frontend", level: 88, icon: "fa-solid fa-N", color: "#ffffff" },
  { name: "HTML5 & CSS3", category: "frontend", level: 95, icon: "fa-brands fa-html5", color: "#e34f26" },
  { name: "Tailwind CSS", category: "frontend", level: 90, icon: "fa-solid fa-wind", color: "#38bdf8" },

  // Backend & Databases
  { name: "MySQL", category: "backend", level: 88, icon: "fa-solid fa-database", color: "#00758f" },
  { name: "SQL Server", category: "backend", level: 80, icon: "fa-solid fa-server", color: "#cc292b" },

  // Machine Learning
  { name: "Scikit-Learn", category: "ml", level: 85, icon: "fa-solid fa-brain", color: "#f7931e" },
  { name: "Pandas & NumPy", category: "ml", level: 88, icon: "fa-solid fa-table", color: "#150458" },
  { name: "Matplotlib & EDA", category: "ml", level: 82, icon: "fa-solid fa-chart-line", color: "#11557c" },

  // Tools & Core Concepts
  { name: "Git & GitHub", category: "tools", level: 90, icon: "fa-brands fa-github", color: "#f05032" },
  { name: "Jupyter Notebook", category: "tools", level: 88, icon: "fa-solid fa-book-open", color: "#f37626" },
  { name: "VS Code", category: "tools", level: 95, icon: "fa-solid fa-code", color: "#007acc" },
  { name: "OOP & DSA", category: "tools", level: 90, icon: "fa-solid fa-sitemap", color: "#a855f7" },
  { name: "DBMS & Relational Design", category: "tools", level: 88, icon: "fa-solid fa-layer-group", color: "#06b6d4" }
];

function initSkillsGrid() {
  const container = document.getElementById('skills-grid');
  if (!container) return;

  function renderSkills(category = 'all') {
    const filtered = category === 'all' 
      ? skillsData 
      : skillsData.filter(s => s.category === category);

    container.innerHTML = filtered.map(skill => `
      <div class="skill-card">
        <div class="skill-header">
          <div class="skill-title-box">
            <div class="skill-icon" style="color: ${skill.color}">
              <i class="${skill.icon}"></i>
            </div>
            <span class="skill-name">${skill.name}</span>
          </div>
          <span class="skill-percent">${skill.level}%</span>
        </div>
        <div class="skill-bar-container">
          <div class="skill-bar-fill" style="width: 0%;" data-level="${skill.level}"></div>
        </div>
      </div>
    `).join('');

    // Animate bars after render
    setTimeout(() => {
      document.querySelectorAll('.skill-bar-fill').forEach(fill => {
        const level = fill.getAttribute('data-level');
        fill.style.width = level + '%';
      });
    }, 50);
  }

  renderSkills('all');

  // Setup tab triggers
  document.querySelectorAll('.skill-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-category');
      renderSkills(cat);
    });
  });
}

/* --------------------------------------------------------------------------
   4. NAVBAR & SCROLL EFFECTS
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scroll-progress');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinksContainer = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    // Navbar height / shadow shrink on scroll
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll progress bar width calculation
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = progress + '%';

    // Active Section Highlight
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile drawer toggle
  if (mobileBtn && navLinksContainer) {
    mobileBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('mobile-active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('mobile-active');
      });
    });
  }

  // Back to top button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* --------------------------------------------------------------------------
   5. THEME TOGGLE (DARK / LIGHT)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const icon = toggleBtn.querySelector('i');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  updateIcon(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateIcon(newTheme);
  });

  function updateIcon(theme) {
    if (icon) {
      if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
        toggleBtn.setAttribute('title', 'Switch to Light Mode');
      } else {
        icon.className = 'fa-solid fa-moon';
        toggleBtn.setAttribute('title', 'Switch to Dark Mode');
      }
    }
  }
}

/* --------------------------------------------------------------------------
   6. COUNTER ANIMATION FOR STATS
   -------------------------------------------------------------------------- */
function initCounterStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseFloat(stat.getAttribute('data-target'));
          const decimals = parseInt(stat.getAttribute('data-decimals') || '0');
          const suffix = stat.getAttribute('data-suffix') || '';
          
          let current = 0;
          const increment = target / 40;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            stat.textContent = current.toFixed(decimals) + suffix;
          }, 35);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) observer.observe(statsSection);
}

/* --------------------------------------------------------------------------
   7. MODALS LOGIC (PROJECT & RESUME)
   -------------------------------------------------------------------------- */
function initModals() {
  const projectModal = document.getElementById('project-modal');
  const projectCloseBtn = document.getElementById('modal-close-btn');

  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const resumeCloseBtn = document.getElementById('resume-modal-close-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');

  // Close project modal
  if (projectCloseBtn && projectModal) {
    projectCloseBtn.addEventListener('click', () => {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    projectModal.querySelector('.modal-overlay').addEventListener('click', () => {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Open/Close resume modal
  if (openResumeBtn && resumeModal) {
    openResumeBtn.addEventListener('click', () => {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (resumeCloseBtn && resumeModal) {
    resumeCloseBtn.addEventListener('click', () => {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    resumeModal.querySelector('.modal-overlay').addEventListener('click', () => {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Print resume
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* --------------------------------------------------------------------------
   8. CONTACT FORM & NOTIFICATION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const notification = document.getElementById('form-notification');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Show simulated success & construct mailto
    if (notification) {
      notification.className = 'form-notification success';
      notification.textContent = `Thank you, ${name}! Your message has been prepared. Opening default email client...`;
    }

    const mailtoUrl = `mailto:mahabubislam50725.aiub@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
      form.reset();
    }, 1200);
  });
}

/* --------------------------------------------------------------------------
   9. COPY TO CLIPBOARD BUTTONS
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  document.querySelectorAll('.copy-btn[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = 'fa-solid fa-check';
          setTimeout(() => {
            icon.className = 'fa-solid fa-copy';
          }, 2000);
        }
      }).catch(err => {
        console.error('Copy error:', err);
      });
    });
  });
}
