const express = require("express");

const { askTripAssistant } = require("../controllers/chatController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, askTripAssistant);

module.exports = router;
