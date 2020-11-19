// Dependencies
// =============================================================
const init = require("./lib/prompts");
const logo = require('asciiart-logo');
const config = require('./package.json');

// Logo Art
// =============================================================
console.log(logo(config).render());

// Connect to server and then run init
// =============================================================
init();
