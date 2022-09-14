const Allergy = require("../models/Allergy");
const BloodPressure = require("../models/BloodPressure");
const Examination = require("../models/Examination");
const Glucose = require("../models/Glucose");
const Surgery = require("../models/Surgery");
const Prescription = require("../models/Prescription");
const { ObjectId } = require("mongoose");

//Validation
const ValidateAllergyInput = require("../validations/allergyValidation");
const ValidateBloodPressureInput = require("../validations/bloodPressureValidation");
const ValidateExaminationInput = require("../validations/examinationValidation");
const ValidateGlucoseInput = require("../validations/glucoseValidation");
const ValidatePrescriptionInput = require("../validations/prescriptionValidation");
const ValidateSurgeryInput = require("../validations/surgeryValidation");

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
        type: req.body.type,
        note: req.body.note,
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

  // @route   bloodPressure details
  // @desc    User records(bloodPressure)
  // @access  private

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
      const BloodPressures = await BloodPressure.find().sort({ date: -1 });
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
    try {
      const newExamination = new Examination({
        symptomps: req.body.symptomps,
        diagnosis: req.body.diagnosis,
        note: req.body.note,
        userId: req.user.id,
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

  // @route   glucose details
  // @desc    User records(glucose)
  // @access  private

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
        userId: req.user.id,
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
    } catch (error) {
      res.json(error);
    }
  },

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

  // @route   prescription details
  // @desc    User records(prescription)
  // @access  private

  prescriptionDetails: async (req, res) => {
    try {
      const prescription = await Surgery.findById(req.params.id);
      if (!prescription) {
        res.status(404).json({ error: "not found" });
      }
      res.send(prescription);
    } catch (error) {
      res.json(error);
    }
  },
  // @route   update prescription
  // @desc    User records(prescription)
  // @access  private
  updatePrescriptionById: async (req, res) => {
    const { errors, isValid } = ValidatePrescriptionInput(req.body);

    if (!isValid) {
      return res.status(400).json({ errors });
    }
    try {
      const prescription = await Prescription.findById(req.params.id);
      if (!prescription) {
        res.status(404).json({ error: "not found" });
      }
      Object.assign(prescription, req.body);
      prescription.save();
      res.send(prescription);
    } catch (error) {
      res.json(error);
    }
  },
  // @route   POST prescription
  // @desc    User records(addprescription)
  // @access  private
  addPrescription: async (req, res) => {
    const { errors, isValid } = ValidatePrescriptionInput(req.body);

    if (!isValid) {
      return res.status(400).json({ errors });
    }
    try {
      const newPrescription = new Prescription({
        drugName: req.body.drugName,
        dose: req.body.dose,
        note: req.body.note,
        examinationId: req.body.examinationId,
      });

      await newPrescription.save();

      res.json(newPrescription);
    } catch (error) {
      res.json(error);
    }
  },

  // @route   GET all Prescriptions
  // @desc    User records(Prescriptions)
  // @access  private
  prescriptions: async (req, res) => {
    try {
      const prescriptions = await Prescription.find().sort({ date: -1 });
      if (prescriptions.length === 0) {
        return res
          .status(404)
          .json({ noprescriptionsfound: "No prescription found" });
      }
      res.json(prescriptions);
    } catch (error) {
      res.json(error);
    }
  },
};
