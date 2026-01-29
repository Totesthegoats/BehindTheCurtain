// ===== Cursor Glow Effect =====
document.addEventListener('DOMContentLoaded', () => {
    const cursorGlow = document.querySelector('.cursor-glow');

    if (cursorGlow && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Animate Stats Counter =====
const animateCounter = (element, target, suffix = '') => {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
};

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');

            // Animate stat counters
            if (entry.target.classList.contains('hero-stats')) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('counted')) {
                    statNumber.classList.add('counted');
                    animateCounter(statNumber, parseInt(statNumber.dataset.target));
                }
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section, .hero-stats, .expertise-card, .project-card').forEach(el => {
    animateOnScroll.observe(el);
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Collect form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Simulate form submission (replace with actual endpoint)
        try {
            // In production, replace this with actual form submission
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'var(--color-success)';

            // Reset form
            contactForm.reset();

            // Reset button after delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);

        } catch (error) {
            submitBtn.textContent = 'Error - Try Again';
            submitBtn.style.background = 'var(--color-error)';

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// ===== Typing Effect for Hero (optional) =====
const createTypingEffect = (element, text, speed = 50) => {
    let i = 0;
    element.textContent = '';

    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };

    type();
};

// ===== Add dynamic styles for mobile menu =====
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 72px;
            left: 0;
            right: 0;
            background: rgba(10, 10, 11, 0.98);
            backdrop-filter: blur(12px);
            padding: 24px;
            flex-direction: column;
            gap: 16px;
            border-bottom: 1px solid var(--color-border);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .nav-links.active {
            display: flex;
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }

        .nav-links a {
            font-size: 1.1rem;
            padding: 12px 0;
        }

        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    }

    /* Animation classes */
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .expertise-card,
    .project-card {
        opacity: 0;
        transform: translateY(30px);
    }

    .expertise-card.animate-in,
    .project-card.animate-in {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.6s ease;
    }

    .expertise-card:nth-child(1) { transition-delay: 0.1s; }
    .expertise-card:nth-child(2) { transition-delay: 0.2s; }
    .expertise-card:nth-child(3) { transition-delay: 0.3s; }
    .expertise-card:nth-child(4) { transition-delay: 0.4s; }

    .project-card:nth-child(1) { transition-delay: 0.1s; }
    .project-card:nth-child(2) { transition-delay: 0.2s; }
    .project-card:nth-child(3) { transition-delay: 0.3s; }
`;
document.head.appendChild(style);

// ===== Parallax Effect for Background Orbs =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');

    if (orb1 && orb2) {
        orb1.style.transform = `translate(${scrolled * 0.03}px, ${scrolled * 0.05}px)`;
        orb2.style.transform = `translate(${-scrolled * 0.02}px, ${-scrolled * 0.04}px)`;
    }
});

// ===== Easter Egg - Konami Code =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Bitcoin animation!
            const btc = document.createElement('div');
            btc.innerHTML = '₿';
            btc.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 200px;
                color: #f7931a;
                z-index: 9999;
                animation: bitcoinPop 2s ease forwards;
            `;
            document.body.appendChild(btc);

            const popStyle = document.createElement('style');
            popStyle.textContent = `
                @keyframes bitcoinPop {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
                }
            `;
            document.head.appendChild(popStyle);

            setTimeout(() => btc.remove(), 2000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// ===== Console Message =====
console.log('%c₿ Behind the Curtain', 'color: #f7931a; font-size: 24px; font-weight: bold;');
console.log('%cDon\'t trust, verify.', 'color: #a1a1aa; font-size: 14px;');
console.log('%c21 million. No more.', 'color: #f7931a; font-size: 12px;');
