const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function ValidateGlucoseInput(userData) {
  let errors = {};
  userData.type = !isEmpty(userData.type) ? userData.type : "";
  userData.result = !isEmpty(userData.result) ? userData.result : "";
  if (isEmpty(userData.type)) {
    errors.type = "Type field is required";
  }
  if (isEmpty(userData.result)) {
    errors.result = "Result field is required";
  }

  return { errors, isValid: isEmpty(errors) };
};
