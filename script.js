if (typeof ScrollReveal !== "undefined") {
    ScrollReveal().reveal('.section-title', { delay: 200 });
    ScrollReveal().reveal('.card', { interval: 200 });
    ScrollReveal().reveal('.carousel-caption', { delay: 500 });
}

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
