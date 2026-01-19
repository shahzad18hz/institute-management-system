const Receptionist = require("../models/Receptionist");

// ADD RECEPTIONIST (ADMIN ONLY)
exports.addReceptionist = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check already exists
    const exists = await Receptionist.findOne({
      email: email.toLowerCase(),
    });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const receptionist = await Receptionist.create({
      name,
      email: email.toLowerCase(),
      password, // ❗ plain password (model hash karega)
      role: "receptionist",
      isActive: true,

      // ✅ YE LINE SAB SE ZAROORI HAI
      createdBy: req.user.id, // admin ka id (JWT se)
    });

    res.status(201).json({
      message: "Receptionist added successfully",
      receptionist: {
        id: receptionist._id,
        name: receptionist.name,
        email: receptionist.email,
        role: receptionist.role,
      },
    });
  } catch (err) {
    console.error("addReceptionist error:", err);
    res.status(500).json({ message: "Failed to add receptionist" });
  }
};

// GET ALL RECEPTIONISTS
exports.getReceptionists = async (req, res) => {
  const list = await Receptionist.find().select("-password");
  res.json(list);
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  const rec = await Receptionist.findById(req.params.id);
  if (!rec) {
    return res.status(404).json({ message: "Not found" });
  }

  rec.isActive = !rec.isActive;
  await rec.save();

  res.json({ message: "Status updated" });
};

// DELETE
exports.deleteReceptionist = async (req, res) => {
  await Receptionist.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};
