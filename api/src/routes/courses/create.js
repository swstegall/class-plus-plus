const verifyToken = require("../../utilities/verifyToken");
const models = require("../../models");
const uuidv4 = require("../../utilities/uuidv4");

const create = async (req, res) => {
  try {
    const tokenObject = verifyToken(req.headers.authorization.substring(7));
    if (tokenObject.RoleID === 1) {
      const id = uuidv4();
      await models.course.create({
        ID: id,
        Label: req.body.Label,
        Title: req.body.Title,
        Description: req.body.Description,
        CreatedByUserID: tokenObject.UserID,
      });
      const courses = await models.course.findAll();
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

module.exports = create;
