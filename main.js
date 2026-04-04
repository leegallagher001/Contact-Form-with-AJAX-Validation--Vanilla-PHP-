// Main script - Real-time input validation using AJAX

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');

    nameField.addEventListener('blur', function() {
        validateName(this.value); // calls a function that checks the name input against requirements via AJAX
    });

    emailField.addEventListener('blur', function() {
        validateEmail(this.value); // calls a function that checks the email input against requirements via AJAX
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // prevents the default action from occuring when the submit button is pressed
        submitForm();
    });
});

// Validation functions

function validateName(name) {
    const errorElement = document.getElementById('name-error');

    if (name.length < 2) { // if name too short
        showError(errorElement, 'Name must be at least 2 characters long.');
        return false;
    } else if (name.length > 50) { // if name too long
        showError(errorElement, 'Name must be less than 50 characters long.');
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) { // if name has numbers or special characters in it
        showError(errorElement, 'Invalid characters - only letters and spaces are allowed.');
        return false;
    } else { // if name is allowed
        clearError(errorElement); // clears any previous errors
        return true;
    }
}

function validateEmail(email) {
    const errorElement = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple regex for email validation

    if (email.length === 0) { // if no email entered
        showError(errorElement, 'Email address is required.');
        return false;
    } else if (!emailRegex.test(email)) { // if invalid email format
        showError(errorElement, 'Please enter a valid email address.');
        return false;
    } else { // if email is valid
        clearError(errorElement);
        return true;
    }
}

function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function clearError(element) {
    element.textContent = '';
    element.style.display = 'none';
}

function submitForm() {
    const formData = new formData(document.getElementById('contactForm'));
    const submitButton = document.getElementById('submit-btn');
    const statusDiv = document.getElementById('form-status');

    // Disable submit button to prevent multiple submissions
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    fetch('process_contact.php', {
        method: 'POST',
        body: formData
    })

    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSuccess(statusDiv, data.message);
            document.getElementById('contactForm').reset(); // reset form on success
        } else {
            showError(data.errors); // show any validation errors returned from the server
        }
    })

    .catch(error => {
        showError(statusDiv, 'An error occurred during submission. Please try again.');
    })

    .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    });
}