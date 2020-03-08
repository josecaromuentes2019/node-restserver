require('./config/configs');
const express = require('express');
const app = express();
//const mongoose = require('mongoose');
const conection = require('./config/conexionMongo').conexionMongo;


/**
 * se instala el paquete
 * npm i body-parser --save
 * el cual permite enviar un json por post
 */
// const bodyParser = require('body-parser');

// /**
//  * se invoca app.use para que se ejecute algo cuando el flujo del programa
//  * pase por esa linea
//  */
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())

app.use(require('./routes/usuario'));


/**
 * coneccion a bd
 */
conection()
    .then(() => {
        console.log('Estamos conectados a MONGO')
    })
    .catch(() => console.log('Ocurrio un error en la conexion'))



app.listen(process.env.PORT, () => console.log(`Usando el puerto ${process.env.PORT}`));