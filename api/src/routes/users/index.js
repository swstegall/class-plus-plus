const express = require("express");
const create = require("./create");
const read = require("./read");
const readTeachers = require("./readTeachers");
const update = require("./update");

let router = express.Router();

router.get("/", read);
router.get("/teachers", readTeachers);
router.post("/create", create);
router.put("/", update);

module.exports = router;
