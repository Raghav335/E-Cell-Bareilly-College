const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(__dirname, "../data/members.json");

router.get("/", (req, res) => {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        const members = JSON.parse(data);

        res.json({
            success: true,
            count: members.length,
            data: members
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch members"
        });
    }
});

module.exports = router;