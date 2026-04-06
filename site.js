document.addEventListener('DOMContentLoaded', function () {
    // EmailJS Initialization
    if (typeof emailjs !== 'undefined') {
        emailjs.init('KcL0gOD3nsp9DtqMo');
    }

    // Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
        var lenis = new Lenis({
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
    initMagneticButtons();
    initCounterAnimation();
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

        // Re-init animations and interactions for new content
        initAnimations();
        initMagneticButtons();
        initCounterAnimation();

        // Page transition animation
        var contentDiv = document.querySelector('#content');
        if (contentDiv) {
            contentDiv.style.animation = 'none';
            contentDiv.offsetHeight; // force reflow
            contentDiv.style.animation = '';
        }

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

    // Stagger grid items (project cards, service cards, skill items)
    var staggerContainers = document.querySelectorAll('.projects-grid, .services-grid, .skills-list, .skill-tags');
    var staggerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var items = entry.target.querySelectorAll('.stagger-item:not(.stagger-visible)');
                items.forEach(function (item, i) {
                    item.style.transitionDelay = (i * 0.08) + 's';
                    setTimeout(function () {
                        item.classList.add('stagger-visible');
                    }, 50);
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    staggerContainers.forEach(function (container) {
        staggerObserver.observe(container);
    });
}

// ── Magnetic Buttons ────────────────────────────────────

function initMagneticButtons() {
    var buttons = document.querySelectorAll('.btn-primary-cta, .nav-cta');
    buttons.forEach(function (btn) {
        if (btn.dataset.magnetic) return; // already initialized
        btn.dataset.magnetic = 'true';

        btn.addEventListener('mousemove', function (e) {
            var rect = btn.getBoundingClientRect();
            var x = e.clientX - rect.left - rect.width / 2;
            var y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = 'translate(' + (x * 0.12) + 'px, ' + (y * 0.12) + 'px)';
        });

        btn.addEventListener('mouseleave', function () {
            btn.style.transform = '';
        });
    });
}

// ── Counter Animation ───────────────────────────────────

function initCounterAnimation() {
    var counters = document.querySelectorAll('.metric-number[data-count]');
    if (!counters.length) return;

    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                var target = parseInt(entry.target.getAttribute('data-count'));
                var display = entry.target.getAttribute('data-display') || String(target);
                var duration = 1500;
                var startTime = null;

                function step(timestamp) {
                    if (!startTime) startTime = timestamp;
                    var progress = Math.min((timestamp - startTime) / duration, 1);
                    // Cubic ease-out
                    var eased = 1 - Math.pow(1 - progress, 3);
                    entry.target.textContent = Math.floor(eased * target);
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        entry.target.textContent = display;
                    }
                }
                requestAnimationFrame(step);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function (el) {
        counterObserver.observe(el);
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
        contentDiv.innerHTML = '<div style="text-align:center;padding:4rem 2rem;"><p style="color:var(--color-text-muted);">Something went wrong. Please try again.</p></div>';
    }
});
