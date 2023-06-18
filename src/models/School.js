const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
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
    schoolName: {
      type: String,
      required: true,
      trim: true
    },
    schoolAddress: {
      type: String,
      required: true,
      trim: true
    },
    principleName: {
      type: String,
      required: true,
      trim: true,
    },
    relation: {
      type: String,
      required: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true
    },
    bankName: {
        type: String,
        required: true,
        trim: true
    },
    routingNumber: {
        type: String,
        required: true,
        trim: true
    },
    accountName: {
        type: String,
        required: true,
        trim: true,
    },
    accountNumber: {
        type: String,
        required: true,
        trim: true
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

module.exports = mongoose.model("School", schoolSchema);
