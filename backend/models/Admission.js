const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
  rollNumber: {
    type: Number,
    unique: true,
    required: true,
  },

  fullname: {
    type: String,
    required: true,
  },

  cnic: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  course: {
    type: String,
    enum: ["Web Development", "Graphic Designing", "Digital Marketing", "SEO"],
    required: true,
  },

  batch: {
    type: String,
    required: true,
  },

  feeplan: {
    type: String,
    required: true,
  },

  totalFee: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Admission", admissionSchema);
