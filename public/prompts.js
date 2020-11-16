// Dependencies
// =============================================================
const inquirer = require("inquirer");
var mysql = require("mysql");
const connection = require("../server/connection");

function init(connection) {
    inquirer
        .prompt({
            name: "listPrompt",
            type: "list",
            message: "Would you like to [POST] an auction or [BID] on an auction?",
            choices: ["ADD", "VIEW", "DELETE", "CLOSE"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.listPrompt === "ADD") {
                update();
            }
            else if (answer.listPrompt === "VIEW") {
                view();
            }
            else if (answer.listPrompt === "DELETE") {
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
                    function(err) {
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

exports.init = init;