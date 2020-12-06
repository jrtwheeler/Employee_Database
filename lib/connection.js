// Dependencies
// =============================================================
var mysql = require("mysql");
const util = require('util');
// Mysql boilerplate
// =============================================================
var connection = mysql.createConnection({
    host: "localhost",
    // Port; if not 3306
    port: 3306,
    // Username
    user: "root",
    // Password
    password: "1026",
    // Database
    database: "department_schema_db"
});

// Connect to datbase
// =============================================================
connection.connect((err) => {
    //Error handling
    if (err) throw err;
    //Console.log connection confirmation
    console.log("connected as id " + connection.threadId);
});
// Export connection for our ORM to use.
connection.query = util.promisify(connection.query);
module.exports = connection;