const mongoose = require("mongoose");
const prescriptionSchema = new mongoose.Schema({
  drugName: {
    type: String,
    required: true,
  },
  dose: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  examinationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Examination",
  },
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
