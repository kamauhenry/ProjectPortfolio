// Initialize EmailJS
document.addEventListener('DOMContentLoaded', function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init('KcL0gOD3nsp9DtqMo');
    } else {
        console.warn('EmailJS not loaded');
    }
    
    // Setup event listeners
    setupEventListeners();
    
    // Call animation functions
    initAnimations();
});

// Social Media Links
function openLinkedin() {
    window.open("https://www.linkedin.com/in/henry-kamau-b59959224/", "_blank");
    animateButtonClick(document.querySelector('.social-btn:nth-child(1)'));
}

function openGitHub() {
    window.open("https://github.com/kamauhenry", "_blank");
    animateButtonClick(document.querySelector('.social-btn:nth-child(2)'));
}

function animateButtonClick(button) {
    if (!button) return;
    
    button.classList.add('clicked');
    
    setTimeout(() => {
        button.classList.remove('clicked');
    }, 500);
}

// Smooth scrolling for anchor links
function scrollToSection(e) {
    if (!e.target.closest('a[href^="#"]')) return;
    
    e.preventDefault();
    
    const targetId = e.target.getAttribute('href');
    if (!targetId || targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);