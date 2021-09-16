module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        Name: {
        type: Sequelize.STRING
      },
      Age : {
        type: Sequelize.INTEGER                     // INTEGER

      },
      Mark1 : {
        type: Sequelize.INTEGER                     // INTEGER

      },   
      Mark2 : {
        type: Sequelize.INTEGER                     // INTEGER

      },
      Mark3 : {
        type: Sequelize.INTEGER                     // INTEGER

      },
      passed: {
        type: Sequelize.BOOLEAN
      }
      

    });
    freezeTableName: true
    return Student;
  };