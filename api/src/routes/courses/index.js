const express = require("express");
const create = require("./create");
const readAll = require("./readAll");
const readOwn = require("./readOwn");
const readRegistrations = require("./readRegistrations");
const register = require("./register");
const update = require("./update");

let router = express.Router();

router.get("/all", readAll);
router.get("/", readOwn);
router.get("/registrations", readRegistrations);
router.post("/", create);
router.post("/register", register);
router.put("/", update);

module.exports = router;
