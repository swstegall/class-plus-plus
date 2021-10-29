const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);

const generatePassword = (password) => bcrypt.hashSync(password, salt);

module.exports = generatePassword;
