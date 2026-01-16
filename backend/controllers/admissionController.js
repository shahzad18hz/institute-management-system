const Admission = require("../models/Admission");
const Fee = require("../models/Fee"); // ✅ ADD THIS

exports.createAdmission = async (req, res) => {
  try {
    const { fullname, cnic, email, phone, course, batch, feeplan, totalFee } =
      req.body;

    if (
      !fullname ||
      !cnic ||
      !email ||
      !phone ||
      !course ||
      !batch ||
      !feeplan ||
      !totalFee
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // CNIC duplicate check
    const existing = await Admission.findOne({ cnic });
    if (existing) {
      return res.status(400).json({ message: "CNIC already exists" });
    }

    // 🔥 Auto Roll Number
    const lastStudent = await Admission.findOne().sort({ rollNumber: -1 });
    const nextRollNumber = lastStudent ? lastStudent.rollNumber + 1 : 1;

    const newAdmission = new Admission({
      rollNumber: nextRollNumber,
      fullname,
      cnic,
      email,
      phone,
      course,
      batch,
      feeplan,
      totalFee,
    });

    await newAdmission.save();

    // ✅ AUTO CREATE FEE RECORD (SAFE)
    await Fee.create({
      student: newAdmission._id,
      totalFee: totalFee,
      paidAmount: 0,
      status: "Unpaid",
    });

    res.status(201).json({
      message: "Admission created successfully",
      admission: newAdmission,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
