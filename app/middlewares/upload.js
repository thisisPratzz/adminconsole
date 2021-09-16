const multer = require("multer");
var fs = require('fs');


const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")||file.mimetype.includes("excel")) {
    cb(null, true);
  } else {
    cb("Please upload only csv file.", false);
  }
};
var storage = multer.diskStorage({

  destination: (req, file, cb) => {
    const dir = './temp/';
   
    fs.exists(dir, exist => {
      if (!exist) {
        return fs.mkdir(dir, error => cb(error, dir))
      }
      return cb(null, dir)
      })

  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-pratik-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: csvFilter });
module.exports = uploadFile;