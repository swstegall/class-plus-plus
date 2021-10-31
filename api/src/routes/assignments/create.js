const verifyToken = require("../../utilities/verifyToken");
const models = require("../../models");
const uuidv4 = require("../../utilities/uuidv4");

const create = async (req, res) => {
  try {
    const tokenObject = verifyToken(req.headers.authorization.substring(7));
    if (tokenObject.RoleID === 1) {
      const id = uuidv4();
      await models.assignment.create({
        ID: id,
        CourseID: req.body.CourseID,
        Title: req.body.Title,
        Description: req.body.Description,
        DueDate: req.body.DueDate,
      });
      const assignments = await models.assignment.findAll({
        where: { CourseID: req.body.CourseID },
      });
      res.status(200).json(assignments);
    } else {
      res
        .status(400)
        .json({ success: false, message: "You are not a teacher." });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

module.exports = create;
