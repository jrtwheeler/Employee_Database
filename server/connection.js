// Dependencies
// =============================================================
var mysql = require("mysql");
// Mysql boilerplate
// =============================================================
function myConnection () {
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

connection.end();
} 
// connection.end();
exports.myConnection = myConnection;