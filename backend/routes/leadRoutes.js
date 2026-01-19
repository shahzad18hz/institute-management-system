const express = require("express");
const {
  addLead,
  getAllLeads,
  getLeadById,
  updateLeadStatus,
  addFollowUp,
} = require("../controllers/leadController");

const router = express.Router();

router.post("/", addLead);
router.get("/", getAllLeads);
router.get("/:id", getLeadById);
router.patch("/:id/status", updateLeadStatus);
router.post("/:id/followup", addFollowUp);

module.exports = router; 