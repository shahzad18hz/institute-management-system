const mongoose = require("mongoose");

const followUpSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ["message", "call", "reminder"],
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    course: { type: String, required: true },
    source: {
      type: String,
      enum: ["Facebook", "Instagram", "Walk-in"],
    },
    status: {
      type: String,
      enum: ["new", "cold", "warm", "hot", "admitted", "not_interested"],
      default: "new",
    },
    followUps: [followUpSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
