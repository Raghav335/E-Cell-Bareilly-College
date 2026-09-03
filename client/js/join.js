const joinForm = document.getElementById("joinForm");
const formMessage = document.getElementById("formMessage");

joinForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        course: document.getElementById("course").value.trim(),
        year: document.getElementById("year").value.trim(),
        interest: document.getElementById("interest").value,
        message: document.getElementById("message").value.trim()
    };

    try {

        const response = await fetch(
    "https://e-cell-bareilly-college.onrender.com/api/contacts",
    {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {

            formMessage.innerHTML = `
                <div class="success-message">
                    ✓ Application submitted successfully!
                    <br>
                    Welcome to E-Cell Bareilly College.
                </div>
            `;

            joinForm.reset();

        } else {

            formMessage.innerHTML = `
                <div class="error-message">
                    ${result.message}
                </div>
            `;
        }

    } catch (error) {

        console.error("Join Form Error:", error);

        formMessage.innerHTML = `
            <div class="error-message">
                Unable to submit application. Please try again.
            </div>
        `;
    }

});