const express = require("express");
const { createNotification } = require("../controllers/notificationController");
const router = express.Router();

//Task 5 - Real-time Features
router.post("/receive", createNotification);

module.exports = router;
