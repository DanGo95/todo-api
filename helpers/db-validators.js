const { request } = require("express");
const Nota = require("../models/nota");
const Usuario = require("../models/usuario");

/* valida si el email es único */
const emailExiste = async(email = '') => {
    const checkEmail = await Usuario.findOne({ email });

    if (checkEmail) {
        throw new Error('El email ya se encuentra registrado');
    }
};



/* valida si la nota existe */
const notaExiste = async(id = '') => {
    const checkId = await Nota.findById(id);

    if (!checkId) {
        throw new Error('La nota no existe');
    }
};



// /* valida si el usuario puede modificar la nota */
const mismoUsuario = async(id, { req }) => {
    const nota = await Nota.findOne({
        $and: [{ _id: id }, { usuario: req.usuario.id }]
    });

    if (!nota) {
        throw new Error('No tiene permisos para modificar esta nota');
    }

};


module.exports = {
    emailExiste,
    notaExiste,
    mismoUsuario
};