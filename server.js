// Dependencies
// =============================================================
var mysql = require("mysql");
const init = require("./public/prompts");
const connection = require("./server/connection");
const logo = require('asciiart-logo');
const config = require('./package.json');

// Logo Art
// =============================================================
console.log(logo(config).render());

// Connect to server and then run init
// =============================================================
connection.myConnection();
init.init(connection);
