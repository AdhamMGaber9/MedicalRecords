const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/Auth");
const docAuth = require("../middlewares/docAuth");

//Import Example Controllers
const doctocrController = require("../controllers/doctorController");
//Example Routes
var messagebird = require("messagebird")("a6MIdVhuNdvMguF77jPTxtLVH");

//Import Example Controllers
const doctorController = require("../controllers/doctorController");
//Example Routes
router.post("/searchPatient", docAuth, doctorController.searchPatient);
router.post("/sendmail", doctorController.SendEmail);
router.post("/verify", doctorController.VerifyCode);

module.exports = router;
