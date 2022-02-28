const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generarJwt } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });

        /* verifica que el usuario exista */
        if (!usuario) {
            return res.status(400).json({
                msg: 'Email/Password incorrecto'
            })
        }

        /* valida la contraseña */
        const passwordValido = bcryptjs.compareSync(password, usuario.password);

        if (!passwordValido) {
            return res.status(400).json({
                msg: 'Email/Password incorrecto'
            })
        }

        /* genera el jwt */
        const token = await generarJwt(usuario.id);

        res.json({
            token
        });



    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }

}

const registro = async(req, res = response) => {

    /* creación de usuario */
    const { email, password } = req.body;
    const usuario = new Usuario({ email, password });

    /* hash del password */
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        usuario
    })

}


module.exports = {
    login,
    registro
}