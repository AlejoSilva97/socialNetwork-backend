const {Router} = require('express');
const { check } = require('express-validator');

const { fieldsValidate } = require('../middlewares/fieldsValidator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { createPublication } = require('../controller/publications');

const router = Router();

router.use( validarJWT );

router.post('/create',
    [
        check('file', 'El archivo es obligatorio').isObject(),
        fieldsValidate
    ],
    createPublication
);

module.exports = router;