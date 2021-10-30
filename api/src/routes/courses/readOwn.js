const verifyToken = require("../../utilities/verifyToken");
const models = require("../../models");

const readOwn = async (req, res) => {
  try {
    const tokenObject = verifyToken(req.headers.authorization.substring(7));
    if (tokenObject.RoleID === 1) {
      const courses = await models.course.findAll({
        where: { CreatedByUserID: tokenObject.UserID },
      });
      res.status(200).json(courses);
    } else if (tokenObject.RoleID === 0) {
      const courseRegistrations = await models.courseRegistration.findAll({
        where: { UserID: tokenObject.UserID },
        include: [models.course],
      });
      res.status(200).json(courseRegistrations);
    } else {
      res
        .status(400)
        .json({ success: false, message: "You are not a teacher." });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports = readOwn;
