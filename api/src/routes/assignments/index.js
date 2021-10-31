const express = require("express");
const create = require("./create");
const read = require("./read");
const readSubmissions = require("./readSubmissions");
const submit = require("./submit");
const update = require("./update");

let router = express.Router();

router.post("/read", read);
router.get("/readSubmissions", readSubmissions);
router.post("/", create);
router.post("/submit", submit);
router.put("/", update);

module.exports = router;
