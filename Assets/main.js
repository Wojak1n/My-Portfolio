/*==================== CREATIVE PORTFOLIO JAVASCRIPT ====================*/

// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const themeToggle = document.getElementById('theme-toggle');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

/*==================== NAVIGATION ====================*/
// Mobile menu toggle
navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

/*==================== THEME TOGGLE ====================*/
themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');

    // Save theme preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Update icon
    const icon = themeToggle.querySelector('i');
    icon.className = isDark ? 'uil uil-sun' : 'uil uil-moon';
});

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    // Only apply light theme if explicitly saved
    document.body.classList.remove('dark-theme');
    const icon = themeToggle?.querySelector('i');
    if (icon) icon.className = 'uil uil-moon';
} else {
    // Default to dark theme
    document.body.classList.add('dark-theme');
    const icon = themeToggle?.querySelector('i');
    if (icon) icon.className = 'uil uil-sun';
    // Save dark as default if no preference exists
    if (!savedTheme) {
        localStorage.setItem('theme', 'dark');
    }
}


// Smooth follower animation
function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    if (cursorFollower) {
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
    }

    requestAnimationFrame(animateFollower);
}

// Start cursor animation
if (cursor && cursorFollower) {
    animateFollower();
}

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .btn, .nav-link, .project-card, .stat-card');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        if (cursor) cursor.style.transform = 'scale(1.5)';
        if (cursorFollower) {
            cursorFollower.style.transform = 'scale(1.5)';
            cursorFollower.style.opacity = '0.8';
        }
    });

    element.addEventListener('mouseleave', () => {
        if (cursor) cursor.style.transform = 'scale(1)';
        if (cursorFollower) {
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.opacity = '0.5';
        }
    });
});

/*==================== TYPED TEXT ANIMATION ====================*/
const typedElement = document.getElementById('typed-text');

if (typedElement && typeof Typed !== 'undefined') {
    new Typed('#typed-text', {
        strings: [
            'Full Stack Developer',
            'Tech Enthusiast',
            'Problem Solver',
            'Creative Thinker',
            'Hardware Lover'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: false
    });
}

/*==================== COUNTER ANIMATION ====================*/
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

/*==================== SKILL BARS ANIMATION ====================*/
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 500);
    });
}

/*==================== INTERSECTION OBSERVER ====================*/
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate counters when about section is visible
            if (entry.target.classList.contains('about')) {
                animateCounters();
            }

            // Animate skill bars when skills section is visible
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.about, .skills').forEach(section => {
    observer.observe(section);
});

/*==================== SMOOTH SCROLLING ====================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/*==================== PARALLAX EFFECTS ====================*/
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shape');

    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });

    // Hero image parallax
    const heroImage = document.querySelector('.hero-image-container');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
}

window.addEventListener('scroll', parallaxEffect);

/*==================== FORM HANDLING ====================*/
const contactForm = document.querySelector('.form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="uil uil-spinner-alt"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Reset form
            this.reset();

            // Show success message
            submitBtn.innerHTML = '<i class="uil uil-check"></i> Message Sent!';
            submitBtn.style.background = 'var(--success-color)';

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);

            // Show notification
            showNotification('Message sent successfully! 🎉', 'success');
        }, 2000);
    });
}

/*==================== NOTIFICATIONS ====================*/
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-lg);
        padding: var(--space-4);
        color: var(--text-primary);
        z-index: var(--z-tooltip);
        transform: translateX(100%);
        transition: transform var(--transition-normal);
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
}

/*==================== LOADING ANIMATION ====================*/
window.addEventListener('load', () => {
    // Hide loading screen if exists
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }

    // Trigger entrance animations
    document.body.classList.add('loaded');
});

/*==================== PERFORMANCE OPTIMIZATIONS ====================*/
// Throttle function for scroll events
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
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(updateActiveLink, 100));
window.addEventListener('scroll', throttle(parallaxEffect, 16));

/*==================== EASTER EGGS ====================*/
// Konami Code Easter Egg
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
        // Activate rainbow mode
        document.body.style.animation = 'rainbow 2s ease-in-out infinite';
        showNotification('🌈 Rainbow mode activated! You found the easter egg!', 'success');

        // Reset after 10 seconds
        setTimeout(() => {
            document.body.style.animation = '';
            konamiCode = [];
        }, 10000);
    }
});

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

/*==================== ACCESSIBILITY ====================*/
// Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Focus management
navToggle?.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        setTimeout(() => {
            const firstLink = navMenu.querySelector('.nav-link');
            if (firstLink) firstLink.focus();
        }, 100);
    }
});

/*==================== INITIALIZATION ====================*/
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }

    // Add loaded class for CSS animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    console.log('🚀 Creative Portfolio loaded successfully!');
    console.log('💡 Try the Konami Code for a surprise!');
});