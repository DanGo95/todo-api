const { Router } = require('express');
const { check } = require('express-validator');
const { registro, login } = require('../controllers/auth');
const { emailExiste } = require('../helpers/db-validators');
const { validarInputs } = require('../middlewares/validar-inputs');

const router = Router();

router.post('/login', [
    check('email', 'Ingrese un email válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarInputs
], login)

router.post('/registro', [
    check('email', 'Ingrese un email válido').isEmail(),
    check('password', 'La contraseña debe tener por lo menos 6 caracteres').isLength({ min: 6 }),
    check('email').custom(emailExiste),
    validarInputs
], registro)


module.exports = router;