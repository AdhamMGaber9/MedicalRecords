const validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function ValidateLoginInput(userData) {
  let errors = {};

  userData.email = !isEmpty(userData.email) ? userData.email : "";
  userData.password = !isEmpty(userData.password) ? userData.password : "";

  if (!isEmpty(userData.email) && !validator.isEmail(userData.email)) {
    errors.email = "Email is not valid";
  }

  if (!isEmpty(userData.email) && !validator.isEmail(userData.email)) {
    errors.email = "Email is not valid";
  }

  if (isEmpty(userData.password)) {
    errors.password = "Password is required";
  }

  return { errors, isValid: isEmpty(errors) };
};
