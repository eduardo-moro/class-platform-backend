const express = require('express')
const routes = express.Router()
const mysql = require("mysql");

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'class-platform'
})

db.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log('Conectado com sucesso!');
    }
});

routes.get('/', (req, res) => {
    data = db.query("SELECT * FROM `users` ", (error, rows, fields) => {
        if(error) {
            console.log(error);
        } else {
            console.log("Query realizada com sucesso!")
            return res.json(rows);
        }
    });

})

module.exports = routes
