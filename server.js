// Dependencies
// =============================================================
var mysql = require("mysql");
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const config = require("./package.json");

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
    database: "department_schema_db",
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
init();

// Connect to datbase
// =============================================================
function init() {
    inquirer
        .prompt({
            name: "listPrompt",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Employees By Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "exit",
            ],
        })
        .then(function (answer) {
            switch (answer.listPrompt) {
                case "View All Employees":
                    console.log("view");
                    employees();
                    break;

                case "View All Employees By Department":
                    view();
                    break;

                case "View All Employees By Manager":
                    deleteEmployee();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;

                case "Update Employee Manager":
                    updateEmployeeManager();
                    break;

                case "exit":
                    //Error handling
                    if (err) throw err;
                    connection.end();
                    break;
            }
        });
}

function employees() {
    var query = "SELECT name FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i]);
        }
        init();
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

function addEmployee() {
    console.log("addEmployee");
    init();
}

function removeEmployee() {
    console.log("removeEmployee");
    init();
}

function updateEmployeeRole() {
    console.log("updateEmployeeRole");
    init();
}

function updateEmployeeManager() {
    console.log("updateEmployeeManager");
    init();
}
