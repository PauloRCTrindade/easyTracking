const express = require('express');
const GrupoEmpresa = require('../models/grupo-empresa');
const UnidadesEmpresa = require('../models/unidades-empresa');
const Endereco = require('../models/endereco')
const authMiddlewares = require('../middlewares/auth');


const router = express.Router();

router.use(authMiddlewares);

router.get('/empresa', async(req, res) => {
    try {

        const empresas = await GrupoEmpresa.find().populate(['unidadesEmpresa']);
        return res.status(200).send({ empresas });
    } catch (err) {
        return res.status(400).send({ error: 'Erro em listas Grupo de empresas' })
    }
});

router.get('/empresa/:empresaId', async(req, res) => {
    try {
        const empresas = await GrupoEmpresa.findById(req.params.empresaId).populate('unidadesEmpresa');
        return res.status(200).send({ sucess: true, empresas });
    } catch {
        return res.status(400).send({ sucess: false, error })
    }
});

router.post('/empresa/novo', async(req, res) => {
    const { cnpj, razaoSocial, email, ativo, unidadesEmpresa } = req.body;
    try {
        if (await GrupoEmpresa.findOne({ cnpj })) {
            return res.status(400).send({ sucess: false, error: 'Empresa ja cadastrada!' })
        }
        const grupoEmpresa = await GrupoEmpresa.create({ cnpj, razaoSocial, email, ativo });

        unidadesEmpresa.map(unidadeEmpresa => {
            const unidades = new UnidadesEmpresa({...unidadeEmpresa, grupo: grupoEmpresa._id });

            unidades.save().then(unidadeEmpresa => grupoEmpresa.unidadesEmpresa.push(unidadeEmpresa));
        });

        await grupoEmpresa.save();



        return res.status(200).send({ sucess: true, grupoEmpresa });

    } catch (error) {
        // console.log(err);
        return res.status(400).send({ sucess: false, error });
    }

});
module.exports = app => app.use('/app', router);