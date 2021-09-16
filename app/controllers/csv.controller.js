 const db = require("../models");
 const Student = db.students;

const fs = require("fs");
const csv = require("fast-csv");
const Path = require('path');

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let tutorials = [];
  //  let path ="./uploads/" + req.file.filename;
    const path = Path.join("./temp/", req.file.filename);
    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        tutorials.push(row);
      })
       .on("end", () => {
        Student.bulkCreate(tutorials)
          .then(() => {
            res.status(200).send({
              message:
                "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
       }
      );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const getStudents = (req, res) => {

    var ispassed;
    if(req.query.resultStatus=='passed'){
        ispassed=true;
    }
    else if(req.query.resultStatus=='failed'){
        ispassed=false;
    }else{
        res.status(500).send({
            message:
             "students?resultStatus=passed/failed",
          })
    }
    Student.findAll({
    where: {
      passed: ispassed,   ///students?resultStatus=passed/failed
    }
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

const getStudentsID = (req, res) => {

    Student.findByPk(req.params.id)
      .then((data) => {
        res.send(data.passed);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  };


module.exports = {
  upload,
  getStudents,
  getStudentsID

};