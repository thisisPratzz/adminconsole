module.exports = {

    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "toor",
    database: "student",
    port :5432,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }


  };

