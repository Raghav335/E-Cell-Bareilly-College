const API_URL =
    "https://e-cell-bareilly-college.onrender.com/api/faculty";

const loginForm =
    document.getElementById("facultyLoginForm");

const loginMessage =
    document.getElementById("loginMessage");

const loginBtn =
    document.getElementById("loginBtn");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    loginMessage.textContent = "";
    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";

    try {
        const response = await fetch(
            `${API_URL}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.message || "Login failed"
            );
        }

        localStorage.setItem(
            "facultyToken",
            data.token
        );

        localStorage.setItem(
            "facultyName",
            "Roma Saxena"
        );

        window.location.href =
            "faculty-dashboard.html";

    } catch (error) {

        console.error(
            "Faculty Login Error:",
            error
        );

        loginMessage.textContent =
            error.message ||
            "Unable to login. Please try again.";

        loginMessage.className =
            "error-message";

    } finally {

        loginBtn.disabled = false;
        loginBtn.textContent =
            "Login to Dashboard";
    }
});