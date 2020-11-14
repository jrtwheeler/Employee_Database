
let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : '1026',
  database : 'department_db'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();