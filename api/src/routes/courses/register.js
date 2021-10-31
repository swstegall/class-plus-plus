const verifyToken = require("../../utilities/verifyToken");
const models = require("../../models");
const uuidv4 = require("../../utilities/uuidv4");

const register = async (req, res) => {
  try {
    const tokenObject = verifyToken(req.headers.authorization.substring(7));
    if (tokenObject.RoleID === 0) {
      const id = uuidv4();
      await models.courseRegistration.create({
        ID: id,
        CourseID: req.body.CourseID,
        UserID: tokenObject.UserID,
      });
      const courseRegistrations = await models.courseRegistration.findAll({
        where: { UserID: tokenObject.UserID },
        include: [models.course],
      });
      res.status(200).json(courseRegistrations);
    } else {
      res
        .status(400)
        .json({ success: false, message: "You are not a student." });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports = register;
