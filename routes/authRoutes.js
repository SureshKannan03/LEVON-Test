// routes/authRoutes.js

const express = require("express");
const {
  register,
  login,
  userPermissionForSettings,
} = require("../controllers/authController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

//task two Authentication and Authorization
router.post("/register", register);
router.post("/login", login);
router.get("/settings", authenticateToken, userPermissionForSettings);

module.exports = router;
