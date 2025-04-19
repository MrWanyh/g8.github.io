var loginForm = document.getElementById("signin");
var registerForm = document.getElementById("signup");
var btnIndicator = document.getElementById("btn");

function signup() {
    loginForm.style.left = "-400px";
    registerForm.style.left = "50px";
    document.getElementById("loginMsg").style.display = "none";
    document.getElementById("registerMsg").style.display = "block";
    document.getElementById("btn").style.left = "110px";
}

function signin() {
    document.querySelector('#signin input[placeholder="User ID"]').value = '';
    document.querySelector('#signin input[placeholder="Enter Password"]').value = '';
    loginForm.style.left = "50px";
    registerForm.style.left = "450px";
    document.getElementById("loginMsg").style.display = "block";
    document.getElementById("registerMsg").style.display = "none";
    document.getElementById("btn").style.left = "0px";
}

function openLogin() {
    console.log('Opening Login/Register popup');
    document.getElementById("loginContainer").style.display = "block";
}

function closeLogin() {
    document.getElementById("loginContainer").style.display = "none";
}

function closePopup() {
    const popup = document.getElementById("popup");
    const form = document.getElementById("feedbackForm");
    if (popup) popup.classList.remove("open-popup");
    if (form) form.reset();
}

function displayGreetingPopup(userId) {
    const greetingBox = document.getElementById("welcomePopup");
    greetingBox.textContent = `Welcome! ${userId}`;
    greetingBox.classList.add("show");

    const signInButton = document.querySelector('.open-login-btn');
    if (signInButton) {
        signInButton.style.display = 'none'; 
    }

    setTimeout(() => {
        greetingBox.classList.remove("show");
    }, 3000);
}

function hideLoginPopup() {
    const loginPopup = document.getElementById("loginPopup");
    if (loginPopup) {
        loginPopup.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Signup
    document.querySelector('#signup .submit-btn')?.addEventListener('click', function (event) {
        event.preventDefault();
        console.log("Signup triggered");

        const newUserId = document.querySelector('#signup input[placeholder="User ID"]').value;
        const newUserEmail = document.querySelector('#signup input[placeholder="Email Address"]').value;
        const newUserPassword = document.querySelector('#signup input[placeholder="Enter Password"]').value;

        if (newUserId && newUserEmail && newUserPassword) {
            localStorage.setItem("accountUserId", newUserId);
            localStorage.setItem("accountEmail", newUserEmail);
            localStorage.setItem("accountPassword", newUserPassword);
            alert("Registration successful!");
        } else {
            alert("All fields are required!");
        }
    });

    // Signin
    document.querySelector('#signin .submit-btn')?.addEventListener('click', function (event) {
        event.preventDefault();

        const savedUserId = localStorage.getItem("accountUserId");
        const savedPassword = localStorage.getItem("accountPassword");
        const loginFeedback = document.getElementById("signinError");

        if (!savedUserId || !savedPassword) {
            loginFeedback.textContent = "No account found. Please register first.";
            loginFeedback.style.color = "red";
            return;
        }

        const enteredUserId = document.querySelector('#signin input[placeholder="User ID"]').value;
        const enteredPassword = document.querySelector('#signin input[placeholder="Enter Password"]').value;

        if (enteredUserId === savedUserId && enteredPassword === savedPassword) {
            hideLoginPopup();
            displayGreetingPopup(enteredUserId);
        } else {
            loginFeedback.textContent = "Invalid User ID or Password!";
            loginFeedback.style.color = "red";
        }
    });

    document.querySelectorAll('.photo').forEach(photo => {
        photo.addEventListener('mouseenter', function () {
            const bg = this.getAttribute('data-bg');
            document.querySelector('.dynamic-background').style.backgroundImage = `url(${bg})`;
        });
        photo.addEventListener('mouseleave', function () {
            document.querySelector('.dynamic-background').style.backgroundImage = '';
        });
    });

    document.body.addEventListener('mousemove', function () {
        const background = document.querySelector('.dynamic-background');
        if (!document.querySelector('.photo:hover')) {
            background.style.backgroundImage = 'url(../images/background.webp)';
        }
    });

const cookieBox = document.querySelector(".wrapper"),
    buttons = document.querySelectorAll(".buttons");

const executeCodes = () => {
    if (document.cookie.includes("cookieBy=codinglab")) return;
    
    cookieBox?.classList.add("show");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            cookieBox.classList.remove("show");

            if (button.id === "acceptBtn") {
                document.cookie = "cookieBy=codinglab; max-age=" + 60 * 60 * 24 * 30 + "; path=/";
                console.log("Cookie set:", document.cookie); 

            }
        });
    });
};

window.addEventListener("load", executeCodes);
});
