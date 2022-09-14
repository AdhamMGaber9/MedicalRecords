const isEmpty = require("./isEmpty");

module.exports = function ValidateExaminationInput(data) {
  let errors = {};
  data.symptoms = !isEmpty(data.symptoms) ? data.symptoms : "";
  data.diagnosis = !isEmpty(data.diagnosis) ? data.diagnosis : "";
  if (isEmpty(data.symptoms)) {
    errors.symptoms = "Symptoms field is required";
  }

  if (isEmpty(data.diagnosis)) {
    errors.diagnosis = "Diagnosis field is required";
  }
  return { errors, isValid: isEmpty(errors) };
};
