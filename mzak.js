document.addEventListener('DOMContentLoaded', function () {
    const usernameEl = document.querySelector('#username');
    const emailEl = document.querySelector('#email');
    const numberEl = document.querySelector('#number');
    const dateEventEl = document.querySelector('#dateevent');
    const form = document.querySelector('#save');


    form.addEventListener('input', async function (e) {
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

            document.getElementById('formstatus').innerHTML = "Form elements valid";
        } catch (error) {
            console.error("Error occurred:", error);
            document.getElementById('formstatus').innerHTML = "Form elements not valid";
        }
    });


    const checkUsername = () => {
        return new Promise((resolve, reject) => {
            const username = usernameEl.value.trim();
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
            const email = emailEl.value.trim();
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
    }

    const checkNumber = () => {
        return new Promise((resolve, reject) => {
            const number = numberEl.value.trim();
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
    }



    const validateDateEvent = () => {
        return new Promise((resolve, reject) => {
            const dateEvent = new Date(dateEventEl.value.trim());
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
        const re = /(0|91)?[6-9][0-9]{12}/;
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
