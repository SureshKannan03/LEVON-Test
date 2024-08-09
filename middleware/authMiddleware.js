const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/config");

const JWT_SECRET = JWT_SECRET_KEY;

module.exports = {
  authenticateToken: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null)
      return res.status(401).json({ error: "No token provided" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: "Invalid token" });
      req.user = user;
      next();
    });
  },
};
