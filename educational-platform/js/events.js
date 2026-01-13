// events.js - Event handling
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    $$('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = $(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Hamburger menu toggle
    $('.hamburger').addEventListener('click', function() {
        $('.nav-links').classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav')) {
            $('.nav-links').classList.remove('active');
            $('.hamburger').classList.remove('active');
        }
    });
});