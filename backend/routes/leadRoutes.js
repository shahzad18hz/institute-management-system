const express = require("express");
const router = express.Router();
const {addLead , getLeads , updateLeadStatus }= require("../controllers/leadController");

router.post("/" , addLead);
router.get("/" , getLeads);
router.patch("/:id/status" , updateLeadStatus);

module.exports = router;