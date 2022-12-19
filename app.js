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


app.get('/api/arrendadores',cors(), (req, res) => {
    const sql = `SELECT * FROM Arrendador`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});

app.get('/api/comentarios',cors(), (req, res) => {
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


app.get('/api/facturas',cors(), (req, res) => {
    const sql = `SELECT * FROM Factura`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});


app.get('/api/habitaciones',cors(), (req, res) => {
    const sql = `SELECT * FROM Habitacion`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});

app.get('/api/modopago',cors(), (req, res) => {
    const sql = `SELECT * FROM Modo_pago`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});

app.get('/api/reserva',cors(), (req, res) => {
    const sql = `SELECT * FROM Reserva`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});







//POST 
app.post('/api/arrendador', (req, res) => {
    const sql = 'INSERT INTO Arrendador SET ?';
    const { 
        id, 
        Nombres, 
        Apellidos, 
        Contraseña, 
        Correo, 
        Permiso, 
        Estado, 
         } = req.body;
    const reservaObj = {
        id:id,  
        Nombres:        Nombres,  
        Apellidos:        Apellidos,  
        Contraseña:        Contraseña,  
        Correo:        Correo,  
        Permiso:        Permiso,  
        Estado:        Estado, 
    };
    connection.query(sql, reservaObj, error => {
        if (error) throw error;
        res.send('Arrendador creado!');
    });
});
app.post('/api/estudiante', (req, res) => {
    const sql = 'INSERT INTO Estudiante SET ?';
    const { 
        id, 
        Nombres, 
        Apellidos, 
        Contraseña, 
        Correo, 
        Carnet, 
        Estado, 
         } = req.body;
    const reservaObj = {
        id:id,  
        Nombres:        Nombres,  
        Apellidos:        Apellidos,  
        Contraseña:        Contraseña,  
        Correo:        Correo,  
        Carnet:        Carnet,  
        Estado:        Estado, 
    };
    connection.query(sql, reservaObj, error => {
        if (error) throw error;
        res.send('Estudiante creado!');
    });
});

app.listen(3000, () => {
    console.log("nodejs app running...");
});