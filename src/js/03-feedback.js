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

function onFormInput(event) {
    formData[event.target.name] = event.target.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSumbit(event) {
    event.preventDefault();

    const parsedForm = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (formData.email == "" || formData.message == "") {
        console.log("Заполните все поля");
    } else {
        console.log(parsedForm);
    }
    
    localStorage.removeItem(STORAGE_KEY);
    event.currentTarget.reset();
}

populateForm(formData);

function populateForm(formData) {
    if (localStorage.getItem(STORAGE_KEY)) {
        formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    }

    input.value = formData.email;
    textArea.textContent = formData.message;
}


