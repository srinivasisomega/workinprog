document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#save');

    form.addEventListener('submit', function (e) {
        validateForm()
            .then((formData) => {
                // Redirect or pass data to consuming code
                redirectToDisplayPage(formData);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });

    // Validation functions...

    const checkUsername = () => {
        const username = document.querySelector('#username').value.trim();
        if (!isRequired(username)) {
            showError(usernameEl, 'Username cannot be blank.');
            return false;
        } else {
            showSuccess(usernameEl);
            return true;
        }
    };

    const checkEmail = () => {
        const email = document.querySelector('#email').value.trim();
        if (!isRequired(email)) {
            showError(emailEl, 'Email cannot be blank.');
            return false;
        } else if (!isEmailValid(email)) {
            showError(emailEl, 'Email is not valid.');
            return false;
        } else {
            showSuccess(emailEl);
            return true;
        }
    };

    const checkNumber = () => {
        const number = document.querySelector('#number').value.trim();
        if (!isRequired(number)) {
            showError(numberEl, 'Mobile number cannot be blank.');
            return false;
        } else if (!isNumberValid(number)) {
            showError(numberEl, 'Mobile number is not valid.');
            return false;
        } else {
            showSuccess(numberEl);
            return true;
        }
    };

    const validateDateEvent = () => {
        const dateEvent = new Date(document.querySelector('#dateevent').value.trim());
        const currentDate = new Date();
        const fiveDaysFromNow = new Date();
        fiveDaysFromNow.setDate(currentDate.getDate() + 5);

        if (!dateEvent) {
            showError(dateEventEl, 'Date of event cannot be blank.');
            return false;
        } else if (dateEvent < currentDate || dateEvent < fiveDaysFromNow) {
            showError(dateEventEl, 'Date must not be within the next five days.');
            return false;
        } else {
            showSuccess(dateEventEl);
            return true;
        }
    };

    const isEmailValid = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const isNumberValid = (number) => {
        const re = /^[6-9]\d{9}$/;
        return re.test(number);
    };

    const isRequired = (value) => {
        return value.trim() !== '';
    };

    const showError = (input, message) => {
        const formField = input.parentElement;
        formField.classList.remove('success');
        formField.classList.add('error');
        const error = formField.querySelector('small');
        error.textContent = message;
    };

    const showSuccess = (input) => {
        const formField = input.parentElement;
        formField.classList.remove('error');
        formField.classList.add('success');
        const error = formField.querySelector('small');
        error.textContent = '';
    };

    const usernameEl = document.querySelector('#username');
    const emailEl = document.querySelector('#email');
    const numberEl = document.querySelector('#number');
    const dateEventEl = document.querySelector('#dateevent');

    usernameEl.addEventListener('input', checkUsername);
    emailEl.addEventListener('input', checkEmail);
    numberEl.addEventListener('input', checkNumber);
    dateEventEl.addEventListener('input', validateDateEvent);

    function validateForm() {
        return new Promise((resolve, reject) => {
            const isUsernameValid = checkUsername();
            const isEmailValid = checkEmail();
            const isNumberValid = checkNumber();
            const isDateValid = validateDateEvent();

            if (isUsernameValid && isEmailValid && isNumberValid && isDateValid) {
                const formData = {
                    username: document.querySelector('#username').value.trim(),
                    email: document.querySelector('#email').value.trim(),
                    number: document.querySelector('#number').value.trim(),
                    dateEvent: document.querySelector('#dateevent').value.trim()
                };
                resolve(formData);
            } else {
                reject("Form submission failed. Please check your inputs.");
            }
        });
    }
});


