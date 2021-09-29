const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;




  exports.GetALL = (req, res) => {
    User.findAll({
      attributes: {exclude: ['password']}
    }).then((data) => {
      data.forEach(function(v){ delete v.password });

                res.send(data);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };