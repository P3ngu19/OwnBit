const express = require("express");

const {
  getCertificates,
} = require("../controllers/certificateController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getCertificates);

module.exports = router;