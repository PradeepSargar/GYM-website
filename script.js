// DOM Elements
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');
const loginSuccess = document.getElementById('login-success');

// Gym symbols to be displayed in the background
const gymSymbols = [
    '💪', '🏋️', '🏃', '🤸', '⚡', '🔥', '🥊', '🏆', '⛹️', '🧘', '🤾', '🚴',
    '🏅', '🎯', '🧠', '💯', '⏱️', '🥇', '🥈', '🥉', '🏐', '🏈', '⚽', '🏀',
    '⚾', '🥎', '🎾', '🏉', '🎱', '🏓', '🏸', '🥍', '🏏', '🥋', '🥊', '🤼'
];

// Initialize floating symbols when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create floating gym symbols
    new FloatingSymbols();
});

// Class to handle floating gym symbols in the background
class FloatingSymbols {
    constructor() {
        this.symbols = [];
        this.mainFrame = document.querySelector('.main-frame');
        this.createSymbols();
        this.animateSymbols();
    }

    createSymbols() {
        // Create 30 gym symbols in a grid pattern for even distribution
        const rows = 5;
        const cols = 6;
        const totalSymbols = rows * cols;
        
        // Calculate cell size for grid
        const cellWidth = 100 / cols;
        const cellHeight = 100 / rows;
        
        // Create symbols in a grid pattern
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const symbol = document.createElement('div');
                symbol.className = 'floating-symbol';
                symbol.textContent = gymSymbols[Math.floor(Math.random() * gymSymbols.length)];
                
                // Calculate base position within the cell
                const baseX = col * cellWidth;
                const baseY = row * cellHeight;
                
                // Add some randomness within the cell (±30% of cell size)
                const offsetX = (Math.random() - 0.5) * cellWidth * 0.6;
                const offsetY = (Math.random() - 0.5) * cellHeight * 0.6;
                
                const posX = baseX + cellWidth/2 + offsetX;
                const posY = baseY + cellHeight/2 + offsetY;
                
                // Random size and animation duration
                const size = Math.random() * 30 + 20; // 20-50px
                const duration = Math.random() * 20 + 10; // 10-30s
                const delay = Math.random() * 5; // 0-5s
                
                symbol.style.cssText = `
                    font-size: ${size}px;
                    left: ${posX}%;
                    top: ${posY}%;
                    animation-duration: ${duration}s;
                    animation-delay: ${delay}s;
                    opacity: ${Math.random() * 0.5 + 0.1}; /* 0.1-0.6 opacity */
                `;
                
                this.mainFrame.appendChild(symbol);
                this.symbols.push(symbol);
            }
        }
    }

    animateSymbols() {
        // Continuously update positions for floating effect
        setInterval(() => {
            this.symbols.forEach(symbol => {
                // Get current position
                const currentLeft = parseFloat(symbol.style.left);
                const currentTop = parseFloat(symbol.style.top);
                
                // Add small random movement
                const newLeft = (currentLeft + (Math.random() * 2 - 1) + 100) % 100;
                const newTop = (currentTop + (Math.random() * 2 - 1) + 100) % 100;
                
                // Apply new position with transition
                symbol.style.left = `${newLeft}%`;
                symbol.style.top = `${newTop}%`;
            });
        }, 5000); // Update every 5 seconds
    }
}

// Form validation and interaction
class LoginForm {
    constructor() {
        this.isLoading = false;
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
