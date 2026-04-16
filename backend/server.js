const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Contact = require("./models/Contact");

const app = express();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: false
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

// Route to save form data
app.post("/contact", async (req, res) => {
  try {
    console.log("📝 Contact form received:", req.body);
    const contact = new Contact(req.body);
    await contact.save();
    console.log("✅ Contact saved to DB");
    res.status(201).json({ success: true, message: "Saved to DB" });
  } catch (err) {
    console.error("❌ Error saving contact:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log("🚀 Server running on port 5000")
    );
  })
  .catch(err => console.log("❌ DB Error:", err));