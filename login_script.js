const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const createAccButton = document.getElementById("createAccBtn");
const loginErrorMsg = document.getElementById("login-error-msg");

// Retrieve stored values from local storage
const storedUsername = localStorage.getItem("username");
const storedPassword = localStorage.getItem("password");

// Check if stored values exist
if (storedUsername && storedPassword) {
    loginForm.username.value = storedUsername;
}

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "admin" && password === "admin") {
        // Store user information in local storage
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        
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