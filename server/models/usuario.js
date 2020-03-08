/**
 * creacion de un modelo para la base de datos
 */
const mongoose = require('mongoose');


/**
 * para persorsonalizar los errores usamos el siguiente plugin
 * npm i mongoose-unique-validator --save
 */
const uniqueValisator = require('mongoose-unique-validator');


/**
 * crear un objeto enumerodopara los roles, un enum permite seleccionar 
 * solo los roles que estan contenidos en dicho enum
 */
let validarRoles = {
    values: ['ADMIN_ROL', 'USER_ROL'],
    message: '{VALUE} no es un rol admitido'
}



const Schema = mongoose.Schema;

let modeloSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es requerido']
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio'],
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROL',
        enum: validarRoles
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

/**
 * metodo usado para ocultar la password al momento de mostrar la infotmacion de la BD
 * el metodo toJSON se ejecuta siempre que se intente inprimer el modelo
 */
modeloSchema.methods.toJSON = function() {
    user = this;

    let userObjet = user.toObject();

    delete userObjet.password;
    return userObjet;
}

/**
 * usamos el plugin mongoose-unique-validator para espesificar errores de duplicidad
 */
modeloSchema.plugin(uniqueValisator, { message: '{PATH} debe ser unico' });

/**
 * se exporta el modelo cambiando el nombre a Usuario
 */
module.exports = mongoose.model('Usuario', modeloSchema);