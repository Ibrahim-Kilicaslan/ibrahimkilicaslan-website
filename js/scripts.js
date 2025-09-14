// Language system
const translations = {
  en: {
    nav: {
      home: "Home",
      experience: "Experience", 
      skills: "Skills",
      projects: "Projects",
      education: "Education",
      blog: "Blog",
      contact: "Contact"
    },
    hero: {
      title: "IBRAHIM KILICASLAN",
      subtitle: "Cloud & DevOps Engineer",
      description: "As an electrical engineer with diverse professional experience, I bring a structured mindset and analytical skills. Through comprehensive training in DevOps and Cloud Computing in Germany, I have acquired solid knowledge in technologies like AWS, Docker, Kubernetes, Terraform, and Jenkins. My technical background combined with current cloud expertise enables me to efficiently shape modern IT infrastructures and support agile teams."
    },
    sections: {
      experience: "Professional Experience",
      skills: "Skills & Competencies", 
      projects: "Projects",
      education: "Education",
      blog: "Blog",
      contact: "Contact"
    },
    blog: {
      title: "How I Created and Deployed My Professional CV Website with AWS, Terraform & GitHub Actions",
      author: "Author:",
      date: "Date:",
      readMore: "Read More",
      readLess: "Show Less"
    },
    contact: {
      title: "Contact",
      subtitle: "Let's talk about your next project",
      phone: "Phone",
      email: "E-Mail", 
      location: "Location",
      sendMessage: "Send Message",
      firstName: "First Name",
      lastName: "Last Name",
      subject: "Subject",
      message: "Your Message",
      send: "Send Message"
    },
    footer: {
      rights: "All rights reserved"
    }
  },
  de: {
    nav: {
      home: "Home",
      experience: "Erfahrung",
      skills: "Kompetenzen", 
      projects: "Projekte",
      education: "Bildung",
      blog: "Blog",
      contact: "Kontakt"
    },
    hero: {
      title: "IBRAHIM KILICASLAN",
      subtitle: "Cloud & DevOps Engineer", 
      description: "Als Elektroingenieur mit vielseitiger Berufserfahrung bringe ich eine strukturierte Denkweise und analytische Fähigkeiten mit. Durch fundierte Kenntnisse in AWS, Docker, Kubernetes, Terraform und Jenkins unterstütze ich moderne IT-Infrastrukturen effizient."
    },
    sections: {
      experience: "Berufserfahrungen",
      skills: "Kompetenzen",
      projects: "Projekte", 
      education: "Bildung",
      blog: "Blog",
      contact: "Kontakt"
    },
    blog: {
      title: "Wie ich meine professionelle CV-Website mit AWS, Terraform & GitHub Actions erstellt und bereitgestellt habe",
      author: "Autor:",
      date: "Datum:",
      readMore: "Weiterlesen",
      readLess: "Weniger Anzeigen"
    },
    contact: {
      title: "Kontakt",
      subtitle: "Lassen Sie uns über Ihr nächstes Projekt sprechen",
      phone: "Telefon",
      email: "E-Mail",
      location: "Standort", 
      sendMessage: "Nachricht senden",
      firstName: "Vorname",
      lastName: "Nachname",
      subject: "Betreff",
      message: "Ihre Nachricht",
      send: "Nachricht senden"
    },
    footer: {
      rights: "Alle Rechte vorbehalten"
    }
  }
};

// Current language state
let currentLanguage = localStorage.getItem('language') || 'de';

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollToTopBtn = document.querySelector('.scroll-to-top');

  // Navbar scroll effect
  window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
          navbar.style.background = 'rgba(255, 255, 255, 0.98)';
          navbar.style.boxShadow = 'var(--shadow-lg)';
      } else {
          navbar.style.background = 'rgba(255, 255, 255, 0.95)';
          navbar.style.boxShadow = 'none';
      }

      // Show/hide scroll to top button
      if (window.scrollY > 300) {
          scrollToTopBtn.classList.add('visible');
      } else {
          scrollToTopBtn.classList.remove('visible');
      }
  });

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
              const offsetTop = targetSection.offsetTop - 80;
              window.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
              });
          }
          // Close mobile menu if open
          document.querySelector('.nav-menu').classList.remove('active');
          document.querySelector('.mobile-menu-toggle').classList.remove('active');
      });
  });

  // Active navigation highlighting
  window.addEventListener('scroll', function() {
      let current = '';
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop - 120;
          if (window.scrollY >= sectionTop) {
              current = section.getAttribute('id');
          }
      });

      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + current) {
              link.classList.add('active');
          }
      });
  });

  // Contact form
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Form validation
          const formFields = this.querySelectorAll('input, textarea');
          let isValid = true;
          
          formFields.forEach(field => {
              if (field.hasAttribute('required') && !field.value.trim()) {
                  field.style.borderColor = '#dc3545';
                  isValid = false;
              } else {
                  field.style.borderColor = 'var(--border-color)';
              }
          });
          
          if (isValid) {
              // Success animation
              const submitBtn = this.querySelector('button[type="submit"]');
              const originalText = submitBtn.innerHTML;
              submitBtn.innerHTML = '<i class="fas fa-check"></i> Gesendet!';
              submitBtn.style.background = '#28a745';
              
              setTimeout(() => {
                  submitBtn.innerHTML = originalText;
                  submitBtn.style.background = '';
                  this.reset();
              }, 3000);
              
              alert('Vielen Dank für Ihre Nachricht! Ich werde mich bald bei Ihnen melden.');
          } else {
              alert('Bitte füllen Sie alle erforderlichen Felder aus.');
          }
      });
  }

  // Initialize animations
  initializeAnimations();
  
  // Initialize language system
  initializeLanguage();
});

