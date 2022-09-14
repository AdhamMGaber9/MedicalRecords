const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/Auth");

const adminController = require("../controllers/adminController");

router.get("/allRequests", Auth, adminController.allRequests);
router.get("/requestDetails", Auth, adminController.requestDetails);
router.patch("/acceptRequest/:id", Auth, adminController.acceptRequest);
router.patch("/rejectRequest/:id", Auth, adminController.rejectRequest);

module.exports = router;
