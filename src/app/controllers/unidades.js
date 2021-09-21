const express = require('express');
const UnidadesEmpresa = require('../models/unidades-empresa');
const Grupo = require('../models/grupo-empresa');

const router = express.Router();

router.get('/unidade', async(req, res) => {
    try {
        const unidades = await UnidadesEmpresa.find().populate(['grupo']);
        return res.status(200).send({ sucess: true, unidades });
    } catch (error) {
        return res.status(400).send({ sucess: false, error });
    }
})

router.post('/unidade/novo', async(req, res) => {
    const { siglaUnidade, cnpjUnidade } = req.body;
    const raiz = cnpjUnidade.substr(0, 8);

    try {
        const grupoUni = await Grupo.findOne({ cnpj: new RegExp(raiz) });
        try {
            const unidade = await UnidadesEmpresa.findOne({ siglaUnidade, cnpjUnidade });
            if (unidade !== null && unidade !== undefined) {
                const updateUnidade = await UnidadesEmpresa.findByIdAndUpdate(unidade._id, req.body, { new: true });
                return res.status(201).send({ sucess: true, updateUnidade })
            }
            const newUnidade = await UnidadesEmpresa.create({...req.body, grupo: grupoUni._id });
            return res.status(201).send({ sucess: true, newUnidade });


        } catch (error) {
            return res.status(500).send({ sucess: false, erro: error });
        };
    } catch (error) {
        return res.status(400).send({ sucess: false, erro: error });
    };



});
module.exports = app => app.use('/app', router);