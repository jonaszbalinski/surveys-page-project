let validEmail = false;
let validPassword = false;
let validPassword2 = false;
let validUser = false;


const databasePath = './db/db.json';

async function getDatabase() {
    let db = await fetch(databasePath);
    let data = await db.json();
    return data;
  }

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
  
    if (password.match(validRegex))
        return true;
    return false;
}

async function isLoginDataValid(email, password) {
    const data = await getDatabase();

    for (var account in data["accounts"]) {
        if (String(data["accounts"][account]["email"]) === String(email) && String(data["accounts"][account]["password"]) === String(password)) {
            return true
        }
    }

    return false;
}

async function addAccountToDatabase(username, email, password) { 
    var data = await getDatabase();
    var nextID = -1

    for (var account in data["accounts"]) {
        if (parseInt(account) >= nextID) {
            nextID = parseInt(account) + 1
            console.log(nextID)
        }
    }
    
    const newUser = {
        "username": username,
        "email": email,
        "password": password
    };

    data[String(nextID)] = newUser;
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

        setFormMessage(loginForm, "error", "Invalid password");
    })

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "loginEmail") {
                if (e.target.value.length < 5 || !validateEmail(e.target.value)) {
                    validEmail = '';
                    setInputError(inputElement, "Please enter vaild email");
                }
                else {
                    validEmail = e.target.value;
                }
            }
            else if (e.target.id === "loginPassword") {
                validPassword = e.target.value;
            }
            else if (e.target.id === "createAccountUsername") {
                if (e.target.value.length < 4 || e.target.value.length > 20) {
                    validUser = '';
                    setInputError(inputElement, "Username must contain between 4 and 20 characters");
                }
                else {
                    validUser = e.target.value;
                }
            }
            else if (e.target.id === "createAccountEmail") {
                if (e.target.value.length < 5 || !validateEmail(e.target.value)) {
                    validEmail = '';
                    setInputError(inputElement, "Please enter vaild email");
                }
                else {
                    validEmail = e.target.value;
                }
            }
            else if (e.target.id === "createAccountPassword") {
                if (e.target.value.length < 6 || e.target.value.length > 20) {
                    validPassword = '';
                    setInputError(inputElement, "Password must contain between 6 and 20 characters" );
                }
                
                else if (!validatePassword(e.target.value)) {
                    validPassword = '';
                    setInputError(inputElement, "Password must contain at least one numeric digit, one uppercase and one lowercase letter");
                }
                else {
                    validPassword = e.target.value;
                }
            }
            else if (e.target.id === "createAccountConfirmPassword") {
                if (!(e.target.value === document.querySelector("#createAccountPassword").value)) {
                    validPassword2 = '';
                    setInputError(inputElement, "Passwords does not match")
                }
                else {
                    validPassword2 = e.target.value;
                }
            }
            
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });

    document.querySelector("#loginContinue").addEventListener("click", e => {
        e.preventDefault();
        if (validEmail != '' && validPassword != '') {
            isLoginDataValid(validEmail, validPassword).then(value => {
                if (value == true) {
                    location.href = "main_page.html";
                }
                else {
                    setFormMessage(loginForm, "error", "Invalid email/password!");
                }
            });
        }
    });

    document.querySelector("#createAccountContinue").addEventListener("click", e => {
        e.preventDefault();
        if (validEmail != '' && validPassword != '' && validPassword2 != '' && validUser != '') {
            addAccountToDatabase(validEmail, validPassword).then(value => {
                location.href = "main_page.html";
            });
        }
    });
});
