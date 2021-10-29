const express = require("express");
const create = require("./create");
const read = require("./read");
const register = require("./register");
const update = require("./update");

let router = express.Router();

router.get("/", read);
router.post("/", create);
router.post("/register", register);
router.put("/", update);

module.exports = router;
