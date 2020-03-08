const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
/**
 * se instala el paquete undescorejs para filtrar un objeto con los valores 
 * que se deseen, esto permite evitar la modificcion de algunas variables
 * usando el metodo pick
 */
const _ = require('underscore');

/**
 * se instala el paquete
 * npm i body-parser --save
 * el cual permite enviar un json por post
 */
const bodyParser = require('body-parser');

/**
 * se invoca app.use para que se ejecute algo cuando el flujo del programa
 * pase por esa linea
 */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


/**
 * servicio para mostrar informacion
 */
app.get('/usuario', (req, res) => {
    /**
     * se usa query para tomar la variable enviada
     * ej: rep.query.nombre_de_variable
     */
    let desde = req.query.desde;
    desde = Number(desde);

    let hasta = req.query.hasta;
    hasta = Number(hasta);

    /**
     * en find se incluyen las condiciones para mostrar los elemento des de bd
     * ej: google:true  donde google es un campo en la bd, despues de la coma
     * se incluyen los campos que se van a mostrar en la consulta, como se muestra 
     * a continuacion y separados solo por espacios
     */
    Usuario.find({
            estado: true
        }, 'nombre email img role estado')
        // .skip(5) //indica desde donde inicia un paginado
        // .limit(5) //inidica donde termina un paginado
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            /**
             * count cuenta el numero de elemetos en la bd
             */
            Usuario.count({ estado: true }, (err, cuantos) => {
                res.json({
                    ok: true,
                    usuarios,
                    total: cuantos
                })

            });

        })
});
/**
 * servicio para enviar datos
 */
app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    usuario.save((err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuarioBD
        });
    });
});

/**
 * servicio para ctualizar datos 
 */
app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            usuario: usuarioBD
        })
    });
});
app.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuario) => {
    //         if (err) {
    //             return res.status(400).json({
    //                 ok: false,
    //                 err
    //             });

    //         }
    //         if (!usuario) {
    //             res.json({
    //                 ok: false,
    //                 message: 'El usuario no existe'
    //             })
    //         }
    //         res.json({
    //             usuario
    //         })
    //     })

    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuario.estado) {
            res.json({
                of: false,
                message: "el Usuario no existe"
            })
        }

        res.json({
            ok: true,
            usuario
        })
    })


})

module.exports = app;