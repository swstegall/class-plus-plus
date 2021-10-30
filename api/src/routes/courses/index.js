const express = require("express");
const create = require("./create");
const read = require("./read");
const readAll = require("./readAll");
const register = require("./register");
const update = require("./update");

let router = express.Router();

router.get("/", read);
router.get("/all", readAll);
router.post("/", create);
router.post("/register", register);
router.put("/", update);

module.exports = router;
