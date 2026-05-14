const mongoose = require("mongoose");

const teacherAttendanceSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  date: { type: String, required: true }, // store as "YYYY-MM-DD" to avoid timezone issues
  status: { type: String, enum: ["P", "A"], required: true },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// Only 1 record per teacher per date
teacherAttendanceSchema.index({ teacher: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("TeacherAttendance", teacherAttendanceSchema);
