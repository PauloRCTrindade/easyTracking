const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const authConfig = require('../../config/auth.json');
const mailer = require('../../modules/mailer');
const path = require('path');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
};

const router = express.Router();

router.post('/register', async(req, res) => {
    const { cnpj } = req.body;
    try {
        if (await User.findOne({ cnpj })) {
            return res.status(400).send({ error: 'Usuário ja cadastrado!' })
        }
        const user = await User.create(req.body);

        user.senha = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id })
        });
    } catch (err) {
        return res.status(400).send({ error: 'Falha em registrar usuário!' });
    }

});

router.post('/authenticate', async(req, res) => {
    const { cnpj, senha } = req.body;

    const user = await User.findOne({ cnpj }).select('+senha');

    if (!user)
        return res.status(400).send({ error: 'Usuario não cadastrado!' });

    if (!await bcrypt.compare(senha, user.senha))
        return res.status(400).send({ error: 'Senha Invalida' });

    user.senha = undefined;


    return res.send({
        user,
        token: generateToken({ id: user.id })
    });
});

router.post('/forgot_password', async(req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(400).send({ error: 'User not found' });
    };

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date;
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
        '$set': {
            passwordResetToken: token,
            passwordResetExpires: now,
        }
    });

    mailer.sendMail({
        to: email,
        from: 'francamurca2011@gmail.com',
        template: 'auth/forgot_password',
        context: { token },

    }, (err) => {

        if (err) {
            console.log(path.resolve('./src/resources/mail/auth'));
            return res.status(400).send({ error: err + '  Cannot send forgot password email' });
        } else {
            res.status(200).send({ Ok })
        }

    });

    try {

    } catch (err) {
        res.status(400).send({ error: 'Error on forgot password, try again' });
    }


});

module.exports = app => app.use('/auth', router);