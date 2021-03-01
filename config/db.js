const mysql = require("mysql");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'class-platform'
});

db.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log('Conectado com sucesso!');
    }
});

module.exports = db
