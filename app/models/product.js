module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("Product", {

      title: {
        type: Sequelize.STRING
      },
        typeofproduct: {
        type: Sequelize.STRING
      },
      cover: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      Price: {
        type: Sequelize.FLOAT
      },
      rating: {
        type: Sequelize.INTEGER
      }
    });
  
    return Product;
  };






  

// {
//     "title": "Brown eggs",
//     "type": "dairy",
//     "description": "Raw organic brown eggs in a basket",
//     "cover": "0.jpg",
//     "price": 28.1,
//     "rating": 4
//   }
  