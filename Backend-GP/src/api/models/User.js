const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  nationalId: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  birthdate: {
    type: Date,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },

  isActive: {
    type: Boolean,
    default: false,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
  specialization: {
    type: String,
    trim: true,
  },
  syndicateImg: {
    type: String,
    trim: true,
  },
  nationalIdImg: {
    type: String,
    trim: true,
  },
  verifyCode: {
    type: String,
    default: "",
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.virtual("examinations", {
  ref: "Examination",
  localField: "_id",
  foreignField: "userId",
});
UserSchema.virtual("bloodpressures", {
  ref: "BloodPressure",
  localField: "_id",
  foreignField: "userId",
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  return userObject;
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      birthdate: user.birthdate,
      gender: user.gender,
      role: user.role,
    },
    "huadab^2zedo"
  );
  user.token = token;
  await user.save();

  return token;
};

//hash password
UserSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    //this for document
    this.password = await bcryptjs.hash(this.password, 8);
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
