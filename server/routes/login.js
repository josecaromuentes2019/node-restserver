const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
/**
 * se instalo jsonwebtoken con el comando 
 * npm i jsonwebtoken --save
 * esto para generar token de autenticacion
 */
const jwt = require('jsonwebtoken');



app.post('/login', (req, res) => {

    let body = req.body;
    Usuario.findOne({ email: body.email, estado: true }, (err, usuarioBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'El servidor ha encontrado una situación que no sabe cómo manejar',
                err
            });
        }


        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                err: { message: "Error de Autenticacion email o password invalido" }
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioBD.password)) {
            return res.status(400).json({
                ok: false,
                err: { message: 'Error de Autenticacion email o password invalido' }
            });
        };
        /**
         * token
         * process.env.SEED:
         * variable que contiene la semilla o raiz configurada en configs esta es
         * la firmadel token
         * 
         * process.env.vencimientoToken:
         * varible que contiene la cadicidad del token esta configurada en configs
         */
        let token = jwt.sign({
            usuario: usuarioBD
        }, process.env.SEED, { expiresIn: process.env.vencimientoToken })

        res.json({
            ok: true,
            usuarioBD,
            token
        })
    });
});

module.exports = app;