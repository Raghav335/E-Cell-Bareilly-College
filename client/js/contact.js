const contactForm = document.getElementById("contactForm");
const contactFormMessage =
    document.getElementById("contactFormMessage");


if (contactForm) {

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();


        const formData = {

            name: document
                .getElementById("contactName")
                .value
                .trim(),

            email: document
                .getElementById("contactEmail")
                .value
                .trim(),

            subject: document
                .getElementById("contactSubject")
                .value
                .trim(),

            message: document
                .getElementById("contactMessage")
                .value
                .trim()

        };


        contactFormMessage.innerHTML = `
            <p class="form-loading">
                Sending message...
            </p>
        `;


        try {

            const response = await fetch(
                "/api/contacts/message",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );


            const result = await response.json();


            if (result.success) {

                contactFormMessage.innerHTML = `
                    <div class="success-message">
                        ✓ Message sent successfully!
                        <br>
                        We will get back to you soon.
                    </div>
                `;

                contactForm.reset();

            } else {

                contactFormMessage.innerHTML = `
                    <div class="error-message">
                        ${result.message}
                    </div>
                `;

            }


        } catch (error) {

            console.error("Contact Form Error:", error);

            contactFormMessage.innerHTML = `
                <div class="error-message">
                    Unable to send message.
                    Please try again later.
                </div>
            `;

        }

    });

}