// courses.js - Courses functionality
function handleEnrollClick(event) {
    if (event.target.classList.contains('enroll-btn')) {
        const courseName = event.target.previousElementSibling.previousElementSibling.textContent;
        alert(`Enrolled in ${courseName}!`);
        // Here you could add logic to save enrollment to storage or send to server
        Storage.set('enrolledCourses', [...(Storage.get('enrolledCourses') || []), courseName]);
    }
}

document.addEventListener('click', handleEnrollClick);

function loadEnrolledCourses() {
    const enrolled = Storage.get('enrolledCourses') || [];
    enrolled.forEach(course => {
        // Mark enrolled courses
        const courseCards = $$('.course-card h3');
        courseCards.forEach(card => {
            if (card.textContent === course) {
                card.parentElement.classList.add('enrolled');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', loadEnrolledCourses);