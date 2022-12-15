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

app.get('/api/Reserva',cors(), (req, res) => {
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
app.get('/api/reserva/:correo',cors(), (req, res) => {
    const { correo } = req.params;
    const sql = `SELECT * FROM habitacion WHERE correo_arrendatario='${correo}'`;
    connection.query(sql, (error, result) => {
        if (error) throw error;

        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});

app.get('/api/reservae/:correo',cors(), (req, res) => {
    const { correo } = req.params;
    const sql = `SELECT DISTINCT Reserva.idReserva,habitacion.Nombre_Habitacion,habitacion.IdHabitacion FROM habitacion INNER JOIN Reserva ON habitacion.IdHabitacion=Reserva.habitacion_IdHabitacion INNER JOIN users ON Reserva.users_Email=users.Email INNER JOIN Factura ON users.Email=Factura.users_Email WHERE Factura.users_Email='${correo}'`;
    connection.query(sql, (error, result) => {
        if (error) throw error;

        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});




app.get('/api/Comentario',cors(), (req, res) => {
    const sql = `SELECT * FROM Comentario`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
''
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});


app.get('/api/habitaciones',cors(), (req, res) => {
    const sql = `SELECT * FROM habitacion WHERE EstadoHabi='Libre'`;
    connection.query(sql, (error, result) => {
        if (error) throw error;

        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});

app.get('/api/factura',cors(), (req, res) => {
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





app.get('/api/modelodepago',cors(), (req, res) => {
    const sql = `SELECT * FROM Modelodepago`;
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


app.get('/api/comentario/:id',cors(), (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM Comentario WHERE idComentario= ${id}`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});

app.get('/api/users/:id',cors(), (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM users WHERE Email= '${id}'`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});

//FIN GET
//---------------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------------------
//POST
app.post('/api/users', (req, res) => {
    const sql = 'INSERT INTO users SET ?';
    const { 
        Email, 
        Nombre, 
        Nombre2, 
        password_2, 
        Apellido,
        Apellido2,
        Rol } = req.body;
    const userObj = {
        Email: Email, 
        Nombre: Nombre, 
        Nombre2: Nombre2, 
        password_2: password_2, 
        Apellido: Apellido,
        Apellido2: Apellido2,
        Rol: Rol
    };
    connection.query(sql, userObj, error => {
        if (error) throw error;
        res.send('Usuario creado!');
    });
});


app.post('/api/factura', (req, res) => {
    const sql = 'INSERT INTO Factura SET ?';
    const { 
        nitFactura, 
        users_Email, 
        Descripcion, 
        ValorTotal
         } = req.body;
    const facturaObj = {
        nitFac:  nitFactura, 
        users_Email:         users_Email, 
        Descripcion:         Descripcion, 
        ValorTotal:         ValorTotal
    };
    connection.query(sql, facturaObj, error => {
        if (error) throw error;
        res.send('Usuario creado!');
    });
});

app.post('/api/habitacion', (req, res) => {
    const sql = 'INSERT INTO habitacion SET ?';
    const { 
        idHabitacion, 
        Nombre_Habitacion, 
        EstadoHabi, 
        Descripcion, 
        Precio, 
        Departamento, 
        Ciudad, 
        Direccion, 
        Imagen, 
        correo_arrendatario} = req.body;
    const facturaObj = {
        idHabitacion:idHabitacion,  
        Nombre_Habitacion:        Nombre_Habitacion,  
        EstadoHabi:        EstadoHabi,  
        Descripcion:        Descripcion,  
        Precio:        Precio,  
        Departamento:        Departamento,  
        Ciudad:        Ciudad,  
        Direccion:        Direccion,  
        Imagen:        Imagen,  
        correo_arrendatario: correo_arrendatario
    };
    connection.query(sql, facturaObj, error => {
        if (error) throw error;
        res.send('Habitación creado!');
    });
});



app.post('/api/reserva', (req, res) => {
    const sql = 'INSERT INTO Reserva SET ?';
    const { 
        idReserva, 
        users_Email, 
        habitacion_idHabitacion, 
        FechaInicio, 
        FechaFin, 
         } = req.body;
    const reservaObj = {
        idReserva:   idReserva,  
        users_Email:         users_Email,  
        habitacion_idHabitacion:         habitacion_idHabitacion,  
        FechaInicio:         FechaInicio,  
        FechaFin:         FechaFin,  
    };
    connection.query(sql, reservaObj, error => {
        if (error) throw error;
        res.send('Habitación creado!');
    });
});


app.post('/api/comentario', (req, res) => {
    const sql = 'INSERT INTO Comentario SET ?';
    const { 
        idComentario, 
        users_Email, 
        habitacion_idHabitacion, 
        texto, 
         } = req.body;
    const reservaObj = {
        idComentario:   idComentario,  
        users_Email:         users_Email,  
        habitacion_idHabitacion:         habitacion_idHabitacion,  
        texto:         texto,  
    };
    connection.query(sql, reservaObj, error => {
        if (error) throw error;
        res.send('Habitación creado!');
    });
});

app.post('/api/modelodepago', (req, res) => {
    const sql = 'INSERT INTO Modelodepago SET ?';
    const { 
        Factura_nitFac, 
        Fecha, 
        Hora, 
        Concepto, 
         } = req.body;
    const reservaObj = {
        Factura_nitFac:   Factura_nitFac,  
        Fecha:         Fecha,  
        Hora:         Hora,  
        Concepto:         Concepto,  
    };
    connection.query(sql, reservaObj, error => {
        if (error) throw error;
        res.send('Habitación creado!');
    });
});

app.post('/api/factura', (req, res) => {
    const sql = 'INSERT INTO Factura SET ?';
    const { 
        nitFac, 
        users_Email, 
        Descripcion, 
        ValorTotal, 
         } = req.body;
    const reservaObj = {
        nitFac:   nitFac,  
        users_Email:         users_Email,  
        Descripcion:         Descripcion,  
        ValorTotal:         ValorTotal,  
    };
    connection.query(sql, reservaObj, error => {
        if (error) throw error;
        res.send('Habitación creado!');
    });
});

// FIN POST
//---------------------------------------------------------------------------------------------------------




//---------------------------------------------------------------------------------------------------------
//PUT
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



app.put('/api/users', (req, res) => {
    const sql = 'UPDATE  users SET ?';
    const { 
        Email, 
        Nombre, 
        Nombre2, 
        password_2, 
        Apellido,
        Apellido2,
        Rol } = req.body;
    const userObj = {
        Email: Email, 
        Nombre: Nombre, 
        Nombre2: Nombre2, 
        password_2: password_2, 
        Apellido: Apellido,
        Apellido2: Apellido2,
        Rol: Rol
    };
    connection.query(sql, userObj, error => {
        if (error) throw error;
        res.send('Usuario creado!');
    });
});


app.put('/api/factura', (req, res) => {
    const sql = 'UPDATE Factura SET ?';
    const { 
        nitFactura, 
        users_Email, 
        Descripcion, 
        ValorTotal
         } = req.body;
    const facturaObj = {
        nitFactura:  nitFactura, 
        users_Email:         users_Email, 
        Descripcion:         Descripcion, 
        ValorTotal:         ValorTotal
    };
    connection.query(sql, facturaObj, error => {
        if (error) throw error;
        res.send('Usuario creado!');
    });
});

app.put('/api/habitacion', (req, res) => {
    const sql = 'UPDATE habitacion SET ?'; 
    const { 
        IdHabitacion, 
        Nombre_Habitacion, 
        EstadoHabi, 
        Descripcion, 
        Precio, 
        Departamento, 
        Ciudad, 
        Direccion, 
        Imagen, 
        correo_arrendatario} = req.body;
    const facturaObj = {
        IdHabitacion:IdHabitacion,  
        Nombre_Habitacion:        Nombre_Habitacion,  
        EstadoHabi:        EstadoHabi,  
        Descripcion:        Descripcion,  
        Precio:        Precio,  
        Departamento:        Departamento,  
        Ciudad:        Ciudad,  
        Direccion:        Direccion,  
        Imagen:        Imagen,  
        correo_arrendatario:correo_arrendatario
    };
    connection.query(sql, facturaObj, error => {
        if (error) throw error;
        res.send('Habitación creado!');
    });
});


app.put('/api/updatehabitacion', (req, res) => {
    const { 
        IdHabitacion, 
        EstadoHabi, 
        } = req.body;
    const sql = `UPDATE habitacion SET EstadoHabi = "${EstadoHabi}" WHERE IdHabitacion =${IdHabitacion}`;
    connection.query(sql, error => {
        if (error) throw error;
        res.send('Habitación creado!');
    });
});


app.put('/api/reserva', (req, res) => {
    const sql = 'UPDATE Reserva SET ?';
    const { 
        idReserva, 
        users_Email, 
        habitacion_idHabitacion, 
        FechaInicio, 
        FechaFin, 
         } = req.body;
    const reservaObj = {
        idReserva:   idReserva,  
        users_Email:         users_Email,  
        habitacion_idHabitacion:         habitacion_idHabitacion,  
        FechaInicio:         FechaInicio,  
        FechaFin:         FechaFin,  
    };
    connection.query(sql, reservaObj, error => {
        if (error) throw error;
        res.send('Habitación creado!');
    });
});


app.put('/api/comentario', (req, res) => {
    const sql = 'UPDATE Comentario SET ?';
    const { 
        idComentario, 
        users_Email, 
        habitacion_idHabitacion, 
        texto, 
         } = req.body;
    const reservaObj = {
        idComentario:   idComentario,  
        users_Email:         users_Email,  
        habitacion_idHabitacion:         habitacion_idHabitacion,  
        texto:         texto,  
    };
    connection.query(sql, reservaObj, error => {
        if (error) throw error;
        res.send('Habitación creado!');
    });
});

app.put('/api/modelodepago', (req, res) => {
    const sql = 'UPDATE Modelodepago SET ?';
    const { 
        Factura_nitFac, 
        Fecha, 
        Hora, 
        Concepto, 
         } = req.body;
    const reservaObj = {
        Factura_nitFac:   Factura_nitFac,  
        Fecha:         Fecha,  
        Hora:         Hora,  
        Concepto:         Concepto,  
    };
    connection.query(sql, reservaObj, error => {
        if (error) throw error;
        res.send('Habitación creado!');
    });
});

app.put('/api/factura', (req, res) => {
    const sql = 'UPDATE Factura SET ?';
    const { 
        nitFac, 
        users_Email, 
        Descripcion, 
        ValorTotal, 
         } = req.body;
    const reservaObj = {
        nitFac:   nitFac,  
        users_Email:         users_Email,  
        Descripcion:         Descripcion,  
        ValorTotal:         ValorTotal,  
    };
    connection.query(sql, reservaObj, error => {
        if (error) throw error;
        res.send('Habitación creado!');
    });
});
//---------------------------------------------------------------------------------------------------------

app.delete('/api/reserva/:id',cors(), (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Reserva WHERE idReserva= ${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('reserva eliminado');
    });
});

app.delete('/api/habitacion/:id',cors(), (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM habitacion WHERE IdHabitacion= ${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('habitacion eliminado');
    });
});



//---------------------------------------------------------------------------------------------------------
// INICIO DELETE
app.delete('/api/deletecalendar/:id',cors(), (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM calendar WHERE id= ${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Calendario eliminado');
    });
});
// FIN DELETE
//---------------------------------------------------------------------------------------------------------

app.listen(3000, () => {
    console.log("nodejs app running...");
});