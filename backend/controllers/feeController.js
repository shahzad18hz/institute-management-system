const Fee = require("../models/Fee");

// ✅ ALL STUDENTS FEES
exports.getAllFees = async (req, res) => {
  try {
    const fees = await Fee.find().populate("student");
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ONE STUDENT FEE
exports.getFeeByStudent = async (req, res) => {
  try {
    const fee = await Fee.findOne({ student: req.params.studentId }).populate("student");
    if (!fee) return res.status(404).json({ message: "Fee not found" });
    res.json(fee);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ADD PAYMENT
exports.addPayment = async (req, res) => {
  try {
    const { studentId, amount } = req.body;

    const fee = await Fee.findOne({ student: studentId });
    if (!fee) return res.status(404).json({ message: "Fee not found" });

    fee.paidAmount += Number(amount);
    fee.history.push({ amount });

    if (fee.paidAmount >= fee.totalFee) fee.status = "Paid";
    else fee.status = "Partial";

    await fee.save();
    res.json(fee);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
