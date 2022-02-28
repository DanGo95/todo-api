const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    email: { type: String, required: [true, 'El email es obligatorio'], unique: true },
    password: { type: String, required: [true, 'La contraseña es obligatoria'] }
})

UsuarioSchema.methods.toJSON = function() {
    const { password, _id, __v, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}


module.exports = model('Usuario', UsuarioSchema);