const loginForm = document.getElementById("login-form");
const createAccButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

createAccButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    const confirmPassword = loginForm.confirmPassword.value;

    if (username === "purva5@uw.edu" && password === "password") {
        if (password === confirmPassword) {
        window.location.href = "login.html";
        // alert("You have successfully logged in.");
        // location.reload();
        }
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})
