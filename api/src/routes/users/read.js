const verifyToken = require("../../utilities/verifyToken");
const models = require("../../models");

const read = async (req, res) => {
  try {
    const tokenObject = verifyToken(req.headers.authorization.substring(7));
    if (tokenObject.RoleID === 2) {
      const users = await models.credential.findAll({
        include: [models.user],
      });
      res.status(200).json(users);
    } else {
      res
        .status(400)
        .json({ success: false, message: "You are not an administrator." });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports = read;
