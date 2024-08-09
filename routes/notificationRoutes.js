const express = require("express");
const { createNotification } = require("../controllers/notificationController");
const router = express.Router();

//Task 5 - Real-time Features
router.post("/", createNotification);

module.exports = router;
