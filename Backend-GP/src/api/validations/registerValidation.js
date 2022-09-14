const validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function ValidateRegisterInput(userData) {
	let errors = {};

	userData.name = !isEmpty(userData.name) ? userData.name : "";
	userData.email = !isEmpty(userData.email) ? userData.email : "";
	userData.password = !isEmpty(userData.password) ? userData.password : "";
	userData.nationalId = !isEmpty(userData.nationalId)
		? userData.nationalId
		: "";

	if (!validator.isLength(userData.name, { min: 2, max: 30 })) {
		errors.name = "Name must be between 2 and 30 characters";
	}
	if (!validator.isLength(userData.password, { min: 8, max: 50 })) {
		errors.password = "Password must be between 2 and 30 characters";
	}
	if (userData.password.toLowerCase().includes("password")) {
		errors.password = 'Password cannot contain "password"';
	}
	if (!validator.isEmail(userData.email)) {
		errors.email = "Email is not valid";
	}
	if (!validator.isLength(userData.nationalId, { min: 14, max: 14 })) {
		errors.nationalId = "National Id Must be 14 numbers";
	}

	if (isEmpty(userData.name)) {
		errors.name = "Name is required";
	}
	if (isEmpty(userData.email)) {
		errors.Email = "ُEmail is required";
	}
	if (isEmpty(userData.nationalId)) {
		errors.nationalId = "National-id is required";
	}
	if (isEmpty(userData.password)) {
		errors.password = "Password is required";
	}
	if (isEmpty(userData.password)) {
		errors.confirmPassword = "Password is required";
	}
	if (isEmpty(userData.email)) {
		errors.email = "Email is required";
	}
	if (isEmpty(userData.phone)) {
		errors.phone = "Phone is required";
	}
	return { errors, isValid: isEmpty(errors) };
};
