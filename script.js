/**
 * Gokul M - Portfolio Website JavaScript
 * Pure Vanilla JavaScript implementing required interactive features:
 * 1. Mobile menu toggle & close on link click
 * 2. Dynamic project category filter
 * 3. Active navigation highlight on scroll
 * 4. Back-to-top button
 * 5. Production-ready contact form sender (via FormSubmit AJAX)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Mobile Navigation Menu Toggle ---
  const menuBtn = document.getElementById('menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      menuBtn.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 2. Project Category Filtering ---
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

  // --- 3. Active Navigation Link on Scroll ---
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
  });

  // --- 4. Back to Top Button ---
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 5. Contact Form Handler (Send via Default Mail Client) ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve and validate values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Simple regex for email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all required fields.', 'error');
        return;
      }

      if (!emailPattern.test(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      // Construct default mailto URL
      const emailSubject = encodeURIComponent(subject);
      const emailBody = encodeURIComponent(`Hi Gokul,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:gokulid08@gmail.com?subject=${emailSubject}&body=${emailBody}`;

      // Open default mail client
      showStatus('Opening your default email app with your message pre-filled. Please click Send in your email client to send to Gokul (gokulid08@gmail.com)!', 'success');
      
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

  // --- 6. Floating Round Corner Avatar Dock ---
  const cornerDock = document.getElementById('corner-avatar-dock');
  const heroSection = document.getElementById('home');

  function updateCornerDock() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const heroBottom = heroSection ? heroSection.offsetHeight - 150 : 250;
    
    if (cornerDock) {
      if (scrollY > heroBottom) {
        cornerDock.classList.add('active');
      } else {
        cornerDock.classList.remove('active');
      }
    }
  }

  // --- 7. Cylindric 3D Perspective Rolling Content ---
  const cylinderCards = document.querySelectorAll('.cylinder-card');
  let ticking = false;

  function updateCylindricPerspective() {
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;

    cylinderCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      // Only process cards currently in or near viewport
      if (rect.bottom >= -50 && rect.top <= viewportHeight + 50) {
        const cardCenter = rect.top + rect.height / 2;
        const distanceFromCenter = (cardCenter - viewportCenter) / viewportCenter;
        // Subtle tilt mimicking content curving across a vertical cylinder
        const tiltAngle = Math.max(-3.5, Math.min(3.5, distanceFromCenter * 3.5));
        card.style.setProperty('--tilt-x', `${-tiltAngle.toFixed(2)}deg`);
      }
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    updateCornerDock();
    if (!ticking) {
      window.requestAnimationFrame(updateCylindricPerspective);
      ticking = true;
    }
  }, { passive: true });

  // Initial calculation on page load
  updateCornerDock();
  updateCylindricPerspective();
});

