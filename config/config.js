const dotenv = require("dotenv");
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});
module.exports = {
  PORT: process.env.PORT,
  DB: process.env.DB,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
