const User = require("../models/User");

module.exports = {
  // @route   GET All Requests
  // @desc    GET Pending Requests
  // @access  private
  allRequests: async (req, res) => {
    try {
      const user = await User.find({ isActive: false });
      res.json({ user });
    } catch (error) {
      res.json(error);
    }
  },
  // @route   GET  Request Details
  // @desc    GET Pending Request Details
  // @access  private
  requestDetails: async (req, res) => {
    const match = {};
    match.id = req.query.id;
    try {
      const user = await User.find({ isActive: false, _id: match.id });
      if (user.length === 0)
        return res.status(404).json({ User: "User is not found" });
      res.json({ user });
    } catch (error) {
      res.json(error);
    }
  },

  // @route   Post accept Request
  // @desc    Post accept doctors Request
  // @access  private
 acceptRequest: async (req, res) => {
    try {
      const user =  await User.findByIdAndUpdate(req.params.id,{isActive:true})
      res.json({user});
    } catch (error) {
      res.json(error);
    }
  },

  // @route   Post reject Request
  // @desc    Post reject doctors Request
  // @access  private
  rejectRequest: async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id,{role:0})
    res.json({user});
  } catch (error) {
    res.json(error);
  }
},
};
