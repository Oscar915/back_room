const express = require("express");
const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const cors = require("cors");
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


app.get('/api/arrendadores', cors(), (req, res) => {
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

app.get('/api/comentarios', cors(), (req, res) => {
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

app.get('/api/estudiantes', cors(), (req, res) => {
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


app.get('/api/facturas', cors(), (req, res) => {
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


app.get('/api/habitaciones', cors(), (req, res) => {
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

app.get('/api/modopago', cors(), (req, res) => {
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

app.get('/api/reserva', cors(), (req, res) => {
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
        Id,
        Nombres,
        Apellidos,
        Contraseña,
        Correo,
        Permiso,
        Estado,
    } = req.body;
    const reservaObj = {
        Id: Id,
        Nombres: Nombres,
        Apellidos: Apellidos,
        Contraseña: Contraseña,
        Correo: Correo,
        Permiso: Permiso,
        Estado: Estado,
    };
    connection.query(sql, reservaObj, error => {
        if (error) throw error;
        res.send('Arrendador creado!');
    });
});


app.post('/api/estudiante', (req, res) => {
    const sql = 'INSERT INTO Estudiante SET ?';
    const {
        Id,
        Nombres,
        Apellidos,
        Contraseña,
        Correo,
        Carnet,
        Estado,
    } = req.body;
    const reservaObj = {
        Id: Id,
        Nombres: Nombres,
        Apellidos: Apellidos,
        Contraseña: Contraseña,
        Correo: Correo,
        Carnet: Carnet,
        Estado: Estado,
    };
    connection.query(sql, reservaObj, error => {
        if (error) throw error;
        res.send('Estudiante creado!');
    });
});

app.post('/api/comentario', (req, res) => {
    const sql = 'INSERT INTO Comentario SET ?';
    const {
        Id,
        Id_reserva,
        Id_habitacion,
        Contenido,
    } = req.body;
    const reservaObj = {
        Id: Id,
        Id_reserva: Id_reserva,
        Id_habitacion: Id_habitacion,
        Contenido: Contenido,
    };
    connection.query(sql, reservaObj, error => {
        if (error) throw error;
        res.send('Estudiante creado!');
    });
});



app.post('/api/factura', (req, res) => {
    const sql = 'INSERT INTO Factura SET ?';
    const {
        Id,
        Id_reserva,
        Valor_total,
    } = req.body;
    const reservaObj = {
        Id: Id,
        Id_reserva: Id_reserva,
        Valor_total: Valor_total,
    };
    connection.query(sql, reservaObj, error => {
        if (error) throw error;
        res.send('Estudiante creado!');
    });
});



app.post('/api/habitacion', (req, res) => {
    const sql = 'INSERT INTO Habitacion SET ?';
    const {
        Id,
        Nombres,
        Disponibilidad,
        Descripcion,
        Imagen,
        Precio,
        Departamento,
        Ciudad,
        Direccion,
        id_administrador,
    } = req.body;
    const reservaObj = {
        Id: Id,
        Nombres: Nombres,
        Disponibilidad: Disponibilidad,
        Descripcion: Descripcion,
        Imagen: Imagen,
        Precio: Precio,
        Departamento: Departamento,
        Ciudad: Ciudad,
        Direccion: Direccion,
        id_administrador: id_administrador,
    };
    connection.query(sql, reservaObj, error => {
        if (error) throw error;
        res.send('Estudiante creado!');
    });
});


app.post('/api/modopago', (req, res) => {
    const sql = 'INSERT INTO Modo_pago SET ?';
    const {
        Id,
        Id_reserva,
        Tipo,
        Estado,
    } = req.body;
    const reservaObj = {
        Id: Id,
        Id_reserva: Id_reserva,
        Tipo: Tipo,
        Estado: Estado,
    };
    connection.query(sql, reservaObj, error => {
        if (error) throw error;
        res.send('Modo de pago creado!');
    });
});



app.post('/api/reserva', (req, res) => {
    const sql = 'INSERT INTO Reserva SET ?';
    const {
        Id,
        Id_estudiante,
        Id_habitacion,
        Fecha_inicio,
        Fecha_final,
        Estado,
        Contrato,
    } = req.body;
    const reservaObj = {
        Id: Id,
        Id_estudiante: Id_estudiante,
        Id_habitacion: Id_habitacion,
        Fecha_inicio: Fecha_inicio,
        Fecha_final: Fecha_final,
        Estado: Estado,
        Contrato: Contrato,
    };
    connection.query(sql, reservaObj, error => {
        if (error) throw error;
        res.send('Modo de pago creado!');
    });
}); S

app.listen(3000, () => {
    console.log("nodejs app running...");
});