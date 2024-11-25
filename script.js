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

            if (icon) {
                icon.src = document.body.classList.contains("dark-mode") ? "moon.svg" : "sun.svg";
            }
        }, 500); // 500ms delay
    });
}

let lastColor = ""; // Store the last applied color

function getRandomLightColor() {
    let newColor;
    do {
        const r = Math.floor(180 + Math.random() * 75); // Red (180–255)
        const g = Math.floor(180 + Math.random() * 75); // Green (180–255)
        const b = Math.floor(180 + Math.random() * 75); // Blue (180–255)
        newColor = `rgb(${r}, ${g}, ${b})`; // Generate an RGB color
    } while (newColor === lastColor); // Ensure the new color is not the same as the last one
    lastColor = newColor; // Update the last color
    return newColor;
}

function changeBackgroundColor() {
    const accountElement = document.querySelector('.account');
    if (accountElement) {
        const newColor = getRandomLightColor();
        accountElement.style.backgroundColor = newColor;
    }
}

// Start continuous color changing
function startColorChange() {
    setInterval(changeBackgroundColor, 1000); // Change color every second
}

// Call the function to start changing colors indefinitely
startColorChange();


// Sign-up Form Handling
const signupForm = document.querySelector("#signup-form");
if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const signup_firstname = document.getElementById("firstname")?.value.trim();
        const signup_lastname = document.getElementById("lastname")?.value.trim();
        const signup_email = document.getElementById("email")?.value.trim();
        const signup_password = document.getElementById("password")?.value;
        const signup_confirmPassword = document.getElementById("confirmPassword")?.value;

        if (!signup_firstname || !signup_lastname) {
            createAlertBox("Please fill in both your first and last names.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!signup_email || !emailRegex.test(signup_email)) {
            createAlertBox("Please enter a valid email address.");
            return;
        }

        if (signup_password.length < 8) {
            createAlertBox("Password must be at least 8 characters long.");
            return;
        }

        if (signup_password !== signup_confirmPassword) {
            createAlertBox("Passwords do not match. Please try again.");
            return;
        }

        const userData = {
            firstname: signup_firstname,
            lastname: signup_lastname,
            email: signup_email,
            password: signup_password,
        };

        try {
            localStorage.setItem("user", JSON.stringify(userData));
            console.log("Sign-up successful. Redirecting to login...");
            window.location.href = "login.html";
        } catch (error) {
            createAlertBox("An error occurred while saving your data.");
            console.error("Error storing sign-up data:", error);
        }
    });
}


// Login Form Handling
const loginForm = document.querySelector("#loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const login_email = document.getElementById("email")?.value.trim();
        const login_password = document.getElementById("password")?.value;
        const rememberMeChecked = document.getElementById("rememberMe").checked;

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!login_email || !login_password) {
            createAlertBox("Please fill out all fields.");
            return;
        }

        if (!storedUser) {
            createAlertBox("No user found. Please sign up first.");
            return;
        }

        // Ensure email is validated and matches
        if (login_email !== storedUser.email) {
            createAlertBox("Email does not match.");
            return;
        }

        // Ensure password is validated and matches
        if (login_password !== storedUser.password) {
            createAlertBox("Password does not match.");
            return;
        }

        if (rememberMeChecked) {
            localStorage.setItem("rememberedEmail", login_email);
        } else {
            localStorage.removeItem("rememberedEmail");
        }

        localStorage.setItem("showWelcomeMessage", "true");
        localStorage.setItem("main_firstname", storedUser.firstname);

        console.log("Login successful. Redirecting to profile...");
        window.location.href = "index.html";
    });
}


// Function to create a styled alert box
function createAlertBox(message) {
    const alertBox = document.createElement("div");
    alertBox.textContent = message;

    Object.assign(alertBox.style, {
        position: "fixed",
        top: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#d4edda",
        color: "#155724",
        padding: "15px 20px",
        border: "1px solid #c3e6cb",
        borderRadius: "5px",
        fontSize: "16px",
        fontWeight: "bold",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        zIndex: "1000",
    });

    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 5000);
}

