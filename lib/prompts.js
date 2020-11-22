// Dependencies
// =============================================================
const inquirer = require("inquirer");
const connection = require("./connection");

function init() {
    inquirer
        .prompt([{
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
        },
        {
            type: "input",
            name: "first_name",
            message: "Enter employee first name.",
            when: (answers) => answers.listPrompt === "Add Employee"
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter employee last name.",
            when: (answers) => answers.listPrompt === "Add Employee"
        },
        {
            type: "input",
            name: "role_id",
            message: "Enter role_id.",
            when: (answers) => answers.listPrompt === "Add Employee"
        },
        {
            type: "input",
            name: "manager_id",
            message: "Enter manager_id.",
            when: (answers) => answers.listPrompt === "Add Employee"
        },
        {
            type: "input",
            name: "employee_id",
            message: "Enter employee id.",
            when: (answers) => answers.listPrompt === "Remove Employee"
        },
        {
            type: "input",
            name: "first_name",
            message: "Enter employee first name.",
            when: (answers) => answers.listPrompt === "Update Employee Role"
        },
        {
            type: "input",
            name: "new_role_id",
            message: "Enter new employee role id.",
            when: (answers) => answers.listPrompt === "Update Employee Role"
        }
        ])
        .then(function (answers) {
            switch (answers.listPrompt) {
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
                    addEmployee(answers);
                    break;

                case "Remove Employee":
                    removeEmployee(answers);
                    break;

                case "Update Employee Role":
                    updateEmployeeRole(answers);
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

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

function viewAllEmployeesByDept() {
    var query = "SELECT "
    query += "e.id AS employee_id, ";
    query += "CONCAT(e.last_name, \", \" , e.first_name) AS employee_name,";
    query += "e.role_id ";
    query += "department_id, name AS department_name ";
    query += "FROM employee e ";
    query += "LEFT JOIN role r "
    query += "ON e.role_id = r.id "
    query += "LEFT JOIN department d "
    query += "ON r.department_id = d.id "
    query += "LEFT JOIN employee m "
    query += "ON e.manager_id = m.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

function viewAllEmployeesByManager() {
    var query = "SELECT "
    query += "CONCAT(e.last_name, \", \" , e.first_name) AS employee_name ";
    query += "FROM employee e ";
    query += "WHERE manager_id = 1";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

function addEmployee(answers) {
    var query = "INSERT INTO "
    query += "employee "
    query += "(first_name, last_name, role_id, manager_id) "
    query += "VALUES (?, ?, ?, ?) "
    connection.query(query, [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], function (err, res) {
        if (err) throw err;
    })
    var query = "SELECT * FROM "
    query += "employee"
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

function removeEmployee(answers) {
    var query = "DELETE FROM "
    query += "employee "
    query += "WHERE "
    query += "id = ? "
    connection.query(query, [answers.employee_id], (err, res) => {
        if (err) throw err;
    })
    var query = "SELECT * FROM "
    query += "employee"
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    });
}

function updateEmployeeRole(answers) {
    var query = "UPATE employee "
    query += "SET role_id = ? "
    query += "WHERE first_name = ?"
    connection.query(query, [answers.new_role_id, answers.first_name], (err, res) => {
        if (err) throw err;
        console.table(res);
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