
const toggleButton = document.getElementById("toggle-button");
const passwordInput = document.getElementById("password");

toggleButton.addEventListener("click", function () {
    if (passwordInput.type == "password") {
        passwordInput.type = "text";

    } else {
        passwordInput.type == "text";
        passwordInput.type = "password";
    }

});