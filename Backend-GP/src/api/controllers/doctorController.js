const Vonage = require("@vonage/server-sdk");
const axios = require("axios");
const User = require("../models/User");
const vonage = new Vonage({
  apiKey: "e0734c13",
  apiSecret: "qtTM60Te0gkFsfAD",
});

module.exports = {
  searchPatient: async (req, res) => {
    try {
      const user = await User.findOne({ nationalId: req.body.nationalId });
      if (!user)
        return res
          .status(404)
          .json({ error: "check the national id then try again" });

      res.status(200).json({ patient: user });
    } catch (e) {
      res.status(500).send(e);
    }
  },
  SendEmail: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.body.id, {
        verifyCode: Math.floor(100000 + Math.random() * 900000),
      });
      await user.save();
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  },
  VerifyCode: async (req, res) => {
    try {
      const user = await User.findById(req.body.id);
      if (user.verifyCode == req.body.check) {
        res.status(200).json({ verify: true, id: user._id, name: user.name });
      } else {
        res.json({ verify: false });
      }
    } catch (error) {}
  },
};
