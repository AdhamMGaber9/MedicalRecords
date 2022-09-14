const mongoose = require("mongoose");
const drugSchema = new mongoose.Schema({
      medicine_name: {
        type: String,
      },
      medicine_ingredients: {
        type: String,
      },
      medicine_shape: {
        type: String,
      },
      
      medicine_color: {
        type: String,
      },
      medicine_description: {
        type: String,
      }
});

const Drug = mongoose.model("Drug", drugSchema);

module.exports = Drug;
