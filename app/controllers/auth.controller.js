const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.email,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role:req.body.role
  })
    .then(user => {
        res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
      role:"user"
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
        //bcrypt.hashSync(req.body.password, 8)
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      // var authorities = [];
      // user.getRoles().then(roles => {
      //   for (let i = 0; i < roles.length; i++) {
      //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
      //   }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          accessToken: token
        });
      //});
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.adminsignin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
      role: "admin"
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
        //bcrypt.hashSync(req.body.password, 8)
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });


      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token
      });


    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};