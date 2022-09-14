const experss = require("express");
require("./config/DatabaseConnection");
const app = experss();
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions)); // Use this after the variable declaration
//Import Example exampleRoute
const exampleRoute = require("./api/routes/example");
const doctorRoute = require("./api/routes/doctorRoute");
const authRoute = require("./api/routes/authRoute");
const recordsRoute = require("./api/routes/recordsRoute");
const adminRoute = require("./api/routes/adminRoute");

// Example use route
app.use("/example", exampleRoute);
app.use("/user", authRoute);
app.use("/doctor", doctorRoute);
app.use("/records", recordsRoute);
app.use("/admin", adminRoute);
app.use("/", doctorRoute);

// Running Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port :", port);
});
