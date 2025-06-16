// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeTypingEffect();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeContactForm();
    initializeFloatingElements();
    initializeThemeToggle();
    initializeSmoothScrolling();
    initializeParallaxEffects();
    initializeResumeDownload();
    initializeHomeNotification();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink?.classList.add('active');
            }
        });
    });
}

// Home notification functionality
function initializeHomeNotification() {
    const homeLink = document.getElementById('home-link');
    const homeNotification = document.getElementById('home-notification');
    let notificationTimeout;

    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Show notification
        homeNotification.classList.add('show');
        
        // Clear any existing timeout
        if (notificationTimeout) {
            clearTimeout(notificationTimeout);
        }
        
        // Hide notification after 3 seconds
        notificationTimeout = setTimeout(() => {
            homeNotification.classList.remove('show');
        }, 3000);
        
        // Scroll to home section
        document.getElementById('home').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Hide notification when clicking outside
    document.addEventListener('click', (e) => {
        if (!homeLink.contains(e.target) && !homeNotification.contains(e.target)) {
            homeNotification.classList.remove('show');
        }
    });

    // Hide notification on scroll
    window.addEventListener('scroll', () => {
        homeNotification.classList.remove('show');
    });
}

// Typing effect for hero section
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    const texts = [
        'Full-Stack Developer',
        'Software Engineer',
        'Problem Solver',
        'Tech Enthusiast',
        'Code Craftsman'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    
    function typeText() {
        const fullText = texts[textIndex];
        
        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        typingElement.textContent = currentText;
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentText === fullText) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before starting new text
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    typeText();
}

// Scroll animations using Intersection Observer
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger skill bar animations
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Add stagger effect for project cards
                if (entry.target.classList.contains('projects-grid')) {
                    const cards = entry.target.querySelectorAll('.project-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .about-card, .skills, .timeline-item, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Skill bars animation
function initializeSkillBars() {
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 100);
        });
    }

    // Make function globally accessible
    window.animateSkillBars = animateSkillBars;
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
            
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        font-size: 14px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Floating elements animation
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const speed = element.getAttribute('data-speed') || 1;
        const direction = index % 2 === 0 ? 1 : -1;
        
        setInterval(() => {
            const currentRotation = parseInt(element.style.transform.replace(/[^\d]/g, '')) || 0;
            element.style.transform = `rotate(${currentRotation + (direction * speed)}deg)`;
        }, 50);
    });
}

// Theme toggle functionality
function initializeThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 18px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    themeToggle.addEventListener('mouseenter', () => {
        themeToggle.style.transform = 'scale(1.1)';
    });
    
    themeToggle.addEventListener('mouseleave', () => {
        themeToggle.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(themeToggle);
    
    // Theme toggle functionality
    let isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    function toggleTheme() {
        isDarkMode = !isDarkMode;
        localStorage.setItem('darkMode', isDarkMode);
        
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    themeToggle.addEventListener('click', toggleTheme);
    
    // Apply saved theme
    if (isDarkMode) {
        toggleTheme();
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effects
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-visual, .floating-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Resume download functionality
function initializeResumeDownload() {
    const resumeBtn = document.getElementById('resume-btn');
    
    resumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create a temporary link to download the resume
        const link = document.createElement('a');
        link.href = 'Himanshu Upadhyay.pdf'; // Path to the resume file
        link.download = 'Himanshu_Upadhyay_Resume.pdf';
        link.target = '_blank';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success notification
        showNotification('Resume download started!', 'success');
    });
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 10);
    };
    
    // Preload critical images
    const criticalImages = [
        'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg',
        'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Could send error to analytics service
});

// Initialize performance optimizations
optimizePerformance();

// Add CSS for dark mode
const darkModeStyles = `
    .dark-mode {
        --white: #1F2937;
        --light-color: #111827;
        --gray-50: #374151;
        --gray-100: #4B5563;
        --gray-200: #6B7280;
        --gray-300: #9CA3AF;
        --gray-800: #F9FAFB;
        --gray-900: #FFFFFF;
    }
    
    .dark-mode .navbar {
        background: rgba(31, 41, 55, 0.95);
        border-bottom-color: #374151;
    }
    
    .dark-mode .project-card,
    .dark-mode .about-card,
    .dark-mode .contact-item,
    .dark-mode .timeline-content {
        background: #374151;
        border-color: #4B5563;
    }
    
    .dark-mode .tech-tag {
        background: #4B5563;
        color: #F9FAFB;
        border-color: #6B7280;
    }
    
    .dark-mode .form-group input,
    .dark-mode .form-group textarea {
        background: #374151;
        border-color: #4B5563;
        color: #F9FAFB;
    }
`;

// Add dark mode styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = darkModeStyles;
document.head.appendChild(styleSheet);

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}