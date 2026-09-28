const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const authMiddleware = require("./middleware/authMiddleware");  
const investmentRoutes = require("./routes/investmentRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const walletRoutes = require("./routes/walletRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const profileRoutes = require("./routes/profileRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Authentication Routes
app.use("/api/auth", authRoutes);

// Property Routes
app.use("/api/properties", propertyRoutes);

// Investment Routes
app.use("/api/investments", investmentRoutes);

// Portfolio Routes
app.use("/api/portfolio", portfolioRoutes);

// Wallet Routes
app.use("/api/wallet", walletRoutes);

// Transaction Routes
app.use("/api/transactions", transactionRoutes);

// Dashboard Routes
app.use("/api/dashboard", dashboardRoutes);

// Certificate Routes
app.use("/api/certificates", certificateRoutes);

// Profile Routes
app.use("/api/profile", profileRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("OwnBit Backend is Running!");
});

// Test PostgreSQL Connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      message: "Database Connected Successfully!",
      time: result.rows[0].now,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database Connection Failed",
    });
  }
});

// Test Authentication Middleware
app.get("/test-auth", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Authentication middleware is working!",
    user: req.user,
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});