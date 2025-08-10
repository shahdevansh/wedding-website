/**
 * Wedding Website JavaScript Functionality
 * Devansh & Nehali - January 2026
 */

// Smooth scrolling functionality
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Event Filtering System for different invitation types
function getURLParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function setCookie(name, value, days = 30) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function filterEventsByInvitation(invitationType) {
    // Get all event day sections
    const eventsSections = document.querySelectorAll('.index-events__day');
    
    // Map each section to the day (based on order in HTML)
    // 0: Thursday (2nd Jan), 1: Friday (3rd Jan), 2: Saturday (4th Jan)
    const sections = Array.from(eventsSections);
    
    // Define which days to show for each invitation type
    const invitationMap = {
        'family': [0, 1, 2], // All three days (2nd, 3rd, 4th Jan)
        'famandfriends': [1, 2], // 3rd and 4th Jan only  
        'all': [2] // 4th Jan only
    };
    
    const daysToShow = invitationMap[invitationType];
    
    if (!daysToShow) {
        // Invalid invitation type, show all days by default
        sections.forEach(section => section.style.display = '');
        return;
    }
    
    // Hide/show sections based on invitation type
    sections.forEach((section, index) => {
        if (daysToShow.includes(index)) {
            section.style.display = '';
        } else {
            section.style.display = 'none';
        }
    });
    
    // Update page title and intro text if needed
    updatePageContent(invitationType);
}

function updatePageContent(invitationType) {
    // Optionally update the events intro text based on invitation type
    const eventIntro = document.querySelector('.index-events__intro h3');
    if (eventIntro) {
        switch(invitationType) {
            case 'family':
                // Show all events, keep original text
                break;
            case 'famandfriends':
                // Could modify text if needed
                break;
            case 'all':
                eventIntro.innerHTML = '<span class="banger-1">Wedding Day</span><span class="banger-2">Events</span>';
                break;
        }
    }
}

function initializeEventFiltering() {
    // Check for URL parameter first
    const urlParam = getURLParameter('p');
    
    let invitationType = null;
    
    if (urlParam && ['family', 'famandfriends', 'all'].includes(urlParam)) {
        // Valid URL parameter found, use it and update cookie
        invitationType = urlParam;
        setCookie('wedding_invitation_type', invitationType);
        console.log(`URL parameter found: ${invitationType}, cookie updated`);
    } else {
        // No valid URL parameter, check cookie
        invitationType = getCookie('wedding_invitation_type');
        console.log(`No URL parameter, using cookie: ${invitationType}`);
    }
    
    // Default to showing all events if no valid parameter or cookie
    if (!invitationType || !['family', 'famandfriends', 'all'].includes(invitationType)) {
        invitationType = 'family'; // Default to showing all events
        console.log(`No valid invitation type, defaulting to: ${invitationType}`);
    }
    
    // Apply the filtering
    filterEventsByInvitation(invitationType);
    
    // Add visual indicator (optional)
    addInvitationIndicator(invitationType);
}

function addInvitationIndicator(invitationType) {
    // Optional: Add a subtle indicator showing what events are being displayed
    const indicatorTexts = {
        'family': 'All Wedding Events',
        'famandfriends': 'Friday & Saturday Events',
        'all': 'Saturday Wedding Events'
    };
    
    // Create or update indicator
    let indicator = document.querySelector('#invitation-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'invitation-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 78, 137, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 12px;
            z-index: 1000;
            font-family: inherit;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(indicator);
    }
    
    indicator.textContent = indicatorTexts[invitationType] || 'Wedding Events';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (indicator) {
            indicator.style.opacity = '0.3';
        }
    }, 5000);
}

// Fun Facts Flip Functionality - Click and Hover
function initFlipCards() {
    const cards = document.querySelectorAll('.index-fact');
    
    cards.forEach(card => {
        // Skip the intro card
        if (card.classList.contains('index-fact__intro')) return;
        
        // Remove any existing event listeners by cloning the element
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        
        // Add click functionality for all devices
        newCard.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('is-active');
        });
        
        // Add hover functionality for desktop (min-width: 770px)
        if (window.innerWidth >= 770) {
            newCard.addEventListener('mouseenter', function() {
                this.classList.add('is-active');
            });
            
            newCard.addEventListener('mouseleave', function() {
                this.classList.remove('is-active');
            });
        }
        
        // Add visual cues
        newCard.style.cursor = 'pointer';
        newCard.style.userSelect = 'none';
    });
}

// Shoe Game Functionality
function initShoeGame() {
    const shoeQ = [
        {b:'partner',g:'self'},
        {b:'self',g:'partner'},
        {b:'partner',g:'self'},
        {b:'partner',g:'partner'},
        {b:'partner',g:'self'},
        {b:'self',g:'partner'},
        {b:'partner',g:'partner'},
        {b:'self',g:'self'}
    ];
    
    const brideImg = document.getElementById('brideImg');
    const groomImg = document.getElementById('groomImg');
    
    if (!brideImg || !groomImg) {
        console.log('Shoe game images not found, skipping initialization');
        return;
    }
    
    function stateSrc(who, ans) {
        if(who === 'b') {
            if(ans === 'self') return 'images/shoe-game/nehali-brides.png';
            if(ans === 'partner') return 'images/shoe-game/nehali-grooms.png';
            return 'images/shoe-game/nehali-std.png';
        } else {
            if(ans === 'self') return 'images/shoe-game/devansh-grooms.png';
            if(ans === 'partner') return 'images/shoe-game/devansh-brides.png';
            return 'images/shoe-game/devansh-std.png';
        }
    }
    
    const stdBride = 'images/shoe-game/nehali-std.png';
    const stdGroom = 'images/shoe-game/devansh-std.png';
    
    const selectElement = document.getElementById('shoeGameSelect');
    if (selectElement) {
        selectElement.addEventListener('change', function() {
            const idx = parseInt(this.value, 10);
            if(isNaN(idx)) return;
            
            const a = shoeQ[idx];
            brideImg.src = stateSrc('b', a.b);
            groomImg.src = stateSrc('g', a.g);
            
            setTimeout(() => {
                brideImg.src = stdBride;
                groomImg.src = stdGroom;
            }, 4000);
        });
    }
}

// Navigation smooth scrolling
function initNavigation() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// RSVP form handling (guarded since form may not exist)
function initRSVPForm() {
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', e => {
            e.preventDefault();
            alert('Thank you for your RSVP! 💕');
            rsvpForm.reset();
        });
    }
}

// Initialize all functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing wedding website...');
    
    // Initialize core functionality
    initNavigation();
    initRSVPForm();
    initializeEventFiltering();
    initShoeGame();
    
    // Initialize flip cards with delay to override other scripts
    setTimeout(initFlipCards, 100);
});

// Re-initialize flip cards on window resize for responsive behavior
window.addEventListener('resize', function() {
    console.log('Reinitializing flip cards on resize...');
    setTimeout(initFlipCards, 100);
});

// Final initialization after longer delay to ensure all scripts are loaded
setTimeout(function() {
    console.log('Final flip cards initialization...');
    initFlipCards();
}, 2000); 