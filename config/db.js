const express = require("express");
const mysql = require("mysql");

var db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '',
    database: 'class-platform'
})

db.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log('success');
    }
});

