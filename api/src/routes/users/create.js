const models = require("../../models");
const generatePassword = require("../../utilities/generatePassword");
const uuidv4 = require("../../utilities/uuidv4");

const create = async (req, res) => {
  const id = uuidv4();
  await models.credential.create({
    ID: id,
    Email: "test@test.com",
    Password: generatePassword("password"),
  });
  await models.user.create({
    ID: id,
    RoleID: 0,
    FirstName: "John",
    LastName: "Doe",
    Grade: "1",
  });
  res.status(200).json({ success: true, message: "users/create stub." });
};

module.exports = create;
