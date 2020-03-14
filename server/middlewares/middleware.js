/**
 * verificar token
 */
const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, info_decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = info_decode.usuario;
        next();

    })



};

/**
 * Verificar Admi_Rol
 */

let verificaAdmin_Rol = (req, res, next) => {

    let userRol = req.usuario;

    if (userRol.role !== 'ADMIN_ROL') {
        return res.status(401).json({
            ok: true,
            message: 'Acceso denegado, no eres Administrador'

        });
    }

    next();

}

module.exports = {
    verificaToken,
    verificaAdmin_Rol
}