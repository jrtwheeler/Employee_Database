// Dependencies
// =============================================================
const inquirer = require("inquirer");
const connection = require("./connection");
let data, sqlQry, sqlData;
const prompts = {
    menu: {
        name: "menu",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Roles",
            "View All Departments",
            "Add Employee",
            "Add Role",
            "Add Department",
            "Update Employee Role",
            "View All Employees By Manager",
            "Remove Employee",
            "Update Employee Manager",
            "exit",
        ],
    },
    addEmployee: (roles, emps) => [{
        type: "input",
        name: "first_name",
        message: "Enter employee first name.",
    },
    {
        type: "input",
        name: "last_name",
        message: "Enter employee last name.",
    },
    {
        type: "list",
        name: "role_id",
        message: "Select Role",
        choices: roles // [{name: "displayed", value: "returned"}]
    },
    {
        type: "list",
        name: "manager_id",
        message: "Select Manager.",
        choices: emps
    }],
    addDepartment: {
        name: "name",
        type: "input",
        message: "Department name?"
    },
    addRole: deps => [
        {
            name: "title",
            type: "input",
            message: "Role title?"
        },
        {
            name: "salary",
            type: "input",
            message: "Role salary?"
        },
        {
            type: "list",
            name: "department_id",
            message: "Select Department",
            choices: deps // {name: "what is displayed", value: "what is selected"}
        },
    ],
    updateRole: (emps, roles) => [
        {
            name: "employee_id",
            type: "list",
            message: "Select Employee",
            choices: emps
        },
        {
            name: "role_id",
            type: "list",
            message: "Select role",
            choices: roles
        },
    ]
}
async function viewAll(table) {
    sqlData = await connection.query("SELECT * FROM ??", [table]);
    console.table(sqlData);
    init();
}

async function addEmployee() {
    sqlQry = "SELECT id AS value, title AS name FROM role"
    const roles = await connection.query(qry);

    sqlQry = "SELECT id AS value, CONCAT(last_name, ', ', first_name) AS name FROM employee"
    const managers = await connection.query(qry);

    const data = await inquirer.prompt(prompts.addEmployee(roles, managers));

    sqlQry = "INSERT INTO employee (??, ??, ??, ??) values (?, ?, ?, ?)"
    sqlData = [...Object.keys(data), ...Object.values(data)]

    await connection.query(sqlQry, sqlData)
    init();
}

async function addRole() {
    sqlQry = "SELECT id AS value, name FROM department"
    const deps = await connection.query(qry);

    const data = await inquirer.prompt(prompts.addRole(deps));

    sqlQry = "INSERT INTO role (??, ??, ??) values (?, ?, ?)"
    sqlData = [...Object.keys(data), ...Object.values(data)]

    await connection.query(sqlQry, sqlData)
    init();
}

async function addDepartment() {
    const data = await inquirer.prompt(prompts.addDepartment);

    sqlQry = "INSERT INTO role (??, ??, ??) values (?, ?, ?)"
    sqlData = [...Object.keys(data), ...Object.values(data)]

    await connection.query(sqlQry, sqlData)
    init();
}

async function updateEmployeeRole() {
    sqlQry = "SELECT CONCAT(last_name, \", \" , first_name) AS name, id AS value FROM employee"
    const emps = await connection.query(sqlQry);

    sqlQry = "SELECT title AS name, id AS value FROM role"
    const rols = await connection.query(sqlQry);

    data = await inquirer.prompt(prompts.updateRole(emps, rols))

    sqlQry = "UPDATE employee SET role_id = ? WHERE id = ?"
    sqlData = [data.role_id, data.employee_id];
    await connection.query(sqlQry, sqlData)
    init();
}

async function init() {
    try {
        const answer = await inquirer.prompt(prompts.menu);
        switch (answer.menu) {
            case "View All Employees":
                return viewAll("employee");
            case "View All Roles":
                return viewAll("role");
            case "View All Departments":
                return viewAll("department");
            case "Add Employee":
                return addEmployee()
            case "Add Role":
                return addRole()
            case "Add Department":
                return addDepartment()
            case "Update Employee Role":
                return updateEmployeeRole()
        }
    } catch (error) {
        console.log(error)
    }
}

//Main Function
//=============================================================

function notANumber(val) {
    if (!val) {
        console.log("Please enter a number.");
        init();
    } else {
        return
    }
}

module.exports = init;

