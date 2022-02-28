const { response, request } = require('express')
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('Authorization');

    /* comprueba si el token existe */
    if (!token) {
        return res.status(401).json({
            msg: 'No tiene permiso para realizar esta acción'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETKEY);

        const usuario = await Usuario.findById(uid);

        /* valida si el usuario existe */
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token inválido'
            });
        }

        req.usuario = usuario;

        next();

    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: 'Token inválido'
        })
    }

}


module.exports = {
    validarJWT
}