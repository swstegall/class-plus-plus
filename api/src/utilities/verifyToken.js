const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "thisisasecret";

const verifyToken = (token) => jwt.verify(token, jwtSecret);

module.exports = verifyToken;
