// Dependencies
// =============================================================
const inquirer = require("inquirer");
const connection = require("./connection");

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
        .then(function ({ listPrompt }) {
            switch (listPrompt) {
                case "View All Employees":
                    viewAllEmployees();
                    break;

                case "View All Employees By Department":
                    viewAllEmployeesByDept();
                    break;

                case "View All Employees By Manager":
                    viewAllEmployeesByManager();
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
                    connection.end();
                    break;
            }
        })
        .catch((err) => console.warn(err));
}

function viewAllEmployees() {
    var query = "SELECT "
    query += "e.id AS employee_id, ";
    query += "CONCAT(e.last_name, \", \" , e.first_name) AS employee_name,";
    query += "CONCAT(m.last_name, \", \" , m.first_name) AS manager_name,";
    query += "e.role_id, title, salary, ";
    query += "department_id, name AS department_name ";
    query += "FROM employee e ";
    query += "LEFT JOIN role r "
    query += "ON e.role_id = r.id "
    query += "LEFT JOIN department d "
    query += "ON r.department_id = d.id "
    query += "LEFT JOIN employee m "
    query += "ON e.manager_id = m.id";

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
}

function viewAllEmployeesByDept() {
    var query = "SELECT "
    query += "role_id, ";
    query += "CONCAT(e.last_name, \", \" , e.first_name) AS employee_name,";
    query += "department_id, name AS department_name ";
    query += "FROM employee e ";
    query += "LEFT JOIN role r ";
    query += "ON role_id = r.id ";
    query += "LEFT JOIN department d "
    query += "ON r.department_id = d.id "
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
}

function viewAllEmployeesByManager() {
    var query =
        "SELECT first_name, last_name FROM employee SELECT role_id FROM employee JOIN department ON employee.role_id = department.id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i]);
        }
        init();
    });
}

function addEmployee() {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "Enter employee first name.",
            },
            {
                type: "input",
                name: "last_name",
                message: "Enter employee last name.",
            },
        ])
        .then(function (answer) {
            console.log(answer.first_name);
            console.log(answer.last_name);
            init();
        });
}

function removeEmployee() {
    var query = "DELETE FROM employee WHERE first_name";
    return inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "Enter employee first name.",
            },
        ])
        .connection.query(query, function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log(res[i]);
            }
            init();
        });
}

function updateEmployeeRole() {
    var query = "DELETE FROM employee WHERE first_name";
    return inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "Enter employee first name.",
            },
        ])
        .then(function (answer) {
            console.log("updateEmployeeRole");
            init();
        });
}

function updateEmployeeManager() {
    var query = "DELETE FROM employee WHERE first_name";
    return inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "Enter employee first name.",
            },
        ])
        .then(function (answer) {
            console.log("updateEmployeeManager");
            init();
        });
}

module.exports = init;


//