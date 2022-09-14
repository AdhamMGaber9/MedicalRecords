const Allergy = require("../../models/Allergy");

//Validation
const ValidateAllergyInput = require("../../validations/allergyValidation");

module.exports = {
  // @route   allergy details
  // @desc    User records(allergy)
  // @access  private

  allergyDetails: async (req, res) => {
    try {
      const allergy = await Allergy.findById(req.params.id);
      if (!allergy) {
        res.status(404).json({ error: "not found" });
      }
      res.send(allergy);
    } catch (error) {
      res.json(error);
    }
  },
  // @route   update allergy
  // @desc    User records(allergy)
  // @access  private
  updateAllergyById: async (req, res) => {
    const { errors, isValid } = ValidateAllergyInput(req.body);

    if (!isValid) {
      return res.status(400).json({ errors });
    }
    try {
      const allergy = await Allergy.findById(req.params.id);
      if (!allergy) {
        res.status(404).json({ error: "not found" });
      }
      Object.assign(allergy, req.body);
      allergy.save();
      res.send(allergy);
    } catch (error) {
      res.json(error);
    }
  },
  // @route   POST allergy
  // @desc    User records(allergy)
  // @access  private
  addAllergy: async (req, res) => {
    const { errors, isValid } = ValidateAllergyInput(req.body);

    if (!isValid) {
      return res.status(400).json({ errors });
    }
    try {
      const newAllergy = new Allergy({
        name: req.body.name,
        userId: req.user.id,
      });

      await newAllergy.save();
      res.json(newAllergy);
    } catch (error) {
      res.json(error);
    }
  },

  // @route   GET all allergies
  // @desc    User records(allergy)
  // @access  private
  allergies: async (req, res) => {
    try {
      const allergies = await Allergy.find().sort({ date: -1 });
      if (allergies.length === 0) {
        return res.status(404).json({ noallergiesfound: "no allergies found" });
      }
      res.json(allergies);
    } catch (error) {
      res.json(error);
    }
  },
};
