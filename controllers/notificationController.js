const Notification = require("../models/notifyModel");
const logger = require("../utils/logger");
const { logInfo } = require("../utils/logger");

module.exports = {
  createNotification: async (req, res) => {
    try {
      const { message } = req.body;
      const notification = new Notification({ message });
      await notification.save();
      const io = req.app.get("io");
      io.emit("newNotification", notification);
      logger.info("message sent to the users and database aswell", {
        fn: "notificationController.js",
        func: "ended",
      });
      return res.status(201).json({ success: true, data: notification });
    } catch (err) {
      logger.error(
        "catch error from the file notificationController.js and function createNotification",
        {
          fn: "notificationController.js",
          func: "stoped",
        }
      );
      res.status(500).json({ success: false, error: err.message });
    }
  },
};