// Welcome message logic
document.addEventListener("DOMContentLoaded", () => {
    const showWelcomeMessage = localStorage.getItem("showWelcomeMessage");
    const firstName = localStorage.getItem("main_firstname");

    if (showWelcomeMessage === "true") {
        const message = firstName
            ? `Hi ${firstName}! Welcome to iCoder!`
            : "Hi! Welcome to iCoder!";

        createAlertBox(message);
        localStorage.removeItem("showWelcomeMessage");
    }
});

// Logout Function
function logout() {
    // Remove session-specific flags
    localStorage.removeItem("showWelcomeMessage");
    localStorage.removeItem("main_firstname");

    // Redirect to login page
    window.location.href = "login.html";
}


// Attach logout button logic
document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
});



// Toggle edit form visibility
function toggleEditForm() {
    const formContainer = document.getElementById("edit-form-container");
    formContainer.style.display = formContainer.style.display === "none" ? "block" : "none";
}

// Load profile data from localStorage
function loadProfile() {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
        // Populate the profile display with data from localStorage
        document.getElementById("profile-name").innerText = userData.firstname + " " + userData.lastname;
        document.getElementById("profile-role").innerText = userData.role || "Web Designer | Developer | Entrepreneur";
        document.getElementById("profile-about").innerText = userData.about || "I am passionate about web development and creating user-friendly designs that resonate with people.";
        document.getElementById("profile-email").innerText = userData.email;
        document.getElementById("profile-phone").innerText = userData.phone;
        document.getElementById("profile-location").innerText = userData.location || "North India";
        document.getElementById("profile-pic").src = userData.profilePic || "https://via.placeholder.com/150";
    } else {
        // If no user data found, display a message or default values
        document.getElementById("profile-name").innerText = "Guest";
        document.getElementById("profile-role").innerText = "Guest User";
        document.getElementById("profile-pic").src = "https://via.placeholder.com/150";
    }
}

// Update profile and save to localStorage without updating the password
function updateProfile(event) {
    event.preventDefault();

    const form = document.getElementById("edit-form");

    const updatedUser = {
        firstname: form["edit-firstname"].value || "Dhrubajyoti",
        lastname: form["edit-lastname"].value || "Das",
        role: form["edit-role"].value || "Web Designer | Developer | Entrepreneur",
        about: form["edit-about"].value || "I am passionate about web development.",
        email: form["edit-email"].value || "dhrubajyoti@example.com",
        phone: form["edit-phone"].value || "+91 6289177529",
        location: form["edit-location"].value || "North India",
        profilePic: document.getElementById("profile-pic").src, // Get profile picture URL
        // Password remains unchanged
        password: JSON.parse(localStorage.getItem("user"))?.password || ""
    };

    // Save updated data to localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Reload profile data and hide the form
    loadProfile();
    toggleEditForm();
}


// Update profile image when a new file is selected
const label = document.querySelector('label[for="edit-image"]'); // Get the label associated with the file input

function updateProfileImage(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const newImageUrl = e.target.result;

            // Update the profile picture in the profile page
            document.getElementById("profile-pic").src = newImageUrl;

            // Store the new profile image URL in localStorage
            const storedUser = JSON.parse(localStorage.getItem("user")) || {};
            storedUser.profilePic = newImageUrl; // Set new profile image URL
            localStorage.setItem("user", JSON.stringify(storedUser)); // Save to localStorage

            // Update label text
            label.textContent = "Image uploaded";
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please upload a valid image file.");
    }
}

// Initialize profile on page load
document.addEventListener("DOMContentLoaded", function () {
    loadProfile(); // Ensure profile data is loaded

    // Set profile image on the profile page and dropdown if available
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.profilePic) {
        // Set profile image in the profile dropdown (if any)
        const profileDropdownImg = document.getElementById("profile-dropdown-img");
        if (profileDropdownImg) {
            profileDropdownImg.src = userData.profilePic;
        }
    }

    // Populate the edit form with stored user data if available
    populateEditForm();
});

// Populate edit form fields with data from localStorage
function populateEditForm() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
        document.getElementById("edit-firstname").value = storedUser.firstname || '';
        document.getElementById("edit-lastname").value = storedUser.lastname || '';
        document.getElementById("edit-role").value = storedUser.role || '';
        document.getElementById("edit-about").value = storedUser.about || '';
        document.getElementById("edit-email").value = storedUser.email || '';
        document.getElementById("edit-phone").value = storedUser.phone || '';
        document.getElementById("edit-location").value = storedUser.location || '';
    }
}