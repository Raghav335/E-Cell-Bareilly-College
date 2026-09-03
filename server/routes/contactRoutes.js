const express = require("express");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = express.Router();


// ========================================
// FILE PATHS
// ========================================

const applicationsFilePath = path.join(
    __dirname,
    "../data/contacts.json"
);

const messagesFilePath = path.join(
    __dirname,
    "../data/contactMessages.json"
);


// ========================================
// GMAIL TRANSPORTER
// ========================================

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

// ========================================
// GET JOIN E-CELL APPLICATIONS
// ========================================

router.get("/", (req, res) => {

    try {

        const contacts = JSON.parse(
            fs.readFileSync(applicationsFilePath, "utf-8")
        );

        res.json({
            success: true,
            count: contacts.length,
            data: contacts
        });

    } catch (error) {

        console.error("Fetch Applications Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch applications"
        });

    }

});


// ========================================
// POST JOIN E-CELL APPLICATION
// ========================================

router.post("/", async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            course,
            year,
            interest,
            message
        } = req.body;


        // Validation
        if (
            !name ||
            !email ||
            !phone ||
            !course ||
            !year ||
            !interest ||
            !message
        ) {

            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });

        }


        // Read existing applications
        const contacts = JSON.parse(
            fs.readFileSync(applicationsFilePath, "utf-8")
        );


        // Create application
        const newApplication = {

            id: Date.now(),

            name: name.trim(),

            email: email.trim(),

            phone: phone.trim(),

            course: course.trim(),

            year: year.trim(),

            interest: interest.trim(),

            message: message.trim(),

            submittedAt: new Date().toISOString()

        };


        // Save application
        contacts.push(newApplication);

        fs.writeFileSync(
            applicationsFilePath,
            JSON.stringify(contacts, null, 2)
        );


        // Send Gmail notification
        await transporter.sendMail({

            from: `"E-Cell Bareilly College" <${process.env.EMAIL_USER}>`,

            to: process.env.ADMIN_EMAIL,

            replyTo: email,

            subject: `New E-Cell Application — ${name}`,

            html: `

                <div style="
                    font-family:Arial,sans-serif;
                    max-width:650px;
                    margin:auto;
                    padding:25px;
                    background:#f5f5f5;
                ">

                    <div style="
                        background:#111;
                        color:#fff;
                        padding:25px;
                        border-radius:12px;
                    ">

                        <h1 style="
                            color:#ff9d2e;
                            margin:0;
                        ">
                            E-CELL BAREILLY COLLEGE
                        </h1>

                        <p>
                            New Join E-Cell Application
                        </p>

                    </div>


                    <div style="
                        background:#fff;
                        padding:25px;
                        margin-top:15px;
                        border-radius:12px;
                    ">

                        <h2>Student Details</h2>

                        <p>
                            <strong>Name:</strong>
                            ${name}
                        </p>

                        <p>
                            <strong>Email:</strong>
                            ${email}
                        </p>

                        <p>
                            <strong>Phone:</strong>
                            ${phone}
                        </p>

                        <p>
                            <strong>Course:</strong>
                            ${course}
                        </p>

                        <p>
                            <strong>Year / Semester:</strong>
                            ${year}
                        </p>

                        <p>
                            <strong>Area of Interest:</strong>
                            ${interest}
                        </p>

                        <h3>Message</h3>

                        <p>
                            ${message}
                        </p>

                        <hr>

                        <p>
                            <strong>Application ID:</strong>
                            ${newApplication.id}
                        </p>

                        <p>
                            <strong>Submitted:</strong>
                            ${newApplication.submittedAt}
                        </p>

                    </div>

                </div>

            `

        });


        res.status(201).json({

            success: true,

            message: "Application submitted successfully",

            data: newApplication

        });


    } catch (error) {

        console.error("Join Application Error:", error);

        res.status(500).json({

            success: false,

            message:
                "Application saved, but email notification failed"

        });

    }

});


// ========================================
// CONTACT FORM - GET MESSAGES
// ========================================

router.get("/message", (req, res) => {

    try {

        const messages = JSON.parse(
            fs.readFileSync(messagesFilePath, "utf-8")
        );

        res.json({

            success: true,

            count: messages.length,

            data: messages

        });

    } catch (error) {

        console.error("Fetch Messages Error:", error);

        res.status(500).json({

            success: false,

            message: "Unable to fetch contact messages"

        });

    }

});


// ========================================
// CONTACT FORM - POST MESSAGE
// ========================================

router.post("/message", async (req, res) => {

    try {

        const {
            name,
            email,
            subject,
            message
        } = req.body;


        // Validation
        if (
            !name ||
            !email ||
            !subject ||
            !message
        ) {

            return res.status(400).json({

                success: false,

                message: "Please fill all required fields"

            });

        }


        // Read existing messages
        const messages = JSON.parse(
            fs.readFileSync(messagesFilePath, "utf-8")
        );


        // Create new message
        const newMessage = {

            id: Date.now(),

            name: name.trim(),

            email: email.trim(),

            subject: subject.trim(),

            message: message.trim(),

            submittedAt: new Date().toISOString()

        };


        // Save message
        messages.push(newMessage);

        fs.writeFileSync(

            messagesFilePath,

            JSON.stringify(messages, null, 2)

        );


        // Send email
        await transporter.sendMail({

            from:
                `"E-Cell Bareilly College" <${process.env.EMAIL_USER}>`,

            to:
                process.env.ADMIN_EMAIL,

            replyTo:
                email,

            subject:
                `Contact Message — ${subject}`,

            html: `

                <div style="
                    font-family:Arial,sans-serif;
                    max-width:650px;
                    margin:auto;
                    padding:25px;
                    background:#f5f5f5;
                ">

                    <div style="
                        background:#111;
                        color:#fff;
                        padding:25px;
                        border-radius:12px;
                    ">

                        <h1 style="
                            color:#ff9d2e;
                            margin:0;
                        ">
                            E-CELL BAREILLY COLLEGE
                        </h1>

                        <p>
                            New Contact Message
                        </p>

                    </div>


                    <div style="
                        background:#fff;
                        padding:25px;
                        margin-top:15px;
                        border-radius:12px;
                    ">

                        <h2>Message Details</h2>

                        <p>
                            <strong>Name:</strong>
                            ${name}
                        </p>

                        <p>
                            <strong>Email:</strong>
                            ${email}
                        </p>

                        <p>
                            <strong>Subject:</strong>
                            ${subject}
                        </p>

                        <h3>Message</h3>

                        <div style="
                            background:#f5f5f5;
                            padding:15px;
                            border-radius:8px;
                        ">
                            ${message}
                        </div>

                        <hr>

                        <p style="color:#777;">
                            <strong>Message ID:</strong>
                            ${newMessage.id}
                        </p>

                        <p style="color:#777;">
                            <strong>Submitted:</strong>
                            ${newMessage.submittedAt}
                        </p>

                    </div>

                </div>

            `

        });


        // Success response
        res.status(201).json({

            success: true,

            message: "Message sent successfully",

            data: newMessage

        });


    } catch (error) {

        console.error("Contact Message Error:", error);

        res.status(500).json({

            success: false,

            message:
                "Message saved, but email notification failed"

        });

    }

});


// ========================================
// EXPORT
// ========================================

module.exports = router;