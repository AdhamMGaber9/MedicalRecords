const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function ValidateBloodPressureInput(data) {
  let errors = {};

  data.systolic = !isEmpty(data.systolic) ? data.systolic : "";
  data.diastolic = !isEmpty(data.diastolic) ? data.diastolic : "";
  data.pulse = !isEmpty(data.pulse) ? data.pulse : "";

  if (isEmpty(data.systolic)) {
    errors.systolic = "Systolicis is required";
  }
  if (isEmpty(data.diastolic)) {
    errors.diastolic = "Diastolic is required";
  }
  if (isEmpty(data.pulse)) {
    errors.pulse = "Pulse is required";
  }
  return { errors, isValid: isEmpty(errors) };
};
