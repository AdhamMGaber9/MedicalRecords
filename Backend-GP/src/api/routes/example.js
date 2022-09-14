const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/Auth");


//Import Example Controllers
const exampleController = require("../controllers/exampleController");

router.get("/drug",Auth,exampleController.getdrug);


// //Example Routes
// router.get("/", exampleController.get);
// router.post("/", exampleController.post);

module.exports = router;
