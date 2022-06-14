import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input[name=email]');
const textArea = document.querySelector('textarea[name=message]');

form.addEventListener("input", throttle(onFormInput, 500));
form.addEventListener("submit", onFormSumbit);

let formData = {
    email: '',
    message: '',
};

const parsedForm = JSON.parse(localStorage.getItem(STORAGE_KEY));
if (localStorage.getItem(STORAGE_KEY)) {
    formData.email = parsedForm.email;
    formData.message = parsedForm.message;
}

function onFormInput(event) {
    formData[event.target.name] = event.target.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSumbit(event) {
    event.preventDefault();

    const formElements = event.currentTarget.elements;
    const email = formElements.email.value;
    const message = formElements.message.value;

    if (email === '' || message === '') {
        return alert('Заполните все поля');
    }

    console.log(formData);
    formData.email = '';
    formData.message = '';

    
    localStorage.removeItem(STORAGE_KEY);
    event.currentTarget.reset();
}

populateForm(parsedForm);

function populateForm(parsedForm) {
    if (localStorage.getItem(STORAGE_KEY)) {
        // const parsedForm = JSON.parse(localStorage.getItem(STORAGE_KEY));
        input.value = parsedForm.email;
        textArea.value = parsedForm.message;
    }
}