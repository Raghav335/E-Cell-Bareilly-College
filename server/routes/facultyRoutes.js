const express = require("express");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const router = express.Router();

const applicationsFilePath = path.join(
    __dirname,
    "../data/contacts.json"
);

const messagesFilePath = path.join(
    __dirname,
    "../data/contactMessages.json"
);

// ===============================
// FACULTY AUTH MIDDLEWARE
// ===============================
function authenticateFaculty(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.FACULTY_JWT_SECRET
        );

        if (decoded.role !== "faculty-coordinator") {
            return res.status(403).json({
                success: false,
                message: "Faculty access required"
            });
        }

        req.faculty = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

// ===============================
// FACULTY LOGIN
// ===============================
router.post("/login", (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        if (
            email !== process.env.FACULTY_EMAIL ||
            password !== process.env.FACULTY_PASSWORD
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid faculty credentials"
            });
        }

        const token = jwt.sign(
            {
                email: process.env.FACULTY_EMAIL,
                name: "Roma Saxena",
                role: "faculty-coordinator"
            },
            process.env.FACULTY_JWT_SECRET,
            {
                expiresIn: "8h"
            }
        );

        res.json({
            success: true,
            message: "Faculty login successful",
            token
        });

    } catch (error) {
        console.error("Faculty Login Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

// ===============================
// VERIFY FACULTY
// ===============================
router.get("/verify", authenticateFaculty, (req, res) => {
    res.json({
        success: true,
        message: "Faculty authenticated",
        faculty: req.faculty
    });
});

// ===============================
// GET JOIN APPLICATIONS
// ===============================
router.get("/applications", authenticateFaculty, (req, res) => {
    try {
        const applications = JSON.parse(
            fs.readFileSync(
                applicationsFilePath,
                "utf-8"
            )
        );

        res.json({
            success: true,
            count: applications.length,
            data: applications
        });

    } catch (error) {
        console.error("Faculty Applications Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch applications"
        });
    }
});

// ===============================
// GET CONTACT MESSAGES
// ===============================
router.get("/messages", authenticateFaculty, (req, res) => {
    try {
        const messages = JSON.parse(
            fs.readFileSync(
                messagesFilePath,
                "utf-8"
            )
        );

        res.json({
            success: true,
            count: messages.length,
            data: messages
        });

    } catch (error) {
        console.error("Faculty Messages Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch messages"
        });
    }
});

// ===============================
// DASHBOARD SUMMARY
// ===============================
router.get("/dashboard", authenticateFaculty, (req, res) => {
    try {
        const applications = JSON.parse(
            fs.readFileSync(
                applicationsFilePath,
                "utf-8"
            )
        );

        const messages = JSON.parse(
            fs.readFileSync(
                messagesFilePath,
                "utf-8"
            )
        );

        res.json({
            success: true,
            data: {
                totalApplications: applications.length,
                totalMessages: messages.length
            }
        });

    } catch (error) {
        console.error("Faculty Dashboard Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to load dashboard"
        });
    }
});

module.exports = router;