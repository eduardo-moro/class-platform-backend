const express = require('express')
const routes = express.Router()
const db = require('./db')

require("dotenv-safe").config();
const jwt = require('jsonwebtoken');


function verifyJWT(req, res, next){
    const accessToken = req.headers['access-token']

    if(!accessToken) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(accessToken, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        req.userId = decoded.id;
        next();
    })
}

routes.post('/', verifyJWT, (req, res, next) => {
    return res.json({ auth: true, message: 'hello world!', userId: req.userId });
});

routes.post('/login', (req, res) => {
    if(req.body.email != undefined){
        data = db.query("SELECT * FROM `users` WHERE email = '" + req.body.email + "'" , (error, rows, fields) => {
            if(error) {
                console.log(error);
            } else {
                console.log("Query realizada com sucesso!")
                const id = rows[0].id

                const token = jwt.sign({id}, process.env.SECRET, {
                    expiresIn: 300
                })

                return res.json({auth: true, token: token});
            }
        });
    }else{
        res.status(403).json({message: 'No email provided.'});
    }

});


module.exports = routes
