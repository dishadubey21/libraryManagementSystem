const correctUsername = "admin";  
const correctPassword = "admin123";  

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === correctUsername && password === correctPassword) {
        window.location.href = "http://127.0.0.1:5500/adminDashboard.html";
    } 
    else {
        document.getElementById("error-message").style.display = "block";
    }
});
