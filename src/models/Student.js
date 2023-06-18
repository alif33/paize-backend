const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    userName: {
      type: String,
      // required: true,
      // trim: true,
      // unique: true,
      // index: true,
      // lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
    },
    graduationYear: {
      type: String,
      required: true,
    },
    _school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      require: true
    },
    image: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum : ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);