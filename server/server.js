const express = require("express");
const cors = require("cors");
const path = require("path");

// Routes
const memberRoutes = require("./routes/memberRoutes");
const eventRoutes = require("./routes/eventRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = 5000;

// ================================
// MIDDLEWARE
// ================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// FRONTEND STATIC FILES
// ================================

app.use(express.static(path.join(__dirname, "../client")));

// ================================
// HOME API
// ================================

app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "E-Cell Bareilly College API is running 🚀"
    });
});

// ================================
// API ROUTES
// ================================

app.use("/api/members", memberRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/contacts", contactRoutes);

// ================================
// FRONTEND HOME
// ================================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

// ================================
// 404 API HANDLER
// ================================

app.use("/api", (req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});

// ================================
// SERVER
// ================================

app.listen(PORT, () => {
    console.log("");
    console.log("====================================");
    console.log("🚀 E-CELL BAREILLY COLLEGE");
    console.log("====================================");
    console.log(`🌐 Website: http://localhost:${PORT}`);
    console.log(`🔌 API:     http://localhost:${PORT}/api`);
    console.log(`👥 Members: http://localhost:${PORT}/api/members`);
    console.log(`📅 Events:  http://localhost:${PORT}/api/events`);
    console.log("====================================");
    console.log("");
});