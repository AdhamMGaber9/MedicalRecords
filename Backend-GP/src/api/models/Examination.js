const mongoose = require("mongoose");
const examinationSchema = new mongoose.Schema({
  symptoms: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  specialization: {
    type: mongoose.Schema.Types.String,
    ref: "User",
  },
});

const Examination = mongoose.model("Examination", examinationSchema);

module.exports = Examination;
