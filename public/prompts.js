// Dependencies
// =============================================================
const inquirer = require("inquirer");
var mysql = require("mysql");
const connection = require("../server/connection");

console.log("Init accessed")
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
        .then(function (answer, err) {
            switch (answer.listPrompt) {
                case "View All Employees":
                    console.log("view");
                    if (err) throw err;
                    employees();
                    break;

                case "View All Employees By Department":
                    if (err) throw err;
                    view();
                    break;

                case "View All Employees By Manager":
                    if (err) throw err;
                    viewManager();
                    break;

                case "Add Employee":
                    if (err) throw err;
                    addEmployee();
                    break;

                case "Remove Employee":
                    if (err) throw err;
                    removeEmployee();
                    break;

                case "Update Employee Role":
                    if (err) throw err;
                    updateEmployeeRole();
                    break;

                case "Update Employee Manager":
                    if (err) throw err;
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
    var query = "SELECT first_name, last_name FROM employee";
    "SELECT manager_id FROM employee JOIN department ON employee.manager_id = department.id"
    connection.query(query, function (err, res) {
        console.log(res)
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.table([
                {
                    first_name: res[i].first_name,
                    last_name: res[i].last_name, 
                    department_name: res,
                    manager_name: res
                }
              ])
        }
        init();
    });
}

function view() {
    var query = "SELECT first_name, last_name FROM employee SELECT role_id FROM employee JOIN department ON employee.role_id = department.id"
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i]);
        }
        init();
    });
}

function viewManager() {
    var query = "SELECT first_name, last_name FROM employee SELECT role_id FROM employee JOIN department ON employee.role_id = department.id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i]);
        }
        init();
    });
}

function addEmployee() {
    return inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter employee first name.",
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter employee last name.",
        }
    ]).then(function (answer) {
        console.log(answer.first_name);
        console.log(answer.last_name);
        init();
    });
}

function removeEmployee() {
    var query = "DELETE FROM employee WHERE first_name";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i]);
        }
        init();
    });
}

function updateEmployeeRole() {
    return inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter employee first name.",
        }
    ]).then(function (answer) {
    console.log("updateEmployeeRole");
    init();
    })
}

function updateEmployeeManager() {
    return inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter employee first name.",
        }
    ]).then(function (answer) {
    console.log("updateEmployeeManager");
    init();
    })
}


module.exports = init;