document.addEventListener('DOMContentLoaded', function () {
    // EmailJS Initialization
    if (typeof emailjs !== 'undefined') {
        emailjs.init('KcL0gOD3nsp9DtqMo');
    }

    // Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: function (t) {
                return Math.min(1, 1.001 - Math.pow(2, -10 * t));
            }
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    setupNavigation();
    setupScrollDirection();
    initAnimations();
});

// ── Navigation ──────────────────────────────────────────

function setupNavigation() {
    var hamburger = document.querySelector('.hamburger-menu');
    var navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
    }

    // Prevent re-fetching same page
    document.querySelectorAll('.link').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var currentPage = document.body.getAttribute('data-current-page');
            var targetPage = link.getAttribute('data-page');
            if (currentPage === targetPage) {
                e.preventDefault();
            }
        });
    });

    // Update state after HTMX swap
    document.body.addEventListener('htmx:afterSwap', function (e) {
        var path = e.detail.pathInfo ? e.detail.pathInfo.requestPath : '';
        var requestedLink = document.querySelector('.link[hx-get="' + path + '"]');
        if (requestedLink) {
            var newPage = requestedLink.getAttribute('data-page');
            document.body.setAttribute('data-current-page', newPage);
            document.querySelectorAll('.link').forEach(function (l) {
                l.classList.remove('active');
            });
            requestedLink.classList.add('active');
        }

        // Close mobile menu
        if (navLinks) navLinks.classList.remove('active');
        if (hamburger) hamburger.classList.remove('open');

        // Re-init animations for new content
        initAnimations();

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ── Scroll-Direction Navbar ─────────────────────────────

function setupScrollDirection() {
    var lastScroll = 0;
    var nav = document.getElementById('main-nav');
    if (!nav) return;

    window.addEventListener('scroll', function () {
        var current = window.scrollY;
        if (current > lastScroll && current > 80) {
            nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }
        lastScroll = current;
    }, { passive: true });
}

// ── Animations ──────────────────────────────────────────

function initAnimations() {
    var reveals = document.querySelectorAll('.reveal:not(.active)');

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Stagger children with .reveal-child class
                var children = entry.target.querySelectorAll('.reveal-child');
                children.forEach(function (child, i) {
                    child.style.transitionDelay = (i * 0.08) + 's';
                    child.classList.add('active');
                });
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(function (section) {
        observer.observe(section);
    });
}

// ── Social Media Links ──────────────────────────────────

function openLinkedin() {
    window.open('https://www.linkedin.com/in/henry-kamau-b59959224/', '_blank');
}

function openGitHub() {
    window.open('https://github.com/kamauhenry', '_blank');
}

// ── EmailJS Form Submission ─────────────────────────────

function sendEmail(event) {
    event.preventDefault();

    var form = event.target;
    var indicator = form.querySelector('#form-indicator');
    if (indicator) indicator.style.display = 'inline-block';

    emailjs.sendForm('service_27rl3pt', 'service_27rl3pt', form)
        .then(function () {
            alert('Message sent successfully!');
            form.reset();
            if (indicator) indicator.style.display = 'none';
        })
        .catch(function (error) {
            console.error('EmailJS error:', error);
            alert('Failed to send message. Please try again.');
            if (indicator) indicator.style.display = 'none';
        });
}

// ── HTMX Error Handling ─────────────────────────────────

document.body.addEventListener('htmx:responseError', function (e) {
    console.error('HTMX request failed:', e.detail);
    var contentDiv = document.querySelector('#content');
    if (contentDiv) {
        contentDiv.innerHTML = '<div style="text-align:center;padding:4rem 2rem;"><p style="color:#6B7280;">Something went wrong. Please try again.</p></div>';
    }
});
