const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const numberEl = document.querySelector('#number');

const form = document.querySelector('#signup');
const checknumber = () =>{
    let valid=false;
    const min=9,max=11;
    const number = numberEl.value.trim()
    if (!isRequired(number)) {
        showError(numberEl, 'number cannot be blank.');
    } else if (!isBetween(number.length, min, max)) {
        showError(numberEl, `number must be between ${min} and ${max} characters.`)
    }
    else if (!isnumberValid(number)) {
        showError(numberEl, 'Email is not valid.')
    }
    else {
        showSuccess(numberEl);
        valid = true;
    }
    return valid;
}
const checkUsername = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
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
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
const isnumber =(number)=>{
    const re= /^[6-9]\d{9}$/;
    return re.test(number);
}
const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length==min || length > max ? false : true;
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};
const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}
form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isnumberValid = checknumber();
        

    let isFormValid = isUsernameValid &&
        isEmailValid && isnumberValid;
        

    // submit to the server if the form is valid
    if (isFormValid) {

    }
});
