const Examination = require("../../models/Examination");

//Validation

const ValidateExaminationInput = require("../../validations/examinationValidation");

module.exports = {
  // @route   examination details
  // @desc    User records(examination)
  // @access  private

  examinationDetails: async (req, res) => {
    try {
      const examinations = await Examination.findById(req.params.id);
      if (!examinations) {
        res.status(404).json({ error: "not found" });
      }
      res.send(examinations);
    } catch (error) {
      res.json(error);
    }
  },
  // @route   update examination
  // @desc    User records(examination)
  // @access  private
  updateExaminationsById: async (req, res) => {
    const { errors, isValid } = ValidateExaminationInput(req.body);

    if (!isValid) {
      return res.status(400).json({ errors });
    }
    try {
      const examinations = await Examination.findById(req.params.id);
      if (!examinations) {
        res.status(404).json({ error: "not found" });
      }
      Object.assign(examinations, req.body);
      examinations.save();
      res.send(examinations);
    } catch (error) {
      res.json(error);
    }
  },

  // @route   POST Examination
  // @desc    User records(addExamination)
  // @access  private
  addExamination: async (req, res) => {
    const { errors, isValid } = ValidateExaminationInput(req.body);

    if (!isValid) {
      return res.status(400).json({ errors });
    }
    try {
      const newExamination = new Examination({
        symptoms: req.body.symptoms,
        diagnosis: req.body.diagnosis,
        note: req.body.note,
        userId: req.body.userId,
        doctorId: req.user.id,
        specialization: req.user.specialization,
      });

      await newExamination.save();
      res.json({ newExamination, spec: req.body.specialization });
    } catch (error) {
      res.json(error);
    }
  },

  // @route   GET all Examination
  // @desc    User records(Examination)
  // @access  private
  examinations: async (req, res) => {
    try {
      const examinations = await Examination.find().sort({ date: -1 });
      if (examinations.length === 0) {
        return res
          .status(404)
          .json({ noexaminationsfound: "No Examination found" });
      }

      res.json({ examinations });
    } catch (error) {
      res.json(error);
    }
  },

  // @route   GET Specialization Examinations
  // @desc    User records(Specialization Examination)
  // @access  private
  getSpecializationExaminations: async (req, res) => {
    try {
      const examinations = await Examination.find({
        specialization: req.user.specialization,
      }).sort({ date: -1 });
      if (examinations.length === 0) {
        return res
          .status(404)
          .json({ noexaminationsfound: "No Examination found" });
      }
      res.json({ examinations });
    } catch (error) {
      res.json(error);
    }
  },

  // @route   GET Specific Examinations
  // @desc    User records(Specific Examination)
  // @access  private
  getSpecificExaminations: async (req, res) => {
    const match = {};
    match.specialization = req.query.specialization;
    try {
      const examinations = await Examination.find({
        specialization: match.specialization,
      }).sort({ date: -1 });
      if (examinations.length === 0) {
        return res
          .status(404)
          .json({ noexaminationsfound: "No Examination found" });
      }
      res.json({ examinations });
    } catch (error) {
      res.json(error);
    }
  },
};
