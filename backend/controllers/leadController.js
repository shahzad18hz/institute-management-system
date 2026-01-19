const Lead = require("../models/Lead");

// Add new lead
exports.addLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all leads
exports.getAllLeads = async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
};

// Get single lead
exports.getLeadById = async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ message: "Lead not found" });
  res.json(lead);
};

// Update status only
exports.updateLeadStatus = async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ message: "Lead not found" });

  lead.status = req.body.status;
  await lead.save();
  res.json(lead);
};

// Add follow-up
exports.addFollowUp = async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ message: "Lead not found" });

  lead.followUps.push(req.body);

  // Business rule
  if (lead.followUps.length >= 3 && lead.status !== "admitted") {
    lead.status = "not_interested";
  }

  await lead.save();
  res.json(lead);
};
