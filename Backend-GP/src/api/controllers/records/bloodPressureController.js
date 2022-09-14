const BloodPressure = require("../../models/BloodPressure");
var mongoose = require("mongoose");
//Validation
const ValidateBloodPressureInput = require("../../validations/bloodPressureValidation");

module.exports = {
  bloodPressureDetails: async (req, res) => {
    try {
      const bloodPressure = await BloodPressure.findById(req.params.id);
      if (!bloodPressure) {
        res.status(404).json({ error: "not found" });
      }
      res.send(bloodPressure);
    } catch (error) {
      res.json(error);
    }
  },
  // @route   update bloodPressure
  // @desc    User records(bloodPressure)
  // @access  private
  updateBloodPressureById: async (req, res) => {
    const { errors, isValid } = ValidateBloodPressureInput(req.body);
    if (!isValid) {
      return res.status(400).json({ errors });
    }
    try {
      const bloodPressure = await BloodPressure.findById(req.params.id);
      if (!bloodPressure) {
        res.status(404).json({ error: "not found" });
      }
      Object.assign(bloodPressure, req.body);
      bloodPressure.save();
      res.send(bloodPressure);
    } catch (error) {
      res.json(error);
    }
  },
  // @route   POST BloodPressure
  // @desc    User records(BloodPressure)
  // @access  private
  addBloodPressure: async (req, res) => {
    const { errors, isValid } = ValidateBloodPressureInput(req.body);

    if (!isValid) {
      return res.status(400).json({ errors });
    }
    try {
      const newBloodPressure = new BloodPressure({
        systolic: req.body.systolic,
        diastolic: req.body.diastolic,
        pulse: req.body.pulse,
        date: req.body.date,
        note: req.body.note,
        userId: req.user.id,
      });
      console.log(req.user.id);
      await newBloodPressure.save();
      res.json(newBloodPressure);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // @route   GET all BloodPressure
  // @desc    User records(BloodPressure)
  // @access  private
  BloodPressure: async (req, res) => {
    try {
      var BloodPressures;
      if (!req.body.patientId) {
        BloodPressures = await BloodPressure.find({
          userId: req.user._id,
        }).sort({ date: -1 });
      } else {
        console.log(req.body.patientId);
        var patientId = mongoose.Types.ObjectId(req.body.patientId);
        BloodPressures = await BloodPressure.find({
          userId: patientId,
        }).sort({ date: -1 });
      }
      if (BloodPressures.length === 0) {
        return res
          .status(404)
          .json({ noBloodPressurefound: "No BloodPressure found" });
      }
      res.json(BloodPressures);
    } catch (error) {
      res.json(error);
    }
  },
};
