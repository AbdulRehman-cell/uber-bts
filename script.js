/**
 * Uber Boats UI Interactivity
 * vanilla JS, defensive
 */

document.addEventListener('DOMContentLoaded', () => {
  // Sticky nav shadow on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 16) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Smooth scroll for anchor links (footer nav and hero CTA)
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  smoothLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Highlight nav active link (for client-side SPA feel + accessibility)
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      // Only for internal navigation, not external
      if (
        link.getAttribute('href').endsWith('.html') &&
        !link.classList.contains('active')
      ) {
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // No nav toggles present, but defensive for future use
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navbar.classList.toggle('open');
    });
  }

  // No forms on index.html, but defensively wire up for book.html etc
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      let valid = true;
      const required = form.querySelectorAll('[required]');
      required.forEach(field => {
        field.classList.remove('invalid');
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('invalid');
        }
      });
      if (!valid) {
        e.preventDefault();
        // Show feedback
        let feedback = form.querySelector('.form-feedback');
        if (!feedback) {
          feedback = document.createElement('div');
          feedback.className = 'form-feedback';
          feedback.textContent = 'Please fill all required fields.';
          form.insertBefore(feedback, form.firstChild);
        }
        feedback.style.display = 'block';
      }
    });

    // Remove feedback on input
    form.addEventListener('input', e => {
      if (e.target.matches('[required]')) {
        e.target.classList.remove('invalid');
        const feedback = form.querySelector('.form-feedback');
        if (feedback) feedback.style.display = 'none';
      }
    });
  });

  // Defensive tab interaction (e.g., for destinations.html)
  const tablists = document.querySelectorAll('[role="tablist"]');
  tablists.forEach(tablist => {
    const tabs = tablist.querySelectorAll('[role="tab"]');
    const panels = document.querySelectorAll('[role="tabpanel"]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
        tab.setAttribute('aria-selected', 'true');
        panels.forEach(panel => {
          panel.style.display =
            panel.getAttribute('aria-labelledby') === tab.id ? 'block' : 'none';
        });
      });
    });
  });
});