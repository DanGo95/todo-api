const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerNotas, crearNota, actualizarNota, eliminarNota } = require('../controllers/nota');
const { validarJWT } = require('../middlewares/validar-jwt');

const { validarInputs } = require('../middlewares/validar-inputs');
const { notaExiste, mismoUsuario } = require('../helpers/db-validators');


const router = Router();

/* obtener todas las notas */
router.get('/', [
    validarJWT
], obtenerNotas);

/* crear nota */
router.post('/', [
    validarJWT,
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarInputs
], crearNota)

/* actualizar nota */
router.put('/:id', [
    validarJWT,
    check('id', 'Ingrese un id válido').isMongoId(),
    check('id').custom(notaExiste),
    check('id').custom(mismoUsuario),
    validarInputs
], actualizarNota)

/* eliminar nota */
router.delete('/:id', [
    validarJWT,
    check('id', 'Ingrese un id válido').isMongoId(),
    check('id').custom(notaExiste),
    check('id').custom(mismoUsuario),
    validarInputs
], eliminarNota)


module.exports = router;