require("dotenv").config();

module.exports = {
  DB_URL: process.env.DB_URL, // take from env
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  TOKEN_EXPIRY: process.env.TOKEN_EXPIRY,
  PORT: process.env.PORT,
};
