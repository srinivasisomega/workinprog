$(document).ready(function () {
    const usernameEl = $('#username');
    const emailEl = $('#email');
    const numberEl = $('#number');
    const dateEventEl = $('#dateevent');
    const form = $('#save');

    form.on('input', async function (e) {
        e.preventDefault();
        try {
            let isUsernameValid = await checkUsername();
            if (!isUsernameValid) throw new Error('Username validation failed');

            let isEmailValid = await checkEmail();
            if (!isEmailValid) throw new Error('Email validation failed');

            let isNumberValid = await checkNumber();
            if (!isNumberValid) throw new Error('Number validation failed');

            let isDateValid = await validateDateEvent();
            if (!isDateValid) throw new Error('Date validation failed');

            $('#formstatus').text('Form elements valid').css('color', 'green');
        } catch (error) {
            console.error("Error occurred:", error);
            $('#formstatus').text('Form elements not valid').css('color', 'red');
        }
    });

    const checkUsername = () => {
        return new Promise((resolve, reject) => {
            const username = usernameEl.val().trim();
            if (!isRequired(username)) {
                showError(usernameEl, 'Username cannot be blank.');
                resolve(false);
            } else {
                showSuccess(usernameEl);
                resolve(true);
            }
        });
    };

    const checkEmail = () => {
        return new Promise((resolve, reject) => {
            const email = emailEl.val().trim();
            if (!isRequired(email)) {
                showError(emailEl, 'Email cannot be blank.');
                resolve(false);
            } else if (!isEmailValid(email)) {
                showError(emailEl, 'Email is not valid.');
                resolve(false);
            } else {
                showSuccess(emailEl);
                resolve(true);
            }
        });
    };

    const checkNumber = () => {
        return new Promise((resolve, reject) => {
            const number = numberEl.val().trim();
            if (!isRequired(number)) {
                showError(numberEl, 'Mobile number cannot be blank.');
                resolve(false);
            } else if (!isNumberValid(number)) {
                showError(numberEl, 'Mobile number must start with 91');
                resolve(false);
            } else {
                showSuccess(numberEl);
                resolve(true);
            }
        });
    };

    const validateDateEvent = () => {
        return new Promise((resolve, reject) => {
            const dateEvent = new Date(dateEventEl.val().trim());
            const currentDate = new Date();
            const fiveDaysFromNow = new Date();
            fiveDaysFromNow.setDate(currentDate.getDate() + 5);

            if (!dateEvent) {
                showError(dateEventEl, 'Date of event cannot be blank.');
                resolve(false);
            } else if (dateEvent < currentDate || dateEvent < fiveDaysFromNow) {
                showError(dateEventEl, 'Date must not be within the next five days.');
                resolve(false);
            } else {
                showSuccess(dateEventEl);
                resolve(true);
            }
        });
    };

    const isEmailValid = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const isNumberValid = (number) => {
        const re = /(0|91)?[6-9][0-9]{10}/;
        return re.test(number);
    };

    const isRequired = (value) => {
        return value.trim() !== '';
    };

    const showError = (input, message) => {
        const formField = input.parent();
        formField.removeClass('success').addClass('error');
        input.css({
            'border-color': 'red',
            'box-shadow': '0 0 5px red'
        });
        const error = formField.find('small');
        error.text(message);
    };

    const showSuccess = (input) => {
        const formField = input.parent();
        formField.removeClass('error').addClass('success');
        input.css({
            'border-color': 'green',
            'box-shadow': '0 0 10px green'
        });
        const error = formField.find('small');
        error.text('');
    };
});
