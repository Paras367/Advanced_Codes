// header.js - Header specific JavaScript
function updateHeaderOnScroll() {
    const header = $('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', throttle(updateHeaderOnScroll, 100));