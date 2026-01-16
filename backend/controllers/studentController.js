const Admission = require("../models/Admission");
const Attendance = require("../models/Attendance");

exports.getAllStudents = async (req, res) => {
  try {
    const { date } = req.query;

    // 1️⃣ Get all students
    const students = await Admission.find()
      .select("fullname rollNumber course batch")
      .sort({ rollNumber: 1 });

    if (students.length === 0) {
      return res.status(200).json({
        count: 0,
        students: [],
      });
    }

    // 2️⃣ Default attendance = Absent
    let result = students.map((s) => ({
      _id: s._id,
      fullname: s.fullname,
      rollNumber: s.rollNumber,
      course: s.course,
      batch: s.batch,
      status: "A",
    }));

    // 3️⃣ If date provided → map attendance
    if (date) {
      const attendance = await Attendance.find({ date });

      const map = {};
      attendance.forEach((a) => {
        map[a.student.toString()] = a.status;
      });

      result = result.map((s) => ({
        ...s,
        status: map[s._id.toString()] || "A",
      }));
    }

    res.status(200).json({
      count: result.length,
      students: result,
    });
  } catch (error) {
    console.error("Student fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