// Language switching functionality
function initializeLanguage() {
  updateLanguageButton();
  updatePageContent();
}

function toggleLanguage() {
  currentLanguage = currentLanguage === 'de' ? 'en' : 'de';
  localStorage.setItem('language', currentLanguage);
  updateLanguageButton();
  updatePageContent();
}

function updateLanguageButton() {
  const langToggle = document.getElementById('lang-toggle');
  const langFlag = langToggle.querySelector('.lang-flag');
  const langCode = langToggle.querySelector('.lang-code');
  
  if (currentLanguage === 'de') {
    langFlag.textContent = '🇩🇪';
    langCode.textContent = 'DE';
  } else {
    langFlag.textContent = '🇬🇧';
    langCode.textContent = 'EN';
  }
}

function updatePageContent() {
  const t = translations[currentLanguage];
  
  // Update navigation
  updateNavigation(t.nav);
  
  // Update hero section
  updateHeroSection(t.hero);
  
  // Update section titles
  updateSectionTitles(t.sections);
  
  // Update blog section
  updateBlogSection(t.blog);
  
  // Update contact section
  updateContactSection(t.contact);
  
  // Update footer
  updateFooter(t.footer);
}

function updateNavigation(nav) {
  const navLinks = document.querySelectorAll('.nav-link');
  const navTexts = [nav.home, nav.experience, nav.skills, nav.projects, nav.education, nav.blog, nav.contact];
  
  navLinks.forEach((link, index) => {
    if (navTexts[index]) {
      link.textContent = navTexts[index];
    }
  });
}

function updateHeroSection(hero) {
  const title = document.querySelector('.hero h1');
  const subtitle = document.querySelector('.hero .subtitle');
  const description = document.querySelector('.hero p');
  
  if (title) title.textContent = hero.title;
  if (subtitle) subtitle.textContent = hero.subtitle;
  if (description) description.textContent = hero.description;
}

function updateSectionTitles(sections) {
  const sectionTitles = document.querySelectorAll('.section-title');
  const sectionTexts = [sections.experience, sections.skills, sections.projects, sections.education, sections.blog, sections.contact];
  
  sectionTitles.forEach((title, index) => {
    if (sectionTexts[index]) {
      title.textContent = sectionTexts[index];
    }
  });
}

function updateBlogSection(blog) {
  const blogTitle = document.querySelector('.blog-card h3');
  const authorLabel = document.querySelector('.blog-card .subtitle strong');
  const dateLabel = document.querySelector('.blog-card .subtitle');
  
  if (blogTitle) blogTitle.textContent = blog.title;
  if (authorLabel) authorLabel.textContent = blog.author;
  if (dateLabel) {
    const dateText = dateLabel.textContent;
    dateLabel.innerHTML = `<strong>${blog.author}</strong> Ibrahim Kilicaslan | <strong>${blog.date}</strong> 22.07.2025`;
  }
}

function updateContactSection(contact) {
  const contactTitle = document.querySelector('#contact .section-title');
  const contactSubtitle = document.querySelector('#contact .section-subtitle');
  const contactLabels = document.querySelectorAll('.contact-item h4');
  const formTitle = document.querySelector('.contact-form-container h3');
  const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
  
  if (contactTitle) contactTitle.textContent = contact.title;
  if (contactSubtitle) contactSubtitle.textContent = contact.subtitle;
  if (formTitle) formTitle.textContent = contact.sendMessage;
  
  // Update contact item labels
  const contactLabelTexts = [contact.phone, contact.email, contact.location, 'LinkedIn', 'GitHub'];
  contactLabels.forEach((label, index) => {
    if (contactLabelTexts[index]) {
      label.textContent = contactLabelTexts[index];
    }
  });
  
  // Update form placeholders
  const placeholderTexts = [contact.firstName, contact.lastName, contact.email, contact.subject, contact.message];
  formInputs.forEach((input, index) => {
    if (placeholderTexts[index]) {
      input.placeholder = placeholderTexts[index];
    }
  });
}

