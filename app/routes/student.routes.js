const express = require("express");
const router = express.Router();
const csvController = require("../controllers/csv.controller");
const upload = require("../middlewares/upload");

let routes = (app) => {
  router.post("/upload", upload.single("file"), csvController.upload);
  router.get("/students", csvController.getStudents);
  router.get("/students/:id/result", csvController.getStudentsID);

  app.use("/api/csv", router);
};

module.exports = routes;