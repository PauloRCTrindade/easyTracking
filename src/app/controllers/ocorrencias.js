const express = require('express');
const Ocorrencias = require('../models/ocorrencias');
const authMiddlewares = require('../middlewares/auth');


const router = express.Router();

router.use(authMiddlewares);

router.get('/ocorrencias/:cnpj', async(req, res) => {
    try {

        const ocorrencia = await Ocorrencias.find({ cnpj: req.params.cnpj }).sort({ codOcorrencia: 1 });
        return res.status(200).send({ sucess: true, ocorrencias: ocorrencia });
    } catch (error) {
        return res.status(400).send({ sucess: false, error: error })
    }
});

router.get('/ocorrencias/:cnpj/:chave', async(req, res) => {
    try {

        const ocorrencia = await Ocorrencias.find({ cnpj: req.params.cnpj, chave: req.params.chave });
        return res.status(200).send({ sucess: true, ocorrencias: ocorrencia });
    } catch (error) {
        return res.status(400).send({ sucess: false, error: error })
    }
});


router.post('/ocorrencias/novo', async(req, res) => {
    const ocorrencias = req.body;
    const arr = ocorrencias;

    arr.forEach(async ocorrencia => {
        const ocor = await Ocorrencias.findOneAndUpdate({ cnpj: ocorrencia.cnpj, chave: ocorrencia.chave, codOcorrencia: ocorrencia.codOcorrencia }, { descOcorrencia: ocorrencia.descOcorrencia }, { new: true, upsert: true });
    });
    try {


        return res.status(200).send({ sucess: true, ocorrencias: "Ocorrencias inseridas com sucesso" });

    } catch (error) {

        return res.status(400).send({ sucess: false, error: error });
    }

});
module.exports = app => app.use('/app', router);