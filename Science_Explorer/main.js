// ========== NASA API CONFIGURATION ==========
const NASA_API_KEY = 'M1cH6dn6QgvYrqu7869uUwfWfcc8nWrOG8OmUYH0'; // Your API key
const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
const MARS_ROVER_LATEST_URL = (rover) =>
    `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${NASA_API_KEY}`;

// ========== GLOBAL STATE ==========
let currentRover = 'curiosity';
let marsSwiper = null;
let lightbox = null;

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeParticles();
    initializeTyped();
    initializeAOS();
    initializeLightbox();
    fetchAPOD();
    fetchMarsPhotos(currentRover);
    setupRoverButtons();
    animateStats();
});

// ========== PARTICLES.JS CONFIGURATION ==========
function initializeParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#00d4ff' },
            shape: { type: 'circle' },
            opacity: {
                value: 0.5,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 3,
                random: true,
                anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00d4ff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

// ========== TYPED.JS CONFIGURATION ==========
function initializeTyped() {
    new Typed('#typed-text', {
        strings: [
            'Explore the Universe 🌌',
            'Discover Mars 🔴',
            'Journey Through Space 🚀',
            'NASA Data in Real-Time 🛰️'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// ========== AOS INITIALIZATION ==========
function initializeAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

// ========== GLIGHTBOX INITIALIZATION ==========
function initializeLightbox() {
    lightbox = GLightbox({
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
    });
}

// ========== FETCH APOD ==========
async function fetchAPOD() {
    const container = document.getElementById('apod-container');

    try {
        const response = await fetch(APOD_URL);
        const data = await response.json();
        displayAPOD(data);
    } catch (error) {
        console.error('Error fetching APOD:', error);
        container.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Failed to load Astronomy Picture of the Day</p>
                <p style="font-size: 0.9rem; margin-top: 10px;">Please check your API key or try again later</p>
            </div>
        `;
    }
}

// ========== DISPLAY APOD ==========
function displayAPOD(data) {
    const container = document.getElementById('apod-container');

    const mediaHTML = data.media_type === 'video'
        ? `<iframe src="${data.url}" frameborder="0" allowfullscreen class="apod-video"></iframe>`
        : `<img src="${data.url}" alt="${data.title}" class="apod-image glightbox" data-glightbox="title: ${data.title}">`;

    container.innerHTML = `
        <div class="apod-content animate__animated animate__fadeIn">
            <div class="apod-image-container">
                ${mediaHTML}
            </div>
            <div class="apod-details">
                <h3>${data.title}</h3>
                <p class="apod-date">
                    <i class="fas fa-calendar-alt"></i>
                    ${formatDate(data.date)}
                </p>
                <p class="apod-description">${data.explanation}</p>
                ${data.copyright ? `<p style="margin-top: 20px; color: var(--accent-color); font-style: italic;">© ${data.copyright}</p>` : ''}
            </div>
        </div>
    `;

    // Reinitialize lightbox for new content
    if (lightbox) lightbox.destroy();
    initializeLightbox();
}

// ========== FETCH MARS PHOTOS ==========
async function fetchMarsPhotos(rover) {
    const container = document.getElementById('mars-container');
    container.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading ${rover} photos...</p>
        </div>
    `;

    try {
        // Use latest_photos endpoint to ensure images are always available
        const response = await fetch(MARS_ROVER_LATEST_URL(rover));
        const data = await response.json();

        if (!data.latest_photos || data.latest_photos.length === 0) {
            container.innerHTML = `
                <div class="error">
                    <i class="fas fa-info-circle"></i>
                    <p>No photos available for this rover at the moment</p>
                </div>
            `;
        } else {
            displayMarsPhotos(data.latest_photos.slice(0, 12), rover);
        }
    } catch (error) {
        console.error('Error fetching Mars photos:', error);
        container.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Failed to load Mars rover photos</p>
            </div>
        `;
    }
}

// ========== DISPLAY MARS PHOTOS ==========
function displayMarsPhotos(photos, rover) {
    const container = document.getElementById('mars-container');
    const swiperContainer = document.getElementById('mars-swiper');
    const swiperWrapper = document.getElementById('swiper-wrapper');

    if (photos.length === 0) {
        container.innerHTML = `
            <div class="error">
                <i class="fas fa-info-circle"></i>
                <p>No photos available for this rover at the moment</p>
                <p style="font-size: 0.9rem; margin-top: 10px;">Try selecting the other rover</p>
            </div>
        `;
        return;
    }

    // Display as grid
    container.innerHTML = photos.map(photo => `
        <div class="mars-photo-card animate__animated animate__fadeIn">
            <img src="${photo.img_src}" alt="${photo.camera.full_name}" class="glightbox" 
                 data-glightbox="title: ${photo.camera.full_name}; description: Sol ${photo.sol} - ${photo.earth_date}">
            <div class="mars-photo-info">
                <h4>${photo.camera.full_name}</h4>
                <p><i class="fas fa-calendar"></i> ${formatDate(photo.earth_date)}</p>
                <p><i class="fas fa-sun"></i> Sol ${photo.sol}</p>
            </div>
        </div>
    `).join('');

    // Setup Swiper carousel
    swiperWrapper.innerHTML = photos.map(photo => `
        <div class="swiper-slide">
            <img src="${photo.img_src}" alt="${photo.camera.full_name}">
        </div>
    `).join('');

    swiperContainer.style.display = 'block';

    // Initialize Swiper
    if (marsSwiper) {
        marsSwiper.destroy(true, true);
    }

    marsSwiper = new Swiper('.mars-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });

    // Reinitialize lightbox
    if (lightbox) lightbox.destroy();
    initializeLightbox();
}

// ========== ROVER BUTTON HANDLERS ==========
function setupRoverButtons() {
    const buttons = document.querySelectorAll('.rover-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentRover = btn.dataset.rover;
            fetchMarsPhotos(currentRover);
        });
    });
}

// ========== ANIMATE STATISTICS ==========
function animateStats() {
    const stats = {
        days: 4500,
        photos: 695000,
        distance: 31
    };

    setTimeout(() => {
        animateValue('stat-days', 0, stats.days, 2000);
        animateValue('stat-photos', 0, stats.photos, 2000);
        animateValue('stat-distance', 0, stats.distance, 2000);
    }, 500);
}

function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// ========== UTILITY FUNCTIONS ==========
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// ========== ERROR HANDLING ==========
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// ========== PERFORMANCE OPTIMIZATION ==========
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
}

console.log('%c🚀 Science Explorer Initialized!', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cPowered by NASA API', 'color: #ffbe0b; font-size: 14px;');
