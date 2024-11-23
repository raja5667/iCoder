// ScrollReveal Animations
if (typeof ScrollReveal !== "undefined") {
    ScrollReveal().reveal('.section-title', { delay: 200 });
    ScrollReveal().reveal('.card', { interval: 200 });
    ScrollReveal().reveal('.carousel-caption', { delay: 500 });
}

// Tawk.to Live Chat Integration
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var script = document.createElement("script"),
        firstScript = document.getElementsByTagName("script")[0];
    script.async = true;
    script.src = 'https://embed.tawk.to/67393b162480f5b4f59f23ff/1icrotklm';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    firstScript.parentNode.insertBefore(script, firstScript);
})();

// Dark Mode Toggle
const toggleButton = document.getElementById("mode-icon");
if (toggleButton) {
    toggleButton.addEventListener("click", function () {
        setTimeout(() => {
            document.body.classList.toggle("dark-mode");
            const icon = document.querySelector("#mode-icon img");

            if (document.body.classList.contains("dark-mode")) {
                icon.src = "moon.svg"; // Set to dark mode icon
            } else {
                icon.src = "sun.svg"; // Set to light mode icon
            }
        }, 500); // 500ms delay
    });
}

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission to allow custom handling

    const signup_firstname = document.getElementById('firstname').value.trim();
    const signup_lastname = document.getElementById('lastname').value.trim();
    const signup_email = document.getElementById('email').value.trim();
    const signup_password = document.getElementById('password').value;
    const signup_confirmPassword = document.getElementById('confirmPassword').value;

    // Validate First Name and Last Name
    if (signup_firstname === "" || signup_lastname === "") {
        alert("Please fill in both your first and last name.");
        return;
    }

    // Validate Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signup_email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Password confirmation check
    if (signup_password !== signup_confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    // Minimum password strength check
    if (signup_password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }

    // Store the data in localStorage
    localStorage.setItem('main_firstname', signup_firstname);
    localStorage.setItem('main_lastname', signup_lastname);
    localStorage.setItem('main_email', signup_email);
    localStorage.setItem('main_pass', btoa(signup_password)); // Encode password for basic security

    console.log("User signed up with:");
    console.log("First Name:", signup_firstname);
    console.log("Last Name:", signup_lastname);
    console.log("Email:", signup_email);
    console.log("Password (encoded):", btoa(signup_password));

    // Inform the user of successful sign-up
    alert("Sign-up successful!");

    // Redirect to index.html
    window.location.href = "index.html";
});


document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const login_email = document.getElementById("email").value.trim();
    const login_password = document.getElementById("password").value;

    // Retrieve stored values from localStorage
    const main_email = localStorage.getItem("main_email");
    const main_pass = localStorage.getItem("main_pass");
    const firstName = localStorage.getItem("main_firstname"); // Corrected key

    // Log the entered values
    console.log("Email entered:", login_email);
    console.log("Password entered:", login_password);

    // Validation checks
    if (!login_email || !login_password) {
        alert("Please fill out all fields.");
    } else if (login_email !== main_email) {
        alert("Email does not match. Please try again.");
    } else if (btoa(login_password) !== main_pass) {
        alert("Password does not match. Please try again.");
    } else {
        console.log("Login successful. Setting flag for welcome message.");

        // Set a flag to show the welcome message on index.html
        localStorage.setItem("showWelcomeMessage", "true");

        // Redirect to index.html
        window.location.href = "index.html";
    }
});