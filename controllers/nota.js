const { response } = require("express");
const Nota = require("../models/nota");


const obtenerNotas = async(req, res = response) => {

    // const [total, notas] = await Promise.all([
    //     Nota.countDocuments({ usuario: req.usuario.id }),
    //     Nota.find({ usuario: req.usuario.id })
    // ])

    const notas = await Nota.find({ usuario: req.usuario.id });

    res.json(notas);

};


const crearNota = async(req, res = response) => {

    const descripcion = req.body.descripcion;

    const data = {
        descripcion,
        usuario: req.usuario._id
    };

    const nota = new Nota(data);
    await nota.save();

    res.status(201).json(nota);

};


const actualizarNota = async(req, res = response) => {

    const { id } = req.params;
    const { descripcion, estado } = req.body;

    await Nota.findByIdAndUpdate(id, { descripcion, estado });

    res.json({
        msg: 'La nota se actualizó correctamente'
    });

};

const eliminarNota = async(req, res = response) => {

    const { id } = req.params;
    await Nota.findByIdAndDelete(id);

    res.json({
        msg: 'La nota se eliminó correctamente'
    });

};


module.exports = {
    obtenerNotas,
    crearNota,
    actualizarNota,
    eliminarNota
};