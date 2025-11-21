// Modern Electrician Website - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Hero Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 0) {
        let currentSlide = 0;
        
        function showSlide(index) {
            heroSlides.forEach(slide => slide.classList.remove('active'));
            heroSlides[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % heroSlides.length;
            showSlide(currentSlide);
        }
        
        // Start slider
        setInterval(nextSlide, 4000);
    }
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(13, 27, 42, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(13, 27, 42, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });
    }
    
    // Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .feature-box, .criteria-card, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Call Button Animation Enhancement
    const callButtons = document.querySelectorAll('.btn-primary, .call-btn, .btn-emergency');
    callButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Service Card Interactions
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Emergency Call Button Special Effect
    const emergencyBtn = document.querySelector('.btn-emergency');
    if (emergencyBtn) {
        let pulseCount = 0;
        const maxPulses = 3;
        
        function pulseEmergency() {
            if (pulseCount < maxPulses) {
                emergencyBtn.style.animation = 'none';
                emergencyBtn.offsetHeight; // Trigger reflow
                emergencyBtn.style.animation = 'pulse 0.6s ease-in-out';
                pulseCount++;
                setTimeout(pulseEmergency, 2000);
            }
        }
        
        // Start pulsing after page load
        setTimeout(pulseEmergency, 3000);
    }
    
    // Trust Indicators Animation
    const trustItems = document.querySelectorAll('.trust-item');
    trustItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, 800 + (index * 200));
    });
    
    // Floating Call Button Click Analytics
    const floatingCallBtn = document.querySelector('.floating-call-btn');
    if (floatingCallBtn) {
        floatingCallBtn.addEventListener('click', function() {
            // Track call button clicks for analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'call_button_click', {
                    'event_category': 'engagement',
                    'event_label': 'floating_call_button'
                });
            }
        });
    }
    
    // Page Load Performance Tracking
    window.addEventListener('load', function() {
        // Track page load time for performance monitoring
        const loadTime = performance.now();
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                'event_category': 'performance',
                'value': Math.round(loadTime)
            });
        }
    });
    
    // Error Handling for Missing Elements
    const essentialElements = ['.navbar', '.hero', '.services'];
    essentialElements.forEach(selector => {
        if (!document.querySelector(selector)) {
            console.warn(`Essential element not found: ${selector}`);
        }
    });
    
    // Accessibility Enhancements
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Add focus management for mobile menu
    if (hamburger) {
        hamburger.setAttribute('aria-label', 'Ana menüyü aç/kapat');
        hamburger.setAttribute('aria-expanded', 'false');
        
        hamburger.addEventListener('click', function() {
            const isExpanded = navMenu.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Service Area Click Tracking
    document.querySelectorAll('.area-item').forEach(area => {
        area.addEventListener('click', function() {
            const areaName = this.querySelector('span').textContent;
            if (typeof gtag !== 'undefined') {
                gtag('event', 'area_interest', {
                    'event_category': 'engagement',
                    'event_label': areaName
                });
            }
        });
    });
    
    // Map Interaction Tracking
    const mapIframe = document.querySelector('.map-container iframe');
    if (mapIframe) {
        mapIframe.addEventListener('load', function() {
            // Map loaded successfully
            if (typeof gtag !== 'undefined') {
                gtag('event', 'map_loaded', {
                    'event_category': 'engagement'
                });
            }
        });
    }
    
    console.log('Gümüşlük Elektrikçi website initialized successfully');
});

// Utility Functions
function trackPhoneCall() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'phone_call', {
            'event_category': 'conversion',
            'event_label': 'phone_call'
        });
    }
}

// Add phone call tracking to all phone links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', trackPhoneCall);
    });
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}