const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

// Create a logger instance
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.metadata({ fillExcept: ["message", "level", "timestamp"] }),
    winston.format.printf((info) => {
      const { level, message, timestamp, metadata } = info;
      const fileName = metadata.fn ?? "";
      const functionName = metadata.func ?? "";
      let line = fileName;
      if (functionName) {
        line += `:${functionName}`;
      }
      return `${timestamp} ${level} [${line}] ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: "logs/logs-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "7d",
    }),
  ],
});

module.exports = logger;
