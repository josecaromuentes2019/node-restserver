require('./config/config')
const express = require('express');
const app = express();
/**
 * se instala el paquete
 * npm i body-parser --save
 * el cual permite enviar un json por post
 */
const bodyParser = require('body-parser');

/**
 * se invoa app.use para que se ejecute algo cuando el flujo del programa
 * pase por esa linea
 */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/usuario', (req, res) => {
    res.json('get ususario');
});

app.post('/usuario', (req, res) => {
    /**
     * este condicional informa un status y el porque se da el error
     */
    if (req.body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({
            nombre: req.body
        });
    }
});

app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    res.json({ id });
});
app.delete('/usuario', (req, res) => {
    res.json('delete usuario');
})

app.listen(process.env.PORT, () => console.log(`Usando el puerto ${process.env.PORT}`))