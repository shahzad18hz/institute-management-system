const User = require("../models/user");
const bcrypt = require("bcrypt");

// ADD RECEPTIONIST (ADMIN ONLY)
exports.addReceptionist = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check already exists
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const receptionist = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "receptionist",
      isActive: true,
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
  const list = await User.find({ role: "receptionist" }).select("-password");
  res.json(list);
};

// TOGGLE STATUS
exports.toggleStatus = async (req, res) => {
  const rec = await User.findById(req.params.id);
  if (!rec || rec.role !== "receptionist") {
    return res.status(404).json({ message: "Not found" });
  }

  rec.isActive = !rec.isActive;
  await rec.save();

  res.json({ message: "Status updated" });
};

// DELETE
exports.deleteReceptionist = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};
