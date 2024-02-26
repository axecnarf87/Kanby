import { timezones } from '../data/data.js'; // Import the timezones from data.js


export default class Authentication {

    constructor(root) {
        this.root = root;

        // shows timezones options based on data.js
        function createTimezoneOptions() {
            const datalist = document.getElementById('timezones');

            // Clear existing options
            datalist.innerHTML = '';

            // Create new options based on the timezones array
            timezones.forEach(timezone => {
                const option = document.createElement('option');
                option.value = timezone.value;
                option.textContent = timezone.label;
                datalist.appendChild(option);
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM loaded');
            createTimezoneOptions();
        });

        function setFormMessage(formElement, type, message) {
            const messageElement = formElement.querySelector(".form__message");

            messageElement.textContent = message;
            messageElement.classList.remove("form__message--success", "form__message--error");
            messageElement.classList.add(`form__message--${type}`);
        }

        function setInputError(inputElement, message) {
            inputElement.classList.add("form__input--error");
            inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
        }

        function clearInputError(inputElement) {
            inputElement.classList.remove("form__input--error");
            inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
        }
    
        document.addEventListener("DOMContentLoaded", () => {
            const loginForm = document.querySelector("#login");
            const createAccountForm = document.querySelector("#createAccount");

            document.querySelector("#linkCreateAccount").addEventListener("click", e => {
                e.preventDefault();
                loginForm.classList.add("form--hidden");
                createAccountForm.classList.remove("form--hidden");
            });

            document.querySelector("#linkLogin").addEventListener("click", e => {
                e.preventDefault();
                loginForm.classList.remove("form--hidden");
                createAccountForm.classList.add("form--hidden");
            });

            // Delecting because no real check will be made
            // loginForm.addEventListener("submit", e => {
            //     e.preventDefault();

            //     // Perform your AJAX/Fetch login

            //     setFormMessage(loginForm, "error", "Invalid username/password combination");
            // });

            document.querySelectorAll(".form__input").forEach(inputElement => {
                inputElement.addEventListener("blur", e => {
                    if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                        setInputError(inputElement, "Username must be at least 10 characters in length");
                    }
                });

                inputElement.addEventListener("input", e => {
                    clearInputError(inputElement);
                });
            });
        });

    };
}

