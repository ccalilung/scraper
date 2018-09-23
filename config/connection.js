var Sequelize = require("sequelize");
require("dotenv").config();


// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
// if (process.env.JAWSDB_URL) {
//   connection = mysql.createConnection(process.env.JAWSDB_URL);

// } else {
// var sequelize = new Sequelize("marketplace_db", "root", "12345678", {
//   host: "localhost",
//   port: 3306,
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   }
// })};

// // Exports the connection for other files to use
// module.exports = sequelize;

module.exports = {
  "development": {
    username: "root",
    password: "12345678",
    database: "marketplace_db",
    host: "localhost",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql",
  }
}




