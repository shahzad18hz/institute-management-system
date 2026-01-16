const Receptionist = require("../models/Receptionist");

// ADD
exports.addReceptionist = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const receptionist = await Receptionist.create({
      name,
      email,
      password,
      role: "receptionist",
      createdBy: req.user.id, // ✅ FIX
    });

    res.status(201).json({
      message: "Receptionist added successfully",
      receptionist,
    });
  } catch (err) {
    console.error("addReceptionist error:", err);
    res.status(500).json({ message: "Failed to add receptionist" });
  }
};

// GET ALL
exports.getReceptionists = async (req, res) => {
  const list = await Receptionist.find({
    createdBy: req.user.id, // ✅ FIX
  });

  res.json(list);
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  const rec = await Receptionist.findById(req.params.id);
  if (!rec) return res.status(404).json({ message: "Not found" });

  rec.isActive = !rec.isActive;
  await rec.save();

  res.json({ message: "Status updated" });
};

// DELETE
exports.deleteReceptionist = async (req, res) => {
  await Receptionist.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};
