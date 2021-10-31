const verifyToken = require("../../utilities/verifyToken");
const models = require("../../models");

const readSubmissions = async (req, res) => {
  try {
    const tokenObject = verifyToken(req.headers.authorization.substring(7));
    if (tokenObject.RoleID === 0) {
      const assignmentSubmissions = await models.assignmentSubmission.findAll({
        attributes: ["AssignmentID", "UserID"],
        where: { UserID: tokenObject.UserID },
      });
      res.status(200).json(assignmentSubmissions);
    } else {
      res
        .status(400)
        .json({ success: false, message: "You are not a student." });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports = readSubmissions;
