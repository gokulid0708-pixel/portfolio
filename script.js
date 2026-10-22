/**
 * Gokul M - Portfolio Website JavaScript
 * Pure Vanilla JavaScript (Clean, Human-Written, Concise)
 * 1. Theme toggle (Rich Dark / Rich Light)
 * 2. Reading scroll progress bar
 * 3. Attractive scroll reveal animation (IntersectionObserver)
 * 4. Mobile menu toggle
 * 5. Project category filter
 * 6. Active nav link highlight on scroll
 * 7. Back-to-top button
 * 8. Contact form mailto sender
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Theme Toggle (Rich Dark / Light Mode) ---
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('gokul_theme');

  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggle) themeToggle.textContent = '☀️';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('gokul_theme', 'dark');
        themeToggle.textContent = '🌙';
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('gokul_theme', 'light');
        themeToggle.textContent = '☀️';
      }
    });
  }

  // --- 2. Reading Scroll Progress Bar ---
  const progressBar = document.getElementById('scroll-progress-bar');
  window.addEventListener('scroll', () => {
    if (progressBar) {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = `${scrolled}%`;
    }
  }, { passive: true });

  // --- 3. Attractive Scroll Reveal Animations ---
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    reveals.forEach(el => el.classList.add('visible'));
  }

  // --- 4. Mobile Navigation Menu Toggle ---
  const menuBtn = document.getElementById('menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      menuBtn.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 5. Project Category Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 6. Active Navigation Link on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  }, { passive: true });

  // --- 7. Back to Top Button ---
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 8. Contact Form Handler ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all required fields.', 'error');
        return;
      }

      if (!emailPattern.test(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      const emailSubject = encodeURIComponent(subject);
      const emailBody = encodeURIComponent(`Hi Gokul,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:gokulid08@gmail.com?subject=${emailSubject}&body=${emailBody}`;

      showStatus('Opening your email app with your message pre-filled. Please click Send in your email client!', 'success');
      window.location.href = mailtoUrl;
      contactForm.reset();
    });
  }

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
  }
});
