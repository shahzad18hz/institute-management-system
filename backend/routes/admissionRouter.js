const express = require("express");
const router = express.Router();
const { createAdmission } = require("../controllers/admissionController");
const auth = require("../middlewares/auth");

router.post("/create", auth(["admin"]), createAdmission);

module.exports = router;
