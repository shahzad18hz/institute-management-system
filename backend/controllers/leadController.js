const Lead = require("../models/Lead");


exports.addLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json({ message: "Lead added", lead });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding lead" });
  }
};


exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching leads" });
  }
};

exports.updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json({ message: "Status updated", lead });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Status update failed" });
  }
};
