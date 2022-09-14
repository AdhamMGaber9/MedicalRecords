// Login & Register
const bcrypt = require("bcryptjs");
const User = require("../models/User");
//Validation
const ValidateRegisterInput = require("../validations/registerValidation");
const ValidateLoginInput = require("../validations/loginValidation");
const ValidateUpdateInput = require("../validations/updateValidation");

module.exports = {
  // @route   POST user/register
  // @desc    User registeration
  // @access  Public
  register: async (req, res) => {
    //Start Validation
    const { errors, isValid } = ValidateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json({ errors });
    }
    //End Validation

    try {
      //check for exist email or national id
      const isExist = await User.findOne({
        $or: [
          ({ email: req.body.email },
          {
            nationalId: req.body.nationalId,
          }),
        ],
      });

      if (isExist && isExist.email === req.body.email) {
        errors.email = "Email is already exist";
        return res.status(400).json({ errors });
      } else if (isExist && isExist.nationalId === req.body.nationalId) {
        errors.nationalId = "National id is already exist";
        return res.status(400).json({ errors });
      }

      var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        nationalId: req.body.nationalId,
        phone: req.body.phone,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        role: req.body.role,
      });
      console.log(newUser);
      if (req.body.role === 1) {
        newUser = new User({
          ...newUser._doc,
          specialization: req.body.specialization,
          syndicateImg: req.body.syndicateImg,
          nationalIdImg: req.body.nationalIdImg,
        });
      }

      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.json(error);
    }
  },
  // @route   POST user/login
  // @desc    User Login By Email or National ID
  // @access  Public

  login: async (req, res) => {
    const userData = {
      email: req.body.email,
      password: req.body.password,
    };

    //start validation
    const { errors, isValid } = ValidateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json({ errors });
    }
    //end validation

    try {
      const user = await User.findOne({
        email: userData.email,
      });
      if (!user) {
        errors.user = "User not found";
        return res.status(404).json({ errors });
      }

      const isMatch = await bcrypt.compare(userData.password, user.password);
      if (!isMatch) {
        errors.password = "Password incorrect";
        return res.status(404).json({ errors });
      }
      const token = await user.generateAuthToken();
      res.json({ user, token });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  // @route   GET user/me
  // @desc    My Profile Info
  // @access  Private
  profile: (req, res) => {
    res.json({ myProfile: req.user });
  },
  logout: async (req, res) => {
    req.user.token = "";
    await req.user.save();

    res.json({ success: true });
  },

  // @route   PATCH user/update
  // @desc    Update Profile Info
  // @access  Private
  update: async (req, res) => {
    // define possible update operation
    const allowedUpdate = ["email", "phone", "birthdate", "gender", "password"];
    const requestedUpdate = Object.keys(req.body);
    console.log(requestedUpdate);
    const isValidOperation = requestedUpdate.every((update) =>
      allowedUpdate.includes(update)
    );
    if (isValidOperation)
      return res.status(400).json({ error: "not supported update" });
    // end of check possible operation

    // start input validation
    const { errors, isValid } = ValidateUpdateInput(req.body, requestedUpdate);

    if (!isValid) return res.status(400).json({ errors });
    //end input validation

    //start actual update process
    try {
      requestedUpdate.forEach(
        (update) => (req.user[update] = req.body[update])
      );

      await req.user.save();
      res.json(req.user);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
