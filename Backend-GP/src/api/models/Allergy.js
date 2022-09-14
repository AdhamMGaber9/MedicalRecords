const mongoose = require("mongoose");
const allergySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Allergy = mongoose.model("Allergy", allergySchema);

module.exports = Allergy;
