const verifyToken = require("../../utilities/verifyToken");
const models = require("../../models");

const readTeachers = async (req, res) => {
  try {
    const tokenObject = verifyToken(req.headers.authorization.substring(7));
    if (tokenObject.RoleID === 0) {
      const users = await models.user.findAll({
        where: { RoleID: 1 },
      });
      res.status(200).json(users);
    } else {
      res
        .status(400)
        .json({ success: false, message: "You are not a student." });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports = readTeachers;
