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
    urlBD = process.env.MONGO_URI;
}

/**
 * Vencimiento del token
 * 60 segundos
 * 60 minutos
 * 24 horas 
 * 30 dias
 */
process.env.vencimientoToken = 60 * 60 * 24 * 30

/**
 * SEED O SEMILLA DEL TOKEN
 */

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

process.env.url_cafe = urlBD;