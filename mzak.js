document.addEventListener('DOMContentLoaded', function () {
    const usernameEl = document.querySelector('#username');
    const emailEl = document.querySelector('#email');
    const numberEl = document.querySelector('#number');
    const dateEventEl = document.querySelector('#dateevent');
    const form = document.querySelector('#save');
    

    form.addEventListener('input', function (e) {
        e.preventDefault();
        let isUsernameValid = checkUsername(),
            isEmailValid = checkEmail(),
            isNumberValid = checkNumber(),
            isDateValid = validateDateEvent();

        let isFormValid = isUsernameValid &&
            isEmailValid && isNumberValid && isDateValid;

        if (isFormValid) {
            // Proceed with form submission
            console.log("Form submitted successfully!");
        } else {
            console.log("Form submission failed. Please check your inputs.");
        }
    });

    const checkUsername = () => {
        let valid = false;
        const username = usernameEl.value.trim();
        if (!isRequired(username)) {
            showError(usernameEl, 'Username cannot be blank.');
        } else {
            showSuccess(usernameEl);
            valid = true;
        }
        return valid;
    };

    const checkEmail = () => {
        let valid = false;
        const email = emailEl.value.trim();
        if (!isRequired(email)) {
            showError(emailEl, 'Email cannot be blank.');
        } else if (!isEmailValid(email)) {
            showError(emailEl, 'Email is not valid.');
        } else {
            showSuccess(emailEl);
            valid = true;
        }
        return valid;
    };

    const checkNumber = () => {
        let valid = false;
        const number = numberEl.value.trim();
        if (!isRequired(number)) {
            showError(numberEl, 'Mobile number cannot be blank.');
        } else if (!isNumberValid(number)) {
            showError(numberEl, 'Mobile number is not valid.');
        } else {
            showSuccess(numberEl);
            valid = true;
        }
        return valid;
    };

    const validateDateEvent = () => {
        let valid = false;
        const dateEvent = new Date(dateEventEl.value.trim());
        const currentDate = new Date();
        const fiveDaysFromNow = new Date();
        fiveDaysFromNow.setDate(currentDate.getDate() + 5);

        if (!dateEvent) {
            showError(dateEventEl, 'Date of event cannot be blank.');
        } else if (dateEvent < currentDate || dateEvent < fiveDaysFromNow) {
            showError(dateEventEl, 'Date must not be within the next five days.');
        } else {
            showSuccess(dateEventEl);
            valid = true;
        }
        return valid;
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
});
