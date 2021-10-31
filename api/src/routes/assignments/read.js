const verifyToken = require("../../utilities/verifyToken");
const models = require("../../models");

const read = async (req, res) => {
  try {
    const tokenObject = verifyToken(req.headers.authorization.substring(7));
    if (tokenObject.RoleID === 1 || tokenObject.RoleID === 0) {
      const assignments = await models.assignment.findAll({
        where: { CourseID: req.body.CourseID },
      });
      res.status(200).json(assignments);
    } else {
      res
        .status(400)
        .json({ success: false, message: "You are not a teacher or student." });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports = read;
