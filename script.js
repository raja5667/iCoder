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
const toggleButton = document.getElementById("mode-toggle");
if (toggleButton) {
    toggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const icon = toggleButton.querySelector("i");

        if (document.body.classList.contains("dark-mode")) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    });
}

// Sign-Up Process: Password Confirmation and Storing Credentials
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission to allow custom handling

    const singup_email = document.getElementById('email').value.trim();
    const singup_password = document.getElementById('password').value;
    const singup_confirmPassword = document.getElementById('confirmPassword').value;

    // Password confirmation check
    if (singup_password !== singup_confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return; // Stop execution if passwords don't match
    }

    // Store the email and password in localStorage after successful sign-up
    localStorage.setItem('main_email', singup_email);
    localStorage.setItem('main_pass', singup_password);

    console.log("User signed up with email:", singup_email);
    console.log("User signed up with password:", singup_password);

    // Debugging log before redirection
    console.log("Redirecting to index.html...");

    // Redirect to index.html
    window.location.href = "index.html"; // Make sure the file path is correct
});

// Login Process: Email and Password Validation using localStorage
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const login_email = document.getElementById("email").value.trim();
    const login_password = document.getElementById("password").value;

    // Retrieve stored values from localStorage
    const main_email = localStorage.getItem('main_email');
    const main_pass = localStorage.getItem('main_pass');

    // Log the entered values
    console.log("Email entered:", login_email);
    console.log("Password entered:", login_password);

    // Validation checks
    if (!login_email || !login_password) {
        alert("Please fill out all fields.");
    } else if (login_email !== main_email) {
        alert("Email does not match. Please try again.");
    } else if (login_password !== main_pass) {
        alert("Password does not match. Please try again.");
    } else {
        console.log("Redirecting to index.html...");
        window.location.href = "index.html"; // Redirect on successful login
    }
});
