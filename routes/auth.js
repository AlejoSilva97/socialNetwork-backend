const {Router} = require('express');
const {check} = require('express-validator');

const { login, userRegister, renewToken } = require('../controller/auth');
const { fieldsValidate } = require('../middlewares/fieldsValidator');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
        check('password', 'La contraseña debe tener al menos 1 numero').matches(/\d/),//Expresion regular para almenos un numero
        check('password', 'La contraseña debe tener al menos 1 letra mayuscula').matches(/[A-Z]/),//Expresion regular para al menos una mayuscula
        fieldsValidate
    ],
    login
);

router.post('/register',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
        check('password', 'La contraseña debe tener al menos 1 numero').matches(/\d/),//Expresion regular para almenos un numero
        check('password', 'La contraseña debe tener al menos 1 letra mayuscula').matches(/[A-Z]/),
        fieldsValidate
    ],
    userRegister
);

router.get('/renew', validarJWT, renewToken);

module.exports = router;