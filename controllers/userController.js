const User = require("../models/userModel");
const logger = require("../utils/logger");
module.exports = {
  createUser: async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ msg: "Please enter a valid email address" });
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        msg: "Password must be at least 6 characters long, contain at least one uppercase letter, and one number",
      });
    }
    try {
      let user = new User({
        name,
        email,
        password,
      });
      await user.save();
      res.json(user);
      //winston logger
      logger.info("user registered (mongodb) successfully", {
        fn: "userController.js",
        func: "success - ended",
      });
    } catch (err) {
      //winston logger
      logger.error("user registration (mongodb) throw catch error", {
        fn: "userController.js",
        func: "error - ended",
      });
      res.status(500).send("user Already exist");
    }
  },
  getAllUsers: async (req, res) => {
    try {
      // const users = await User.find();
      const users = await User.aggregate([
        {
          $match: {},
        },
        {
          $group: {
            _id: null,
            totalUsers: { $sum: 1 },
            users: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            _id: 0,
            totalUsers: 1,
            users: 1,
          },
        },
      ]);

      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      res.json(user);
      //winston logger
      logger.info("user getById (mongodb) successfully", {
        fn: "userController.js",
        func: "success - ended",
      });
    } catch (err) {
      //winston logger
      logger.error("user getById throw catch error", {
        fn: "userController.js",
        func: "error - ended",
      });
      res.status(500).send(err.message);
    }
  },
  updateUser: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      let user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
      await user.save();
      res.json(user);
      //winston logger
      logger.info("user updated (mongodb) successfully", {
        fn: "userController.js",
        func: "success - ended",
      });
    } catch (err) {
      //winston logger
      logger.error("user updateUser throw catch error", {
        fn: "userController.js",
        func: "error - ended",
      });
      res.status(500).send("Server Error");
    }
  },
  deleteUser: async (req, res) => {
    try {
      let user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      await User.deleteOne(user?._id);
      res.json({ msg: "User removed" });
      //winston logger
      logger.info("user deleted (mongodb) successfully", {
        fn: "userController.js",
        func: "success - ended",
      });
    } catch (err) {
      //winston logger
      logger.error("user deletion throw catch error", {
        fn: "userController.js",
        func: "error - ended",
      });
      res.status(500).send("Server Error");
    }
  },
};
