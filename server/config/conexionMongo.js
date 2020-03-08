/**
 * Conexion a base de datos mongoDB
 */

/**
 * process.env.url_cafe hace referencia a la url de coneccion,
 * configurada en el archivo configs
 */

const mongoose = require('mongoose');

const conexionMongo = async() => {
    await mongoose.connect(process.env.url_cafe, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });

}
module.exports = {
    conexionMongo
}