const { Schema, model } = require('mongoose');

const NotaSchema = Schema({
    descripcion: { type: String, required: [true, 'La nota es obligatoria'] },
    estado: { type: Boolean, default: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

NotaSchema.methods.toJSON = function() {
    const { __v, ...nota } = this.toObject();
    return nota;
};


module.exports = model('Nota', NotaSchema);