const Glucose = require("../../models/Glucose");

//Validation

const ValidateGlucoseInput = require("../../validations/glucoseValidation");

module.exports = {
  glucoseDetails: async (req, res) => {
    try {
      const glucose = await Glucose.findById(req.params.id);
      if (!glucose) {
        res.status(404).json({ error: "not found" });
      }
      res.send(glucose);
    } catch (error) {
      res.json(error);
    }
  },
  // @route   update glucose
  // @desc    User records(glucose)
  // @access  private
  updateGlucoseById: async (req, res) => {
    const { errors, isValid } = ValidateGlucoseInput(req.body);

    if (!isValid) {
      return res.status(400).json({ errors });
    }
    try {
      const glucose = await Glucose.findById(req.params.id);
      if (!glucose) {
        res.status(404).json({ error: "not found" });
      }
      Object.assign(glucose, req.body);
      glucose.save();
      res.send(glucose);
    } catch (error) {
      res.json(error);
    }
  },
  // @route   POST Glucose
  // @desc    User records(addGlucose)
  // @access  private
  addGlucose: async (req, res) => {
    const { errors, isValid } = ValidateGlucoseInput(req.body);

    if (!isValid) {
      return res.status(400).json({ errors });
    }
    try {
      const newGlucose = new Glucose({
        type: req.body.type,
        result: req.body.result,
        note: req.body.note,
        userId: req.body.id,
        doctorId: req.user.id,
      });

      await newGlucose.save();

      res.json(newGlucose);
    } catch (error) {
      res.json(error);
    }
  },

  // @route   GET all Glucose
  // @desc    User records(Glucose)
  // @access  private
  glucoses: async (req, res) => {
    try {
      const glucoses = await Glucose.find().sort({ date: -1 });
      if (glucoses.length === 0) {
        return res.status(404).json({ noglucosesfound: "No Glucose found" });
      }
      res.json(glucoses);
      console.log(glucoses);
    } catch (error) {
      res.json(error);
    }
  },
};
