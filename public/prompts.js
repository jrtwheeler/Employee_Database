// Dependencies
// =============================================================
const inquirer = require("inquirer");

function init(connection) {
    inquirer
      .prompt({
        name: "listPrompt",
        type: "list",
        message: "Would you like to [POST] an auction or [BID] on an auction?",
        choices: ["UPDATE", "VIEW", "DELETE", "CLOSE"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.listPrompt === "UPDATE") {
          update();
        }
        else if(answer.listPrompt === "VIEW") {
          view();
        }
        else if(answer.listPrompt === "DELETE") {
            deleteEmployee();
        }
        else{
          connection.end();
        }
      });
  }

function update () {
      console.log("Update");
      init();
  }

function view () {
    console.log("view");
    init();
}

function deleteEmployee () {
    console.log("delete");
    init();
}

exports.init = init;