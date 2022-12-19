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

//CONEXIÓN A BASE DE DATOS
const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'roombackbd',
    password: '12345678',
    database: 'roomback'
});

//---------------------------------------------------------------------------------------------------------
// GET

// TRAE TODOS LOS ARRENDADORES
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

// TRAE TODAS LAS HABITACIONES LIBRES
app.get('/api/habilibres', cors(), (req, res) => {
    const sql = `SELECT * FROM Habitacion WHERE Disponibilidad='Libre'`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});


// TRAE TODAS LAS HABITACIONES DE UN ARRENDADOR
app.get('/api/habitaciones/:Id', cors(), (req, res) => {
    const { Id } = req.params;
    const sql = `SELECT * FROM Habitacion WHERE Id_administrador='${Id}'`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});


//TRATE TODOS LOS COMENTARIOS
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

//TRAE TODOS LOS ESTUDIANTES
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

//TRAE TODAS LAS FACTURAS
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

// TRAE TODAS LAS HABITACIONES
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

// TRAE TODOS LOS MODOS DE PAGO
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

//TRE TODAS LAS RESERVAS
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
// AGREGAR ARRENDADOR 
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

// AGREGAR ESTUDIANTE 
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


// AGREGAR COMENTARIO
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

// AGREGAR FACTURA
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


//AGREGAR HABITACIÓN
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
        Id_administrador,
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
        Id_administrador: Id_administrador,
    };
    connection.query(sql, reservaObj, error => {
        if (error) throw error;
        res.send('Estudiante creado!');
    });
});

// AGREGAR MODO DE PAGO
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


//AGGREGAR RESERVA
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
}); 



//Desactivar habitación
app.put('/api/desactivarhabi',cors(), (req, res) => {
    const { Id } = req.body;
    const sql = `UPDATE Habitacion SET Disponibilidad = 'Ocupado' WHERE Habitacion.Id = '${Id}'`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Habitacion desactivada!');
    });
});

//Activar habitación
app.put('/api/activarhabi',cors(), (req, res) => {
    const { Id } = req.body;
    const sql = `UPDATE Habitacion SET Disponibilidad = 'Libre' WHERE Habitacion.Id = '${Id}'`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Habitacion activada!');
    });
});


//Activar Arrendador
app.put('/api/activararrendador',cors(), (req, res) => {
    const { Id } = req.body;
    const sql = `UPDATE Arrendador SET Estado = 'Activo' WHERE Arrendador.Id =  '${Id}'`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Habitacion activada!');
    });
});



//Desactivar Arrendador
app.put('/api/desactivararrendador',cors(), (req, res) => {
    const { Id } = req.body;
    const sql = `UPDATE Arrendador SET Estado = 'Inactivo' WHERE Arrendador.Id =  '${Id}'`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Arrendador desactivado!');
    });
});

//Desactivar reserva
app.put('/api/desactivarreserva',cors(), (req, res) => {
    const { Id } = req.body;
    const sql = `UPDATE Reserva SET Estado = 'Inactivo' WHERE Reserva.Id = '${Id}'`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Habitacion activada!');
    });
});

//Activar reserva
app.put('/api/activarreserva',cors(), (req, res) => {
    const { Id } = req.body;
    const sql = `UPDATE Reserva SET Estado = 'Activo' WHERE Reserva.Id = '${Id}'`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Habitacion activada!');
    });
});

app.listen(3000, () => {
    console.log("nodejs app running...");
});