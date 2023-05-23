const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const createAccButton = document.getElementById("createAccBtn");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "purva5@uw.edu" && password === "password") {
        window.location.href = "index.html";
        // alert("You have successfully logged in.");
        // location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})

createAccButton.addEventListener("click", (e) => {
    e.preventDefault();
    
        window.location.href = "createacc.html";
        // alert("You have successfully logged in.");
        // location.reload();
})