const express = require("express");
const app = express();
const db = require("./app//models/");
const bodyParser = require("body-parser");

const cors = require("cors");


var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());


app.use(express.urlencoded({ extended: true }));

require('./app/routes/user.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/products.routes')(app);

db.sequelize.sync();
const User =db.user;
// For devlopement only 
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

let port = 3000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});


// function initial() {
//   User.create({
//     id: 1,
//     role: "user"
//   });
 
//   User.create({
//     id: 2,
//     role: "moderator"
//   });
 
//   User.create({
//     id: 3,
//     role: "admin"
//   });
// }