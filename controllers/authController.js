const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/authModel");
const logger = require("../utils/logger");
const { JWT_SECRET_KEY } = require("../config/config");

const JWT_SECRET = JWT_SECRET_KEY;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, role } = req.body;

      // validate email
      if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
      //validate role
      if (!role) {
        return res.status(400).json({ error: "Please enter the Role" });
      }
      // validate password
      if (!password) {
        return res.status(400).json({
          error:
            "Password must be include at least one uppercase letter,one lowercase letter,and one number",
        });
      }
      const existingUser = userModel.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const newUser = await userModel.createUser({ email, password, role });
      res.status(201).json({
        message: "User registered successfully",
        user: { id: newUser.id, email: newUser.email, role: newUser.role },
      });
      //winston logger
      logger.info("user registered successfully", {
        fn: "authController.js",
        func: "success - ended",
      });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
      //winston logger
      logger.error("user registration trow catch error", {
        fn: "authController.js",
        func: "error - ended",
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password, role } = req.body;

      if (!email || !password || !role) {
        return res
          .status(400)
          .json({ error: "email, password and role are required" });
      }

      const user = userModel.findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.json({ email, token });
      //winston logger
      logger.info("user login successfully", {
        fn: "authController.js",
        func: "success - end",
      });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
      //winston logger
      logger.error("user login trow catch error", {
        fn: "authController.js",
        func: "error - ended",
      });
    }
  },
  userPermissionForSettings: (req, res) => {
    user = req.user;
    console.log(user);
    if (user && user?.role == "admin") {
      //winston logger
      logger.error("user permission to enter the settings successfully", {
        fn: "authController.js",
        func: "success - end",
      });
      return res.json({ message: "This is the user settings", user: req.user });
    } else {
      //winston logger
      logger.error("user permission to enter the settings denied", {
        fn: "authController.js",
        func: "error - ended",
      });
      return res.send({ message: "permission denied" });
    }
  },
};
