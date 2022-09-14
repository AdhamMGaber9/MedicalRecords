const isEmpty = require("./isEmpty");

module.exports = function ValidateAllergyInput(userData) {
  let errors = {};
  if (isEmpty(userData.name)) {
    errors.name = "name is required";
  }
  return { errors, isValid: isEmpty(errors) };
};
