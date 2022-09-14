const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/Auth");

//Import recordsController Controllers
const allergyController = require("../controllers/records/allergyController");
const bloodPressureController = require("../controllers/records/bloodPressureController");
const examinationController = require("../controllers/records/examinationController");
const glucoseController = require("../controllers/records/glucoseController");
const surgeryController = require("../controllers/records/surgeryController");
const prescriptionController = require("../controllers/records/prescriptionController");

//Records Routes
//Allergy
router.patch("/allergies/edit/:id", Auth, allergyController.updateAllergyById);
router.get("/allergies/:id", Auth, allergyController.allergyDetails);
router.get("/allergies", Auth, allergyController.allergies);
router.post("/addAllergy", Auth, allergyController.addAllergy);

//BloodPressure
router.patch(
  "/BloodPressure/edit/:id",
  Auth,
  bloodPressureController.updateBloodPressureById
);
router.get(
  "/BloodPressure/:id",
  Auth,
  bloodPressureController.bloodPressureDetails
);
router.post("/BloodPressure", Auth, bloodPressureController.BloodPressure);
router.post(
  "/addBloodPressure",
  Auth,
  bloodPressureController.addBloodPressure
);

//Examination
router.patch(
  "/examination/edit/:id",
  Auth,
  examinationController.updateExaminationsById
);
router.get("/examination/:id", Auth, examinationController.examinationDetails);
router.get("/examinations", Auth, examinationController.examinations);
router.get(
  "/getSpecificExaminations",
  Auth,
  examinationController.getSpecificExaminations
);
router.get(
  "/getSpecializationExaminations",
  Auth,
  examinationController.getSpecializationExaminations
);
router.post("/addExamination", Auth, examinationController.addExamination);

//Glucose
router.patch("/glucose/edit/:id", Auth, glucoseController.updateGlucoseById);
router.get("/glucose/:id", Auth, glucoseController.glucoseDetails);
router.get("/glucoses", Auth, glucoseController.glucoses);
router.post("/addGlucose", Auth, glucoseController.addGlucose);

//Surgery
router.patch("/surgery/edit/:id", Auth, surgeryController.updateSurgeryById);
router.get("/surgery/:id", Auth, surgeryController.surgeryDetails);
router.get("/surgeries", Auth, surgeryController.surgeries);
router.post("/addSurgery", Auth, surgeryController.addSurgery);

//Prescription
router.patch(
  "/prescription/edit/:id",
  Auth,
  prescriptionController.updatePrescriptionById
);
router.get(
  "/prescription/:id",
  Auth,
  prescriptionController.prescriptionDetails
);
router.get("/prescriptions", Auth, prescriptionController.prescriptions);
router.post("/addPrescription", Auth, prescriptionController.addPrescription);

module.exports = router;
