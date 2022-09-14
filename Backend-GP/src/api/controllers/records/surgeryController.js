const Surgery = require("../../models/Surgery");

//Validation
const ValidateSurgeryInput = require("../../validations/surgeryValidation");

module.exports = {
  // @route   surgery details
  // @desc    User records(surgery)
  // @access  private

  surgeryDetails: async (req, res) => {
    try {
      const surgery = await Surgery.findById(req.params.id);
      if (!surgery) {
        res.status(404).json({ error: "not found" });
      }
      res.send(surgery);
    } catch (error) {
      res.json(error);
    }
  },
  // @route   update surgery
  // @desc    User records(surgery)
  // @access  private
  updateSurgeryById: async (req, res) => {
    const { errors, isValid } = ValidateSurgeryInput(req.body);

    if (!isValid) {
      return res.status(400).json({ errors });
    }
    try {
      const surgery = await Surgery.findById(req.params.id);
      if (!surgery) {
        res.status(404).json({ error: "not found" });
      }
      Object.assign(surgery, req.body);
      surgery.save();
      res.send(surgery);
    } catch (error) {
      res.json(error);
    }
  },
  // @route   POST Surgery
  // @desc    User records(addSurgery)
  // @access  private
  addSurgery: async (req, res) => {
    const { errors, isValid } = ValidateSurgeryInput(req.body);

    if (!isValid) {
      return res.status(400).json({ errors });
    }
    try {
      const newSurgery = new Surgery({
        name: req.body.name,
        doctorName: req.body.doctorName,
        location: req.body.location,
        userId: req.user.id,
      });

      await newSurgery.save();

      res.json(newSurgery);
    } catch (error) {
      res.json(error);
    }
  },

  // @route   GET all surgeries
  // @desc    User records(surgeries)
  // @access  private
  surgeries: async (req, res) => {
    try {
      const surgeries = await Surgery.find().sort({ date: -1 });
      if (surgeries.length === 0) {
        return res.status(404).json({ nosurgeriesfound: "No Surgery found" });
      }
      res.json(surgeries);
    } catch (error) {
      res.json(error);
    }
  },
};
