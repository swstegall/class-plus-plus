const verifyToken = require("../../utilities/verifyToken");
const models = require("../../models");
const uuidv4 = require("../../utilities/uuidv4");

const submit = async (req, res) => {
  try {
    const tokenObject = verifyToken(req.headers.authorization.substring(7));
    if (tokenObject.RoleID === 0) {
      const id = uuidv4();
      await models.assignmentSubmission.create({
        ID: id,
        UserID: tokenObject.UserID,
        AssignmentID: req.body.AssignmentID,
        File: req.body.File,
      });
      res.status(200).json({ success: true });
    } else {
      res
        .status(400)
        .json({ success: false, message: "You are not a student." });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports = submit;
