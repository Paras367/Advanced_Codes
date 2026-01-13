// form.js - Form handling
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Simulate form submission
    console.log('Form submitted:', data);
    alert('Thank you for your message! We will get back to you soon.');

    // Reset form
    form.reset();
}

$('#contact-form').addEventListener('submit', handleFormSubmit);

// Add form validation
function validateForm() {
    const inputs = $$('#contact-form input, #contact-form textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', validateForm);