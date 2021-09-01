const express = require('express');
const unidadesEmpresa = require('../models/unidades-empresa');

const router = express.Router();

router.post('/unidade/novo', async(req, res) => {
    const sigla = req.body.siglaUnidade;
    const cnpj = req.body.cnpj;
    try {
        if (await unidadesEmpresa.findOne({ cnpj, sigla })) {
            return res.status(400).send({ error: 'Unidade ja cadastrada!' })
        }
        await unidadesEmpresa.create(req.body);
        return res.status(200).send(ok);


    } catch (err) {
        return res.status(400).send({ error: 'Falha em registrar Unidade!' });
    }

});
module.exports = app => app.use('/app', router);