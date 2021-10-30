const verifyToken = require("../../utilities/verifyToken");
const models = require("../../models");

const read = async (req, res) => {
  try {
    const tokenObject = verifyToken(req.headers.authorization.substring(7));
    if (tokenObject.RoleID === 0) {
      const courses = await models.course.findAll();
      res.status(200).json(courses);
    } else {
      res
        .status(400)
        .json({ success: false, message: "You are not a student." });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports = read;
