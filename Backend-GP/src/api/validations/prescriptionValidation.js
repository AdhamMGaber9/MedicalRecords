const isEmpty = require("./isEmpty");

module.exports = function ValidatePrescriptionInput(userData) {
  let errors = {};
  userData.drugName = !isEmpty(userData.drugName) ? userData.drugName : "";
  userData.dose = !isEmpty(userData.dose) ? userData.dose : "";
  if (isEmpty(userData.drugName)) {
    errors.drugName = "drugName is required";
  }
  if (isEmpty(userData.dose)) {
    errors.dose = "dose is required";
  }
  return { errors, isValid: isEmpty(errors) };
};
