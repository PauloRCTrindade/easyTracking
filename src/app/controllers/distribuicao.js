const express = require('express');
const Romaneio = require('../models/romaneio');
const DocsDistribuicao = require('../models/docs-distribuicao');
const Entidade = require('../models/entidade');
const Unidade = require('../models/unidades-empresa');
const authMiddlewares = require('../middlewares/auth');


const router = express.Router();

router.use(authMiddlewares);

router.get('/distribuicao', async(req, res) => {
    try {
        const romaneio = await Romaneio.find().populate({
            path: 'docsDistribuicao',
            populate: [{ path: 'remetente' }, { path: 'destinatario' }]
        });
        return res.status(200).send(romaneio);
    } catch (error) {
        return res.status(400).send(error)
    }
});

router.get('/distribuicao/:motorista/:veiculo', async(req, res) => {
    try {
        const romaneio = await Romaneio.find({ cpfMotorista: req.params.motorista, veiculo: req.params.veiculo }).populate({
            path: 'docsDistribuicao',
            populate: [{ path: 'remetente' }, { path: 'destinatario' }]
        });
        return res.status(200).send(romaneio)
    } catch (error) {
        return res.status(400).send(error)
    }
});

router.get('/distribuicao/carga/:motorista/:veiculo/:status', async(req, res) => {
    try {
        const romaneio = await Romaneio.find({ cpfMotorista: req.params.motorista, veiculo: req.params.veiculo, status: req.params.status }).populate({
            path: 'docsDistribuicao',
            populate: [{ path: 'remetente' }, { path: 'destinatario' }]
        });
        return res.status(200).send(romaneio)
    } catch (error) {
        return res.status(400).send(error)
    }
});


router.get('/distribuicao/:romaneioId', async(req, res) => {
    try {
        const romaneio = await Romaneio.findById(req.params.romaneioId).populate(['docsDistribuicao', 'entidade']);
        return res.status(200).send(romaneio);
    } catch (err) {
        return res.status(400).send({ error: 'Erro em listar Romaneios' })
    }
});

router.post('/distribuicao/novo', async(req, res) => {
    const { cnpj, unidade, romaneio, cpfMotorista, veiculo, dataEmissao, docsDistribuicao } = req.body;
    const cnpjUnidade = cnpj;
    const siglaUnidade = unidade;
    const arr = docsDistribuicao;

    try { // Verifica se tem unidade cadastrado 
        const unidade = await Unidade.findOne({ cnpjUnidade, siglaUnidade });
        if (unidade == null) {
            return res.status(500).send({ error: 'Unidade não cadastrada!' });
        }
    } catch (error) {
        return res.status(400).send(error)
    };

    try {
        if (await Romaneio.findOne({ cnpj, unidade, romaneio })) {
            return res.status(400).send({ error: 'Romaneio ja existente na base de dados!' })
        }

        const newRomaneio = await Romaneio.create({ cnpj, unidade, romaneio, cpfMotorista, veiculo, dataEmissao });
        const arr = docsDistribuicao;
        arr.forEach(async docDistribuicao => {

            const rem = await Entidade.findOneAndUpdate({ cnpj: docDistribuicao.remetente.cnpj }, docDistribuicao.remetente, { upsert: true }, function(err, doc) {
                if (err) return res.send(500, { error: err });

            });

            const des = await Entidade.findOneAndUpdate({ cnpj: docDistribuicao.destinatario.cnpj }, docDistribuicao.destinatario, { upsert: true }, function(err, doc) {
                if (err) return res.send(500, { error: err });

            });

            const doc = await DocsDistribuicao.create({...docDistribuicao, romaneio: newRomaneio._id, remetente: rem._id, destinatario: des._id });
            await doc.save();

            await Romaneio.findOneAndUpdate({ _id: newRomaneio._id }, { $push: { docsDistribuicao: doc } });

        });

        await newRomaneio.save();


        return res.status(200).send(newRomaneio);

    } catch (error) {
        // console.log(err);
        return res.status(400).send(error);
    }

});
module.exports = app => app.use('/app', router);