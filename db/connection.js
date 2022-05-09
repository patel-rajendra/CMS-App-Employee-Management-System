const util=require('util');
const mysql = require('mysql2');

// Create database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'QAvirtual@12',
    database: 'employees_db'
  });

  // Connect to databse
connection.connect(function(err){
    if(err) throw err;
});

connection.query = util.promisify(connection.query);

// Export connection
module.exports = connection;