const validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function ValidateUpdateInput(userData, updates) {
  let errors = {};

  updates.forEach((update) => {
    userData[update] = !isEmpty(userData[update]) ? userData[update] : "";
    if (userData[update] === "") {
      errors[update] = `${update} is required`;
    }
    if (update == "email") {
      if (!validator.isEmail(userData[update]))
        errors[update] = "Email is not valid";
    }
    if (update == "password") {
      if (userData[update].toLowerCase().includes("password")) {
        errors[update] = 'Password cannot contain "password"';
      }
    }
  });

  return { errors, isValid: isEmpty(errors) };
};
