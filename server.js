// Dependencies
// =============================================================
var mysql = require("mysql");
const init = require("./public/prompts");
const logo = require('asciiart-logo');
const config = require('./package.json');

// Logo Art
// =============================================================
console.log(logo(config).render());

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
    //Init function
    init.init();
});
 
connection.end();


