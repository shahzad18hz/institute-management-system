const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const teacherSchema = new mongoose.Schema(
  {
    // 🔐 Login
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "teacher",
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    // 👤 Personal
    firstName: String,
    lastName: String,
    gender: String,
    dob: Date,
    address: String,

    // 📞 Contact
    mobile: String,
    emergencyContact: String,

    // 🎓 Institute / Professional
    employeeId: String,
    designation: String,
    department: String,
    coursesAssigned: [String], // 🔥 kis course ke liye hire
    joiningDate: Date,
    experience: Number,
    employmentType: String, // full-time / part-time

    // 🔗 Admin reference
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

// 🔐 Hash password
teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("Teacher", teacherSchema);
