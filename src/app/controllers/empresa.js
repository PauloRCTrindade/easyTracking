const express = require('express');
const GrupoEmpresa = require('../models/grupo-empresa');

const router = express.Router();

router.post('/empresa/novo', async(req, res) => {
    const { email } = req.body;
    try {
        if (await GrupoEmpresa.findOne({ email })) {
            return res.status(400).send({ error: 'Empresa ja cadastrada!' })
        }
        await GrupoEmpresa.create(req.body);
        return res.status(200).send(ok);

    } catch (err) {
        return res.status(400).send({ error: 'Falha em registrar Empresa!' });
    }

});
module.exports = app => app.use('/app', router);