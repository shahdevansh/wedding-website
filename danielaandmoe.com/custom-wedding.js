// Custom Wedding Website JavaScript for Devansh & Nehali
// Enhanced interactive features and animations

document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced Balloon Game with Sound Effects and Animations
    class BalloonGame {
        constructor() {
            this.poppedBalloons = 0;
            this.totalBalloons = 4;
            this.messages = [
                "Welcome to our wedding celebration! 🎉",
                "We can't wait to celebrate with you! 💕", 
                "Together is our favorite place ❤️",
                "Pop all balloons to reveal our story! 🎈"
            ];
            this.init();
        }
        
        init() {
            this.createBalloons();
            this.bindEvents();
        }
        
        createBalloons() {
            const container = document.querySelector('.balloon-container');
            const colors = ['#FF6B35', '#FFD23F', '#FF8FA3', '#B0E0E6'];
            const positions = [
                { top: '20%', left: '10%' },
                { top: '30%', right: '15%' },
                { bottom: '30%', left: '20%' },
                { bottom: '20%', right: '10%' }
            ];
            
            positions.forEach((pos, index) => {
                const balloon = document.createElement('div');
                balloon.className = 'balloon';
                balloon.style.background = colors[index];
                balloon.style.top = pos.top || 'auto';
                balloon.style.left = pos.left || 'auto';
                balloon.style.right = pos.right || 'auto';
                balloon.style.bottom = pos.bottom || 'auto';
                balloon.dataset.message = this.messages[index];
                balloon.dataset.balloonId = index;
                
                container.appendChild(balloon);
            });
        }
        
        bindEvents() {
            document.querySelectorAll('.balloon').forEach(balloon => {
                balloon.addEventListener('click', (e) => this.popBalloon(e.target));
            });
        }
        
        popBalloon(balloon) {
            if (balloon.classList.contains('popped')) return;
            
            balloon.classList.add('popped');
            this.poppedBalloons++;
            
            // Create pop effect
            this.createPopEffect(balloon);
            
            // Show message
            this.showMessage(balloon.dataset.message);
            
            // Check if all balloons popped
            if (this.poppedBalloons === this.totalBalloons) {
                setTimeout(() => {
                    this.showCompletionMessage();
                }, 1000);
            }
        }
        
        createPopEffect(balloon) {
            const rect = balloon.getBoundingClientRect();
            const effect = document.createElement('div');
            effect.innerHTML = '🎉';
            effect.style.position = 'fixed';
            effect.style.left = rect.left + 'px';
            effect.style.top = rect.top + 'px';
            effect.style.fontSize = '2rem';
            effect.style.pointerEvents = 'none';
            effect.style.zIndex = '1001';
            effect.style.animation = 'popEffect 1s ease-out forwards';
            
            document.body.appendChild(effect);
            setTimeout(() => effect.remove(), 1000);
        }
        
        showMessage(message) {
            const modal = document.getElementById('balloonModal');
            const text = document.getElementById('balloonText');
            text.textContent = message;
            modal.classList.remove('hidden');
        }
        
        showCompletionMessage() {
            const modal = document.getElementById('balloonModal');
            const text = document.getElementById('balloonText');
            text.innerHTML = '🎉 Congratulations! You found all our messages!<br><br>Welcome to our wedding celebration! Now scroll down to learn more about our journey together! 💕';
            modal.classList.remove('hidden');
        }
    }
    
    // Initialize balloon game
    const balloonGame = new BalloonGame();
    
    // Enhanced Flip Card Interactions - Click/Tap for All Devices
    class FlipCardEnhancer {
        constructor() {
            this.init();
        }
        
        init() {
            // Remove hover and enable click for all index-fact cards
            document.querySelectorAll('.index-fact').forEach(card => {
                // Skip the intro card
                if (card.classList.contains('index-fact__intro')) return;
                
                card.addEventListener('click', () => this.flipCard(card));
                card.addEventListener('touchstart', () => this.flipCard(card));
                
                // Add cursor pointer to indicate clickability
                card.style.cursor = 'pointer';
                card.style.userSelect = 'none';
            });
        }
        
        flipCard(card) {
            // Toggle the is-active class which handles the flip animation
            card.classList.toggle('is-active');
        }
    }
    
    // Initialize flip card enhancer
    const flipCardEnhancer = new FlipCardEnhancer();
    
    // Smooth Scroll with Offset for Fixed Navigation
    function smoothScrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        const navHeight = 80; // Height of fixed navigation
        const sectionTop = section.offsetTop - navHeight;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
    
    // Enhanced Navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScrollToSection(targetId);
            
            // Update active nav item
            document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // RSVP Form Enhancement
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('Thank you for your RSVP! We\'ll be in touch soon. 💕', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 1002;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
    
    // Parallax Effect for Hero Section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe timeline items and flip cards
    document.querySelectorAll('.timeline-item, .flip-card').forEach(item => {
        observer.observe(item);
    });
    
    // Modal Management
    window.closeBalloonModal = function() {
        document.getElementById('balloonModal').classList.add('hidden');
    };
    
    window.scrollToSection = smoothScrollToSection;
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popEffect {
            0% { transform: scale(1) rotate(0deg); opacity: 1; }
            50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
            100% { transform: scale(2) rotate(360deg); opacity: 0; }
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
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .flip-card {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .timeline-item {
            opacity: 0;
            transform: translateY(30px);
        }
        
        nav a.active {
            color: var(--sunset-orange) !important;
            font-weight: 600;
        }
        
        .notification {
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);
    
    // Add loading animation
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loadingScreen';
    loadingScreen.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #B0E0E6 0%, #FF6B35 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease-out;
        ">
            <div style="text-align: center; color: white;">
                <h1 style="font-size: 3rem; margin-bottom: 1rem;">D & N</h1>
                <div style="width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
            </div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => loadingScreen.remove(), 500);
        }, 1000);
    });
});

// Additional utility functions
function createConfetti() {
    const colors = ['#FF6B35', '#FFD23F', '#FF8FA3', '#B0E0E6', '#006A6B'];
    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
    `;
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}%;
            animation: confettiFall ${Math.random() * 3 + 2}s linear infinite;
            opacity: 0.8;
        `;
        confettiContainer.appendChild(confetti);
    }
    
    document.body.appendChild(confettiContainer);
    
    setTimeout(() => confettiContainer.remove(), 5000);
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(confettiStyle); 