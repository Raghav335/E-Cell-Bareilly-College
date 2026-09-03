const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(__dirname, "../data/events.json");

router.get("/", (req, res) => {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        const events = JSON.parse(data);

        res.json({
            success: true,
            count: events.length,
            data: events
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch events"
        });
    }
});

module.exports = router;