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
    // validation code will go here, making an AJAX request to the server to check if the name is valid
}