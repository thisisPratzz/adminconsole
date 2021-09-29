module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users_table", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      Productid: {
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };