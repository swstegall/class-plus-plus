const express = require("express");
const create = require("./create");
const read = require("./read");
const submit = require("./submit");
const update = require("./update");

let router = express.Router();

router.post("/read", read);
router.post("/", create);
router.post("/submit", submit);
router.put("/", update);

module.exports = router;
