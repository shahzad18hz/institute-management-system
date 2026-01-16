// routes/setup.js
const express = require("express");
const Admin = require("../models/Admin");

const router = express.Router();

router.post("/create-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await Admin.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = new Admin({
      name,
      email,
      password,   // 👈 plain password
      role: "admin"
    });

    await admin.save();

    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating admin" });
  }
});

module.exports = router;
