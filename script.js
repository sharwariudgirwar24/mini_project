document.addEventListener('DOMContentLoaded', () => {
    // Smooth fade-in for hero elements
    const heroElements = document.querySelectorAll('.hero h1, .hero p, .hero .btn, .badge-pill');

    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });

    // Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards and section headers
    const scrollElements = document.querySelectorAll('.feature-card, .section-header, .why-text, .stats-grid, .cta-box');


    scrollElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Login Page Flow Logic
function showLogin(type) {
    const selection = document.getElementById('role-selection');
    const authContainer = document.getElementById('auth-container');
    const businessForm = document.getElementById('form-business');
    const customerForm = document.getElementById('form-customer');

    // Hide selection
    selection.classList.add('hidden');

    // Show container
    authContainer.classList.remove('hidden');
    authContainer.classList.add('visible');

    // Show specific form
    businessForm.style.display = 'none';
    customerForm.style.display = 'none';

    if (type === 'business') {
        businessForm.style.display = 'block';
    } else {
        customerForm.style.display = 'block';
    }
}

function showSelection() {
    const selection = document.getElementById('role-selection');
    const authContainer = document.getElementById('auth-container');

    // Hide container
    authContainer.classList.remove('visible');
    authContainer.classList.add('hidden');

    // Show selection
    selection.classList.remove('hidden');
}
