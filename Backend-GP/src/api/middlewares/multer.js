const multer = require("multer");

//set storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "nationalIdImg") {
      cb(null, "uploads/natPhotos");
    }
    if (file.fieldname === "syndicateImg") {
      cb(null, "uploads/syndicatePhotos");
    }
  },
  filename: function (req, file, cb) {
    var ext = file.originalname.substr(file.originalname.lastIndexOf("."));
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

module.exports = store = multer({ storage: storage });
