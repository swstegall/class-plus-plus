const verifyToken = require("../../utilities/verifyToken");
const models = require("../../models");

const update = async (req, res) => {
  try {
    const tokenObject = verifyToken(req.headers.authorization.substring(7));
    if (tokenObject.RoleID === 2) {
      await models.credential.update(
        {
          Email: req.body.Email,
        },
        {
          where: { ID: req.body.UserID },
        }
      );
      await models.user.update(
        {
          FirstName: req.body.FirstName,
          Grade: req.body.Grade,
          LastName: req.body.LastName,
          RoleID: req.body.RoleID,
        },
        {
          where: { ID: req.body.UserID },
        }
      );
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

module.exports = update;
