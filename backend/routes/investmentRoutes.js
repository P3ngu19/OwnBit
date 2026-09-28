const express = require("express");

const {
  createInvestment,
} = require("../controllers/investmentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createInvestment);

module.exports = router;