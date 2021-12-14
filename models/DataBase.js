const mysql = require('mysql2');

const sql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'chercheur',
  insecureAuth: true
  
});

sql.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connexion à la base de donnée réussie !');
});

module.exports = sql;

