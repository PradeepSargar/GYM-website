// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navButtons.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navButtons.classList.remove('active');
                }
            }
        });
    });
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .class-card, .membership-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    
    // Membership plan selection
    const membershipBtns = document.querySelectorAll('.membership-btn');
    
    membershipBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Get plan name from parent card
            const planName = btn.closest('.membership-card').querySelector('h3').textContent;
            alert(`You selected the ${planName} plan. Redirecting to registration...`);
        });
    });
    
    // Call to action and hero buttons
    const ctaBtn = document.querySelector('.cta-section .primary-btn');
    const heroStartBtn = document.querySelector('.hero-buttons .primary-btn');
    const heroLearnBtn = document.querySelector('.hero-buttons .secondary-btn');
    
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            alert('Thank you for your interest! Redirecting to registration page...');
        });
    }
    
    if (heroStartBtn) {
        heroStartBtn.addEventListener('click', () => {
            alert('Thank you for your interest! Redirecting to registration page...');
        });
    }
    
    if (heroLearnBtn) {
        heroLearnBtn.addEventListener('click', () => {
            // Scroll to features section
            const featuresSection = document.querySelector('.features-section');
            if (featuresSection) {
                window.scrollTo({
                    top: featuresSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Login and signup buttons in navbar
    const loginBtn = document.querySelector('.nav-buttons .login-btn');
    const signupBtn = document.querySelector('.nav-buttons .signup-btn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            alert('Login functionality will be implemented soon!');
        });
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            alert('Sign up functionality will be implemented soon!');
        });
    }
});

// Add CSS class for scroll animation
const addAnimationStyles = () => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .feature-card, .class-card, .membership-card, .testimonial-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate, .class-card.animate, .membership-card.animate, .testimonial-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-links.active, .nav-buttons.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background: linear-gradient(135deg, #1a2a6c, #b21f1f);
            padding: 20px;
            z-index: 100;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        
        .nav-links.active {
            gap: 15px;
        }
        
        .nav-buttons.active {
            top: calc(70px + 200px);
            gap: 10px;
        }
        
        @media (max-width: 768px) {
            .nav-links a::after {
                display: none;
            }
        }
    `;
    document.head.appendChild(styleSheet);
};

// Initialize animation styles
addAnimationStyles();

// Testimonial carousel functionality
class TestimonialCarousel {
    constructor() {
        this.isLoading = false;
        this.setupCarousel();
    }
    
    setupCarousel() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        if (testimonials.length > 0) {
            // Simple auto-rotation for testimonials
            let currentIndex = 0;
            
            setInterval(() => {
                testimonials.forEach((testimonial, index) => {
                    testimonial.style.opacity = index === currentIndex ? '1' : '0.5';
                    testimonial.style.transform = index === currentIndex ? 'scale(1.05)' : 'scale(1)';
                });
                
                currentIndex = (currentIndex + 1) % testimonials.length;
            }, 3000);
        }
    }
}

// Initialize testimonial carousel
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialCarousel();
});
        this.init();
    }

    init() {
        this.addEventListeners();
        this.addInputAnimations();
    }

    addEventListeners() {
        // Login button click
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Enter key press
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleLogin();
            }
        });

        // Input focus effects
        [usernameInput, passwordInput].forEach(input => {
            input.addEventListener('focus', () => {
                this.clearErrors();
                this.addFocusEffect(input);
            });

            input.addEventListener('blur', () => {
                this.removeFocusEffect(input);
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    addInputAnimations() {
        // Add typing animation to inputs
        [usernameInput, passwordInput].forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.length > 0) {
                    input.parentElement.classList.add('has-content');
                } else {
                    input.parentElement.classList.remove('has-content');
                }
            });
        });
    }

    addFocusEffect(input) {
        input.parentElement.style.transform = 'scale(1.02)';
    }

    removeFocusEffect(input) {
        input.parentElement.style.transform = 'scale(1)';
    }

    validateField(input) {
        const value = input.value.trim();
        const fieldName = input.id;

        if (fieldName === 'username') {
            if (value.length < 3) {
                this.showError(input, 'Username must be at least 3 characters');
                return false;
            }
        } else if (fieldName === 'password') {
            if (value.length < 6) {
                this.showError(input, 'Password must be at least 6 characters');
                return false;
            }
        }

        this.showSuccess(input);
        return true;
    }

    showError(input, message) {
        const errorElement = document.getElementById(`${input.id}-error`);
        input.parentElement.classList.add('error');
        input.parentElement.classList.remove('success');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    showSuccess(input) {
        input.parentElement.classList.add('success');
        input.parentElement.classList.remove('error');
        const errorElement = document.getElementById(`${input.id}-error`);
        errorElement.classList.remove('show');
    }

    clearFieldError(input) {
        const errorElement = document.getElementById(`${input.id}-error`);
        input.parentElement.classList.remove('error', 'success');
        errorElement.classList.remove('show');
    }

    clearErrors() {
        [usernameError, passwordError, loginSuccess].forEach(element => {
            element.classList.remove('show');
        });
        [usernameInput.parentElement, passwordInput.parentElement].forEach(element => {
            element.classList.remove('error', 'success');
        });
    }

    async handleLogin() {
        if (this.isLoading) return;

        // Clear previous messages
        this.clearErrors();

        // Validate inputs
        const isUsernameValid = this.validateField(usernameInput);
        const isPasswordValid = this.validateField(passwordInput);

        if (!isUsernameValid || !isPasswordValid) {
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        // Simulate API call
        try {
            await this.simulateLogin();
            this.showSuccessMessage();
        } catch (error) {
            this.showLoginError(error.message);
        } finally {
            this.setLoadingState(false);
        }
    }

    setLoadingState(loading) {
        this.isLoading = loading;
        if (loading) {
            loginBtn.classList.add('loading');
            loginBtn.textContent = '';
            loginBtn.disabled = true;
        } else {
            loginBtn.classList.remove('loading');
            loginBtn.textContent = 'Login';
            loginBtn.disabled = false;
        }
    }

    async simulateLogin() {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Demo credentials (in real app, this would be an API call)
        if (username === 'demo' && password === 'password123') {
            return { success: true, message: 'Login successful!' };
        } else {
            throw new Error('Invalid username or password. Try: demo / password123');
        }
    }

    showSuccessMessage() {
        loginSuccess.textContent = 'Login successful! Welcome back!';
        loginSuccess.classList.add('show');
        
        // Reset form after success
        setTimeout(() => {
            usernameInput.value = '';
            passwordInput.value = '';
            loginSuccess.classList.remove('show');
        }, 3000);
    }

    showLoginError(message) {
        loginSuccess.textContent = message;
        loginSuccess.style.color = '#ff4444';
        loginSuccess.classList.add('show');
        
        setTimeout(() => {
            loginSuccess.classList.remove('show');
            loginSuccess.style.color = '#00C851';
        }, 3000);
    }
}

// Initialize the form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LoginForm();
    
    // Add some fun background animation
    const background = document.querySelector('.background-image');
    if (background) {
        background.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            background.style.transform = `translate(-50%, -50%) scale(1.05) translate(${x * 10}px, ${y * 10}px)`;
        });
    }
});

// Add some additional interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        .login-button {
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
    document.head.appendChild(style);

    // Add ripple effect to login button
    loginBtn.addEventListener('click', createRipple);
});
