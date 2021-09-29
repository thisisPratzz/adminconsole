const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Product =db.products;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.CreateProduct= (req, res) => {
  // Save User to Database
  Product.create({

    title: req.body.title,
    type: req.body.type,
    description: req.body.description,
    cover: req.body.cover,
    Price: req.body.price,
    rating: req.body.rating
  
    
  })
    .then(user => {
        res.send({ message: "Product added successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.GetALLProducts= (req, res) => {
  Product.findAll().then((data) => {
              res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.deleteProduct= (req, res) => {
  Product.destroy({
      where: {
        id: req.body.id
      }
    }).then(result => {
      res.status(200).send("deleted sucessfully");
    }).catch(err => {
      res.status(500).send({ message: err.message });

    })
};