// Dependencies
// =============================================================
var mysql = require("mysql");
const inquirer = require("inquirer");
const logo = require('asciiart-logo');
const config = require('./package.json');

// Logo Art
// =============================================================
console.log(logo(config).render());

// Connect to server and then run init
// =============================================================
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

// Connect to datbase
// =============================================================
init.init(connection);
connection.end();

// Connect to datbase
// =============================================================
function init(connection) {
    inquirer
        .prompt({
            name: "listPrompt",
            type: "list",
            message: "Please choose ",
            choices: ["ADD", "VIEW", "UPDATE", "CLOSE"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.listPrompt === "ADD") {
                update();
            }
            else if (answer.listPrompt === "VIEW") {
                view();
            }
            else if (answer.listPrompt === "UPDATE") {
                deleteEmployee();
            }
            else {
                connection.end();
            }
        });
}

function update() {
    inquirer
        .prompt({
            name: "listPrompt",
            type: "list",
            message: "Would you like to [ADD] an auction or [BID] on an auction?",
            choices: ["DEPARTMENT", "ROLE", "EMPLOYEE", "CLOSE"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.listPrompt === "DEPARTMENT") {
                connection.query(
                    "INSERT INTO department SET ?",
                    {
                        item_name: answer.name,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your department was added!");
                        // re-prompt the user for if they want to bid or post
                        init();
                    }
                );
            }
            else if (answer.listPrompt === "ROLE") {
                view();
            }
            else if (answer.listPrompt === "EMPLOYEE") {
                deleteEmployee();
            }
            else {
                connection.end();
            }
        });
}

function view() {
    console.log("view");
    init();
}

function deleteEmployee() {
    console.log("delete");
    init();
}

