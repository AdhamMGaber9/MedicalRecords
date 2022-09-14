const Prescription = require("../../models/Prescription");

//Validation
const ValidatePrescriptionInput = require("../../validations/prescriptionValidation");

module.exports = {
  // @route   prescription details
  // @desc    User records(prescription)
  // @access  private

  prescriptionDetails: async (req, res) => {
    try {
      const prescription = await Prescription.findById(req.params.id);
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
        // doctorId: req.user.id   // add it or not ???
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
