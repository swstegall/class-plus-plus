const express = require("express");
const create = require("./create");
const read = require("./read");
const update = require("./update");

let router = express.Router();

router.get("/", read);
router.post("/", create);
router.put("/", update);

module.exports = router;
