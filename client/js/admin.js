const API_URL =
    "https://e-cell-bareilly-college.onrender.com/api/admin";
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const loginBtn = document.getElementById("loginBtn");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";

    loginMessage.textContent = "";

    try {

        const response = await fetch(`${API_URL}/login`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {

            loginMessage.textContent =
                data.message || "Login failed";

            loginMessage.style.color = "red";

            return;
        }

        localStorage.setItem(
            "adminToken",
            data.token
        );

        loginMessage.textContent =
            "Login successful. Opening dashboard...";

        loginMessage.style.color = "green";

        setTimeout(() => {
            window.location.href = "admin.html";
        }, 700);

    } catch (error) {

        console.error(error);

        loginMessage.textContent =
            "Unable to connect to server";

        loginMessage.style.color = "red";

    } finally {

        loginBtn.disabled = false;
        loginBtn.textContent = "Login to Dashboard";
    }

});