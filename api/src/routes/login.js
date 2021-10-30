const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const models = require("../models");

const jwtSecret = process.env.JWT_SECRET || "thisisasecret";

const login = async (req, res) => {
  if (!req.body.Email && !req.body.Password) {
    res.status(401).send({
      success: false,
      message: "You must specify bot an email and password to login.",
    });
    return;
  }
  req.body.Email = req.body.Email.replace(/\s+/g, "");
  req.body.Email = req.body.Email.toLowerCase();
  const currentCredential = await models.credential.findOne({
    where: {
      Email: req.body.Email,
    },
    include: [models.user],
  });
  if (
    currentCredential !== undefined &&
    currentCredential !== null &&
    bcrypt.compareSync(
      req.body.Password,
      (currentCredential && currentCredential.Password) || ""
    )
  ) {
    res.status(200).send({
      success: true,
      token: jwt.sign(
        {
          UserID: currentCredential.ID,
          Email: currentCredential.Email,
          RoleID: currentCredential.user.RoleID,
        },
        jwtSecret,
        {
          expiresIn: "3h",
        }
      ),
      UserID: currentCredential.ID,
      Email: currentCredential.Email,
      RoleID: currentCredential.user.RoleID,
      FirstName: currentCredential.user.FirstName,
      LastName: currentCredential.user.LastName,
      Grade: currentCredential.user.Grade,
    });
  } else {
    res.status(401).send({
      success: false,
      message: "You have entered an incorrect email or password.",
    });
  }
};

module.exports = login;
