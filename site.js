document.addEventListener('DOMContentLoaded', function() {
    // EmailJS Initialization
    if (typeof emailjs !== 'undefined') {
        emailjs.init('KcL0gOD3nsp9DtqMo'); // Your public key
    } else {
        console.warn('EmailJS not loaded');
    }

    // Setup event listeners
    setupEventListeners();
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
    setTimeout(() => button.classList.remove('clicked'), 500);
}

// EmailJS Form Submission
function sendEmail(event) {
    event.preventDefault();
    
    const form = event.target;
    const indicator = form.querySelector('#form-indicator');
    indicator.style.display = 'inline-block'; // Show spinner
    
    emailjs.sendForm('service_27rl3pt', 'service_27rl3pt', form)
        .then(() => {
            alert('Message sent successfully!');
            form.reset(); // Clear form
            indicator.style.display = 'none'; // Hide spinner
        })
        .catch(error => {
            console.error('EmailJS error:', error);
            alert('Failed to send message. Please try again.');
            indicator.style.display = 'none'; // Hide spinner
        });
}

function setupEventListeners() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.links-container');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    // Prevent re-fetching if already on the page
    document.querySelectorAll('.link').forEach(link => {
        link.addEventListener('click', (e) => {
            const currentPage = document.body.getAttribute('data-current-page');
            const targetPage = link.getAttribute('data-page');
            if (currentPage === targetPage) {
                e.preventDefault(); // Stop HTMX request
                return;
            }
        });
    });

    // Update current page after HTMX swap
    document.body.addEventListener('htmx:afterSwap', (e) => {
        const requestedLink = document.querySelector(`.link[hx-get="${e.detail.path}"]`);
        if (requestedLink) {
            const newPage = requestedLink.getAttribute('data-page');
            document.body.setAttribute('data-current-page', newPage);
            // Update active link styling
            document.querySelectorAll('.link').forEach(l => l.classList.remove('active'));
            requestedLink.classList.add('active');
        }
        navLinks.classList.remove('active');
        hamburger.classList.remove('open');
        initAnimations();
    });
}

// Reveal Animation on Scroll
function initAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2 });

    reveals.forEach(section => observer.observe(section));
}
document.body.addEventListener('htmx:responseError', (e) => {
    console.error('HTMX request failed:', e.detail);
    const contentDiv = document.querySelector('#content');
    contentDiv.innerHTML = '<p>Sorry, something went wrong. Please try again.</p>';
});