function updateFooter(footer) {
  const footerText = document.querySelector('footer p');
  if (footerText) {
    footerText.innerHTML = `© 2025 ibrahimkilicaslan.click ${footer.rights}`;
  }
}

// Mobile menu toggle
function toggleMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  
  if (navMenu && mobileToggle) {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
  }
}

// Blog content toggle
function toggleBlogContent(button) {
  const blogCard = button.closest('.blog-card');
  const fullContent = blogCard.querySelector('.blog-full-content');
  const excerpt = blogCard.querySelector('.blog-excerpt');
  const btnText = button.querySelector('.btn-text');
  
  if (fullContent.style.display === 'none' || fullContent.style.display === '') {
    // Show full content
    fullContent.style.display = 'block';
    excerpt.style.display = 'none';
    button.classList.add('expanded');
    btnText.textContent = translations[currentLanguage].blog.readLess;
    
    // Smooth scroll to button after content loads
    setTimeout(() => {
      button.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      });
    }, 300);
  } else {
    // Hide full content
    fullContent.style.display = 'none';
    excerpt.style.display = 'block';
    button.classList.remove('expanded');
    btnText.textContent = translations[currentLanguage].blog.readMore;
    
    // Smooth scroll to top of blog card
    blogCard.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
}

// Theme toggle
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');
  
  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
      themeIcon.className = 'fas fa-sun';
      localStorage.setItem('theme', 'dark');
  } else {
      themeIcon.className = 'fas fa-moon';
      localStorage.setItem('theme', 'light');
  }
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme');
  const themeIcon = document.getElementById('theme-icon');
  
  if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeIcon.className = 'fas fa-sun';
  }
});

// Scroll to top
function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
}

// Animate on scroll
function initializeAnimations() {
  const cards = document.querySelectorAll('.card');
  const skillTags = document.querySelectorAll('.skill-tag');
  
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              if (entry.target.classList.contains('card')) {
                  entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
              } else if (entry.target.classList.contains('skill-tag')) {
                  const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1;
                  entry.target.style.animation = `fadeInUp 0.6s ease-out ${delay}s both`;
              }
          }
      });
  }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  });

  cards.forEach(card => {
      observer.observe(card);
  });
  
  skillTags.forEach(tag => {
      observer.observe(tag);
  });
}

// Parallax effect for hero section
function initializeParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      hero.style.transform = `translateY(${parallax}px)`;
  });
}

// Typing effect for hero subtitle
function initializeTypingEffect() {
  const subtitle = document.querySelector('.hero .subtitle');
  if (!subtitle) return;
  
  const text = subtitle.textContent;
  subtitle.textContent = '';
  
  let i = 0;
  const typeWriter = () => {
      if (i < text.length) {
          subtitle.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
      }
  };
  
  setTimeout(typeWriter, 1500);
}

// Skills progress animation
function animateSkillsProgress() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const progressBar = entry.target;
              const targetWidth = progressBar.getAttribute('data-width');
              progressBar.style.width = targetWidth + '%';
          }
      });
  });
  
  skillBars.forEach(bar => observer.observe(bar));
}

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const counter = entry.target;
              const target = +counter.getAttribute('data-target');
              const increment = target / 200;
              
              let current = 0;
              const updateCounter = () => {
                  current += increment;
                  counter.textContent = Math.ceil(current);
                  
                  if (current < target) {
                      setTimeout(updateCounter, 1);
                  } else {
                      counter.textContent = target;
                  }
              };
              
              updateCounter();
              observer.unobserve(counter);
          }
      });
  });
  
  counters.forEach(counter => observer.observe(counter));
}

// Smooth hover effects for cards
function initializeCardEffects() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      });
  });
}

// Initialize loading screen
function initializeLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  
  window.addEventListener('load', () => {
      setTimeout(() => {
          loader.style.opacity = '0';
          loader.style.visibility = 'hidden';
          document.body.style.overflow = 'auto';
      }, 500);
  });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
  initializeLoader();
  initializeParallax();
  initializeTypingEffect();
  animateSkillsProgress();
  animateCounters();
  initializeCardEffects();
});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
      const later = () => {
          clearTimeout(timeout);
          func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
      }
  };
}

// Performance optimized scroll events
const optimizedScrollHandler = throttle(() => {
  // Add any scroll-dependent functions here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Error handling
window.addEventListener('error', function(e) {
  console.error('JavaScript error:', e.error);
});