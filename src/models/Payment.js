const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED"],
      default: "PENDING"
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      require: true
    },
    needs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Need",
      require: true
    }],
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      require: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);