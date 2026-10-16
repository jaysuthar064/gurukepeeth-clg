/**
 * Gurukripa Peeth College — Master Interactive Script
 * Handles Navigation, Sliders, Tab Switchers, Accordions, and Stat Counters
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeroSlider();
  initTabs();
  initAccordions();
  initStatCounters();
});

/* --- 1. MOBILE NAVIGATION & DROPDOWNS --- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      toggleBtn.innerHTML = isOpen ? '✕' : '☰';
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        toggleBtn.innerHTML = '☰';
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Dropdown toggles on mobile
    const dropdownItems = navMenu.querySelectorAll('.nav-item > .dropdown-menu');
    dropdownItems.forEach(menu => {
      const parent = menu.closest('.nav-item');
      const link = parent.querySelector('.nav-link');
      if (link && window.innerWidth < 992) {
        link.addEventListener('click', (e) => {
          if (menu) {
            e.preventDefault();
            parent.classList.toggle('open');
          }
        });
      }
    });
  }
}

/* --- 2. HERO BANNER SLIDER --- */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.querySelector('.slider-controls');
  if (!slides.length) return;

  let currentIdx = 0;
  let intervalId;

  // Create indicator dots dynamically if container exists
  if (dotsContainer && !dotsContainer.children.length) {
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(idx);
        restartTimer();
      });
      dotsContainer.appendChild(dot);
    });
  }

  const dots = document.querySelectorAll('.slider-dot');

  function goToSlide(idx) {
    slides[currentIdx].classList.remove('active');
    if (dots[currentIdx]) dots[currentIdx].classList.remove('active');

    currentIdx = (idx + slides.length) % slides.length;

    slides[currentIdx].classList.add('active');
    if (dots[currentIdx]) dots[currentIdx].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentIdx + 1);
  }

  function startTimer() {
    intervalId = setInterval(nextSlide, 5000);
  }

  function restartTimer() {
    clearInterval(intervalId);
    startTimer();
  }

  startTimer();
}

/* --- 3. DYNAMIC TAB SWITCHER --- */
function initTabs() {
  const tabContainers = document.querySelectorAll('[data-tab-container]');

  tabContainers.forEach(container => {
    const tabButtons = container.querySelectorAll('[data-tab-target]');
    const tabPanes = container.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSelector = btn.getAttribute('data-tab-target');
        const targetPane = container.querySelector(targetSelector);

        if (!targetPane) return;

        // Deactivate all in this container
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        // Activate selected
        btn.classList.add('active');
        targetPane.classList.add('active');
      });
    });
  });
}

/* --- 4. ACCORDIONS --- */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      if (!item) return;

      const parent = item.parentElement;
      const isOpen = item.classList.contains('open');

      // If single accordion mode (close siblings)
      if (parent && parent.hasAttribute('data-single-open')) {
        parent.querySelectorAll('.accordion-item').forEach(sibling => {
          sibling.classList.remove('open');
        });
      }

      if (!isOpen) {
        item.classList.add('open');
      } else {
        item.classList.remove('open');
      }
    });
  });
}

/* --- 5. STAT COUNTER ANIMATION --- */
function initStatCounters() {
  const counterElements = document.querySelectorAll('[data-counter-target]');
  if (!counterElements.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterElements.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-counter-target'), 10);
          const duration = 2000;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target.toLocaleString() + (counter.getAttribute('data-counter-suffix') || '');
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current).toLocaleString() + (counter.getAttribute('data-counter-suffix') || '');
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const counterSection = document.querySelector('.stat-counter-section');
  if (counterSection) {
    observer.observe(counterSection);
  }
}
