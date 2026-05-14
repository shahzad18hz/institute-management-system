const Teacher = require("../models/Teacher");

// ➕ ADD TEACHER (ADMIN ONLY)
exports.addTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await Teacher.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const teacher = await Teacher.create({
      ...req.body,
      email: email.toLowerCase(),
      password, // model khud hash karega
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Teacher added successfully",
      teacher: {
        id: teacher._id,
        email: teacher.email,
        role: teacher.role,
      },
    });
  } catch (err) {
    console.error("addTeacher error:", err);
    res.status(500).json({ message: "Failed to add teacher" });
  }
};

// 📋 GET ALL TEACHERS
exports.getTeachers = async (req, res) => {
  const teachers = await Teacher.find().select("-password");
  res.json(teachers);
};

// ❌ DELETE TEACHER
exports.deleteTeacher = async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.json({ message: "Teacher deleted successfully" });
};
