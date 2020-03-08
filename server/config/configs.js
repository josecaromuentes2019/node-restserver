/**
 * puerto
 */
process.env.PORT = process.env.PORT || 3000;

/**
 * Entorno
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlBD;

if (process.env.NODE_ENV === 'dev') {
    urlBD = 'mongodb://localhost:27017/cafe';
} else {
    urlBD = 'mongodb+srv://strider:UtpF4V8WagSgAKEp@cluster0-fbzam.mongodb.net/cafe';
}

process.env.url_cafe = urlBD;