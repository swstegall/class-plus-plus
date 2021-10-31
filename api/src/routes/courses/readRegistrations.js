const verifyToken = require("../../utilities/verifyToken");
const models = require("../../models");

const readRegistrations = async (req, res) => {
  try {
    const tokenObject = verifyToken(req.headers.authorization.substring(7));
    if (tokenObject.RoleID === 1) {
      const courses = await models.courseRegistration.findAll();
      res.status(200).json(courses);
    } else {
      res
        .status(400)
        .json({ success: false, message: "You are not a teacher." });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports = readRegistrations;
