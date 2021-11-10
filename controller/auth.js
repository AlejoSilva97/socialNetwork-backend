const {response} = require('express');
const bcrypt = require('bcrypt');

const Usuario = require('../models/User');
const { generateJWT } = require('../helpers/genjwt');

const login = async(req, res = response) => {

    const {email, password} = req.body;

    try {
        
        let user = await Usuario.findOne({email});

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o password incorrectos'
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o password incorrectos'
            });
        }

        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador !'
        });
    }

}

const userRegister = async(req, res = response) => {

    const {email, password} = req.body;

    try {
        
        let user = await Usuario.findOne({email});

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        user = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            ok: true,
            msg: 'User created successfully !'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador !'
        });
    }

}

const renewToken = async(req, res = response) => {

    const {uid, name} = req;

    //Generar JWT
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        token,
        uid, 
        name
    });

}

module.exports = {
    login,
    userRegister,
    renewToken
}

