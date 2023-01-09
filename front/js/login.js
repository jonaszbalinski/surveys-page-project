let validEmail = false;
let validPassword = false;
let validPassword2 = false;
let validUser = false;
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

function validateEmail(email) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (email.match(validRegex))
        return true;
    return false;
}

function validatePassword(password) {
    var validRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
  
    //if (password.match(validRegex))
        //return true;
    //return false;
    
    return true;
}

function loginDataIsValid() {
    return true;
}

function createAccountDataIsValid() {
    return true;
}

document.addEventListener("DOMContentLoaded", () =>{
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
        document.querySelectorAll(".form__input").forEach(inputElement => {
            clearInputError(inputElement);
        });
    });

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
        document.querySelectorAll(".form__input").forEach(inputElement => {
            clearInputError(inputElement);
        });
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // magic
        setFormMessage(loginForm, "error", "Invalid password");
    })

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "loginEmail") {
                if (e.target.value.length < 5 || !validateEmail(e.target.value)) {
                    validEmail = false;
                    setInputError(inputElement, "Please enter vaild email");
                }
                else{
                    validEmail = true;
                }
            }
            else if (e.target.id === "loginPassword") {
                validPassword = true;
            }
            else if (e.target.id === "createAccountUsername") {
                if (e.target.value.length < 4 || e.target.value.length > 20) {
                    validUser = false;
                    setInputError(inputElement, "Username must contain between 4 and 20 characters");
                }
                else{
                    validUser = true;
                }
            }
            else if (e.target.id === "createAccountEmail") {
                if (e.target.value.length < 5 || !validateEmail(e.target.value)) {
                    validEmail = false;
                    setInputError(inputElement, "Please enter vaild email");
                }
                else{
                    validEmail = true;
                }
            }
            else if (e.target.id === "createAccountPassword") {
                if (e.target.value.length < 6 || e.target.value.length > 20) {
                    validPassword = false;
                    setInputError(inputElement, "Password must contain between 6 and 20 characters" );
                }
                
                else if (!validatePassword(e.target.value)) {
                    validPassword = false;
                    setInputError(inputElement, "Password must contain at least one numeric digit, one uppercase and one lowercase letter");
                }
                else{
                    validPassword = true;
                }
            }
            else if (e.target.id === "createAccountConfirmPassword") {
                if (!(e.target.value === document.querySelector("#createAccountPassword").value)) {
                    validPassword2 = false;
                    setInputError(inputElement, "Passwords does not match")
                }
                else{
                    validPassword2 = true;
                }
            }
            
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });

    document.querySelector("#loginContinue").addEventListener("click", e => {
        e.preventDefault();
        if (validEmail  && validPassword) {
        //if (loginDataIsValid()) {
            // ...
            
            location.href="main_page.html";
        }
    });

    document.querySelector("#createAccountContinue").addEventListener("click", e => {
        e.preventDefault();
        if (validEmail && validPassword && validPassword2 && validUser) {
        //if (createAccountDataIsValid()) {
            // ...
            
            location.href="main_page.html";
        }
    });
});
