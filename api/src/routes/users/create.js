const models = require("../../models");
const generatePassword = require("../../utilities/generatePassword");
const uuidv4 = require("../../utilities/uuidv4");

const create = async (req, res) => {
  const id = uuidv4();
  await models.credential.create({
    ID: id,
    Email: req.body.Email,
    Password: generatePassword(req.body.Password),
  });
  await models.user.create({
    ID: id,
    RoleID: req.body.RoleID,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Grade: req.body.Grade,
  });
  res.status(200).json({ success: true, message: "users/create stub." });
};

module.exports = create;
