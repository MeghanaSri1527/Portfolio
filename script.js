// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Hide cursor on touch devices
if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
}

// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    if (navMenu.classList.contains('active')) {
        document.body.classList.add('menu-open');
    } else {
        document.body.classList.remove('menu-open');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typewriter effect
const typewriter = document.getElementById('typewriter');
const roles = [
    'Front-End Developer',
    'Software Developer', 
    'Web Designer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriter.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeRole, typeSpeed);
}

// Start typewriter effect
typeRole();

// Floating elements animation
function animateFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    elements.forEach((element, index) => {
        const speed = element.dataset.speed || 1;
        const offset = Math.sin(Date.now() * 0.001 * speed + index) * 10;
        element.style.transform = `translateY(${offset}px)`;
    });
    requestAnimationFrame(animateFloatingElements);
}

animateFloatingElements();

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Add scroll reveal to elements
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .education-card, .stat-item');
    revealElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
});

// Active navigation link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Back to top button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        
        // Remove focus from inputs to reset labels
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.blur();
        });
        
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                gap: 0.8rem;
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                max-width: 350px;
                border-left: 4px solid #667eea;
            }
            
            .notification.success {
                border-left-color: #10b981;
            }
            
            .notification.success i {
                color: #10b981;
            }
            
            .notification.error {
                border-left-color: #ef4444;
            }
            
            .notification.error i {
                color: #ef4444;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                opacity: 0.7;
                margin-left: auto;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Form label animations
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
    
    // Check if input has value on page load
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && scrolled < hero.offsetHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation to elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.hero-text, .hero-image, .section-header');
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Skills category hover effects
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('mouseenter', () => {
        category.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    category.addEventListener('mouseleave', () => {
        category.style.transform = 'translateY(0) scale(1)';
    });
});

// Project card interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px)';
        card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
    });
});

// Animate statistics counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 16);
    });
}

// Trigger counter animation when about section is in view
const aboutSection = document.querySelector('.about');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    counterObserver.observe(aboutSection);
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Initialize all animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS for active nav link
    const navStyles = document.createElement('style');
    navStyles.textContent = `
        .nav-link.active {
            color: #667eea !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(navStyles);
    
    console.log('Portfolio loaded successfully!');
});

// Performance optimization - Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Your scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add smooth page transitions
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('🎉 Easter egg activated! You found the Konami code!', 'success');
        konamiCode = [];
        
        // Add fun animation
        document.body.style.animation = 'rainbow 2s linear';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});

// Rainbow animation for easter egg
const rainbowStyles = document.createElement('style');
rainbowStyles.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyles);

// Animate skill rings in the enhanced skills section
function animateSkillRings() {
  const rings = document.querySelectorAll('.enhanced-skills-section .skill-ring');
  rings.forEach(ring => {
    const percent = parseInt(ring.getAttribute('data-percent'), 10);
    const circle = ring.querySelector('.progress');
    const radius = 26;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - percent / 100);
    ring.classList.add('animated');
    setTimeout(() => {
      circle.style.strokeDashoffset = offset;
    }, 200);
  });
}

// Trigger animation when section is in view
function onScrollSkillsSection() {
  const section = document.querySelector('.enhanced-skills-section');
  if (!section) return;
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80) {
    animateSkillRings();
    window.removeEventListener('scroll', onScrollSkillsSection);
  }
}
window.addEventListener('scroll', onScrollSkillsSection);
window.addEventListener('DOMContentLoaded', onScrollSkillsSection);

// Animate bar skill fills in the robo-bar-skills-section
function animateRoboBarSkills() {
  const bars = document.querySelectorAll('.robo-bar-skills-section .bar-skill-fill');
  bars.forEach(bar => {
    const percent = parseInt(bar.getAttribute('data-percent'), 10);
    bar.style.width = percent + '%';
  });
  // Fade in section header and grid
  const header = document.querySelector('.robo-bar-skills-section .section-header');
  if (header) header.style.opacity = 1;
  const grid = document.querySelector('.robo-bar-skills-grid');
  if (grid) grid.style.opacity = 1;
  // Fade in headings
  document.querySelectorAll('.robo-bar-skills-section .bar-skills-heading').forEach(h => h.style.opacity = 1);
  // Fade in mascot caption
  const caption = document.querySelector('.robo-mascot-caption');
  if (caption) caption.style.opacity = 1;
}

// Trigger animation when section is in view
function onScrollRoboBarSkillsSection() {
  const section = document.querySelector('.robo-bar-skills-section');
  if (!section) return;
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80) {
    animateRoboBarSkills();
    window.removeEventListener('scroll', onScrollRoboBarSkillsSection);
  }
}
window.addEventListener('scroll', onScrollRoboBarSkillsSection);
window.addEventListener('DOMContentLoaded', onScrollRoboBarSkillsSection);

// Light/Dark mode toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleIcon = document.getElementById('theme-toggle-icon');

function setTheme(mode) {
    if (mode === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleIcon.textContent = '☀️';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggleIcon.textContent = '🌙';
    }
}

// Check localStorage on load
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('dark-mode-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('dark-theme');
      if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // Load saved theme
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
  }
});