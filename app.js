const express = require("express");
const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const cors = require( "cors");
const bodyParser = require("body-parser")

const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}))
app.use(bodyParser.json());

app.get("/api", (req, res) => {
    res.json({
        mensaje: "Nodejs and JWT"
    });
});

const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'roombackbd',
    password: '12345678',
    database: 'roomback'
});

//---------------------------------------------------------------------------------------------------------
// GET
app.get('/api/estudiantes',cors(), (req, res) => {
    const sql = `SELECT * FROM Estudiante`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});

app.get('/api/estudiantes',cors(), (req, res) => {
    const sql = `SELECT * FROM Estudiante`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});



app.listen(3000, () => {
    console.log("nodejs app running...");
});