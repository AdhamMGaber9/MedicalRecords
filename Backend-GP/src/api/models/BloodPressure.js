const mongoose = require("mongoose");
const bloodPressureSchema = new mongoose.Schema({
  systolic: {
    type: Number,
    required: true,
  },
  diastolic: {
    type: Number,
    required: true,
  },
  pulse: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default:Date.now
  },
  note: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const BloodPressure = mongoose.model("BloodPressure", bloodPressureSchema);

module.exports = BloodPressure;
