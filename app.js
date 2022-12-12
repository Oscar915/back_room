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


// APIS PARA USUARIOS
app.get('/api/users',cors(), (req, res) => {
    const sql = `SELECT * FROM users`;
    connection.query(sql, (error, result) => {
        if (error) throw error;

        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});

app.post('/api/users', (req, res) => {
    const sql = 'INSERT INTO users SET ?';
    const { nombre, dia, hora, lunes, martes,
        miercoles,
        jueves,
        viernes,
        sabado,
        domingo,
        estado } = req.body;
    const calendarObj = {
        nombre: nombre,
        dia: dia,
        hora: hora,
        lunes: lunes,
        martes: martes,
        miercoles: miercoles,
        jueves: jueves,
        viernes: viernes,
        sabado: sabado,
        domingo: domingo,
        estado: estado
    };
    connection.query(sql, calendarObj, error => {
        if (error) throw error;
        res.send('Horario creado!');
    });
});

//APIS PARA LAS HABITACIONES
app.get('/api/habitaciones',cors(), (req, res) => {
    const sql = `SELECT * FROM habitacion`;
    connection.query(sql, (error, result) => {
        if (error) throw error;

        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});


app.get('/api/habitacion/:id',cors(), (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM habitacion WHERE IdHabitacion=${id}`;
    connection.query(sql, (error, result) => {
        if (error) throw error;

        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});


app.get('/api/calendar',cors(), (req, res) => {
    //const { id } = req.params;
    const sql = `SELECT * FROM calendar`;
    connection.query(sql, (error, result) => {
        if (error) throw error;

        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});


app.get('/api/calendar/:id',cors(), (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM calendar WHERE id= ${id}`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});

app.post('/api/addcalendar', (req, res) => {
    const sql = 'INSERT INTO calendar SET ?';
    const { nombre, dia, hora, lunes, martes,
        miercoles,
        jueves,
        viernes,
        sabado,
        domingo,
        estado } = req.body;
    const calendarObj = {
        nombre: nombre,
        dia: dia,
        hora: hora,
        lunes: lunes,
        martes: martes,
        miercoles: miercoles,
        jueves: jueves,
        viernes: viernes,
        sabado: sabado,
        domingo: domingo,
        estado: estado
    };
    connection.query(sql, calendarObj, error => {
        if (error) throw error;
        res.send('Horario creado!');
    });
});


app.put('/api/update',cors(), (req, res) => {
    const { id, nombre, dia, hora, lunes, martes,
        miercoles,
        jueves,
        viernes,
        sabado,
        domingo,
        estado } = req.body;
    const sql = `UPDATE calendar SET nombre = '${nombre}',     dia='${dia}' ,    hora='${hora}' ,    lunes='${lunes}' ,    martes='${martes}' ,    miercoles='${miercoles}' ,    jueves='${jueves}' ,    viernes='${viernes}' ,    sabado='${sabado}' ,   domingo='${domingo}' ,estado='${estado}' WHERE id =${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Calendario actualizado!');
    });
});

app.delete('/api/deletecalendar/:id',cors(), (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM calendar WHERE id= ${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Calendario eliminado');
    });
});


app.listen(3000, () => {
    console.log("nodejs app running...");
});