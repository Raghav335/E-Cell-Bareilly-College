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
// JWT AUTH MIDDLEWARE
// ===============================
function authenticateAdmin(req, res, next) {
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
            process.env.JWT_SECRET
        );

        req.admin = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

// ===============================
// ADMIN LOGIN
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
            email !== process.env.ADMIN_EMAIL ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid admin credentials"
            });
        }

        const token = jwt.sign(
            {
                email: process.env.ADMIN_EMAIL,
                role: "president"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8h"
            }
        );

        res.json({
            success: true,
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error("Admin Login Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

// ===============================
// VERIFY ADMIN
// ===============================
router.get("/verify", authenticateAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Admin authenticated",
        admin: req.admin
    });
});

// ===============================
// GET JOIN APPLICATIONS
// ===============================
router.get("/applications", authenticateAdmin, (req, res) => {
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
        console.error("Applications Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch applications"
        });
    }
});

// ===============================
// GET CONTACT MESSAGES
// ===============================
router.get("/messages", authenticateAdmin, (req, res) => {
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
        console.error("Messages Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch messages"
        });
    }
});

// ===============================
// DASHBOARD SUMMARY
// ===============================
router.get("/dashboard", authenticateAdmin, (req, res) => {
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
        console.error("Dashboard Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to load dashboard"
        });
    }
});

module.exports = router;