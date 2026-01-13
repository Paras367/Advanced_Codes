// animations.js - Animation functions
function animateOnScroll() {
    const elements = $$('.course-card, .about-section, .contact-section');
    elements.forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('fade-in-up');
        }
    });
}

document.addEventListener('scroll', debounce(animateOnScroll, 100));
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Typed.js initialization
const typed = new Typed('#typed-text', {
    strings: [
        'Learn new skills online',
        'Master programming languages',
        'Build your career with us'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
});