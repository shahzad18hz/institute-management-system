const mongoose = require("mongoose");

const leadsSchema = new mongoose.Schema(
  {
    name: {
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

    source: {
      type: String,
      enum: ["Facebook", "Instagram", "Walk-in"],
      required: true,
    },

    status: {
      type: String,
      enum: ["new", "warm", "hot", "admitted", "not_interested"],
      default: "new",
      required: true,
    },

    followupDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lead" , leadsSchema);