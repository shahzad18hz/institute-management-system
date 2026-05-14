const TeacherAttendance = require("../models/TeacherAttendance");
const Teacher = require("../models/Teacher");

// Receptionist can mark once; Admin can update
exports.markAttendance = async (req, res) => {
  try {
    const { attendance, date } = req.body; // date = "YYYY-MM-DD"
    if (!attendance || typeof attendance !== "object" || !date) {
      return res.status(400).json({ message: "Invalid attendance or date" });
    }

    const results = [];

    for (const [teacherId, status] of Object.entries(attendance)) {
      if (!["P", "A"].includes(status)) continue;

      const teacherExists = await Teacher.findById(teacherId);
      if (!teacherExists) continue;

      // Receptionist: prevent re-mark for same date
      if (req.user.role === "receptionist") {
        const exists = await TeacherAttendance.findOne({ teacher: teacherId, date });
        if (exists) {
          continue; // skip, cannot update
        }
      }

      // Upsert attendance
      const record = await TeacherAttendance.findOneAndUpdate(
        { teacher: teacherId, date },
        {
          teacher: teacherId,
          date,
          status,
          markedBy: req.user.id,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      results.push(record);
    }

    res.json({ message: "Attendance saved successfully", attendance: results });
  } catch (err) {
    console.error("Teacher attendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTeachersAttendance = async (req, res) => {
  try {
    const { date } = req.query; // "YYYY-MM-DD"
    if (!date) return res.status(400).json({ message: "Date is required" });

    const attendance = await TeacherAttendance.find({ date }).populate(
      "teacher",
      "firstName lastName email department"
    );

    res.json(attendance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Check if date is locked (for receptionist)
exports.isDateLocked = async (req, res) => {
  try {
    const { date } = req.params;
    if (!date) return res.status(400).json({ message: "Date is required" });

    const exists = await TeacherAttendance.findOne({ date });
    res.json({ locked: !!exists });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
