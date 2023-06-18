const mongoose = require("mongoose");

const needSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    cost: {
      type: Number,
      required: true,
      trim: true,
    },
    studentImage: {
      type: String,
      // required: true,
      trim: true,
    },
    itemImage: {
      type: String,
      // required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["UNPAID", "PAID"],
      default: "UNPAID",
    },
    _school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      require: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Need", needSchema);
