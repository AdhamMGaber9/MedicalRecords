const isEmpty = require("./isEmpty");

module.exports = function ValidateSurgeryInput(userData) {
  let errors = {};
  userData.name = !isEmpty(userData.name) ? userData.name : "";
  userData.doctorName = !isEmpty(userData.doctorName)
    ? userData.doctorName
    : "";
  if (isEmpty(userData.name)) {
    errors.name = "Name field is required";
  }
  if (isEmpty(userData.doctorName)) {
    errors.doctorName = "Doctor Name field is required";
  }
  return { errors, isValid: isEmpty(errors) };
};
