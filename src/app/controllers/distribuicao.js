const express = require('express');
const Romaneio = require('../models/romaneio');
const DocsDistribuicao = require('../models/docs-distribuicao');
const Entidade = require('../models/entidade');
const Unidade = require('../models/unidades-empresa');
const authMiddlewares = require('../middlewares/auth');


const router = express.Router();

router.use(authMiddlewares);

router.get('/distribuicao/:cnpj', async(req, res) => {
    try {
        const romaneio = await Romaneio.find({ cnpj: req.params.cnpj }).populate({
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
        if (romaneio._id != '') {
            return res.status(200).send({ sucess: true, romaneio })
        } else {
            return res.status(500).send({ sucess: false, erro: 'Não existe Romaneio o motorista ou veículo informados!' })
        }

    } catch (error) {
        return res.status(400).send({ sucess: false, error })
    }
});

router.get('/distribuicao/carga/:motorista/:veiculo/:status', async(req, res) => {
    try {
        const romaneio = await Romaneio.find({ cpfMotorista: req.params.motorista, veiculo: req.params.veiculo, status: req.params.status }).populate({
            path: 'docsDistribuicao',
            populate: [{ path: 'remetente' }, { path: 'destinatario' }]
        });
        if (romaneio._id != '') {
            //   await Romaneio.findByIdAndUpdate({ _id: romaneio._id }, { appIntegrado: true, status: 'AN' }, { new: true });
            //   await DocsDistribuicao.updateMany({ romaneio: romaneio._id }, { appIntegrado: true, status: 'AN' }, { new: true });

            return res.status(200).send({ sucess: true, romaneio })
        } else {
            return res.status(500).send({ sucess: false, erro: 'Não existe Romaneio o motorista ou veículo informados!' })
        }

    } catch (error) {
        return res.status(400).send({ sucess: false, error })
    }
});

router.put('/distribuicao/carga/:romaneioId/:status', async(req, res) => {
    try {
        const romaneio = await Romaneio.findByIdAndUpdate({ _id: req.params.romaneioId }, { appIntegrado: true, status: req.params.status }, { new: true });
        await DocsDistribuicao.updateMany({ romaneio: req.params.romaneioId }, { appIntegrado: true, status: req.params.status }, { new: true });
        return res.status(201).send({ sucess: true, romaneio });
    } catch (error) {
        return res.status(400).send({ sucess: false, romaneio });
    }
});

router.put('/distribuicao/entrega/:documentoId', async(req, res) => {
    try {
        const documento = await DocsDistribuicao.findByIdAndUpdate({ romaneio: req.params.documentoId }, {...req.body }, { new: true });
        return res.status(201).send({ sucess: true, documento });
    } catch (error) {
        return res.status(400).send({ sucess: false, documento });
    }
});


router.get('/distribuicao/:romaneioId', async(req, res) => {
    try {
        const romaneio = await Romaneio.findById(req.params.romaneioId).populate(['docsDistribuicao', 'entidade']);
        return res.status(200).send(romaneio);
    } catch (err) {
        return res.status(400).send({ error: 'Erro em listar Romaneios', err })
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

            const rem = await Entidade.findOneAndUpdate({ cnpj: docDistribuicao.remetente.cnpj }, docDistribuicao.remetente, { new: true, upsert: true }, function(err, doc) {
                if (err) return res.status(500).send({ sucess: false, error: err });

            });

            const des = await Entidade.findOneAndUpdate({ cnpj: docDistribuicao.destinatario.cnpj }, docDistribuicao.destinatario, { new: true, upsert: true }, function(err, doc) {
                if (err) return res.send({ sucess: false, error: err });

            });

            const doc = await DocsDistribuicao.create({...docDistribuicao, romaneio: newRomaneio._id, remetente: rem._id, destinatario: des._id });
            await doc.save();

            await Romaneio.findOneAndUpdate({ _id: newRomaneio._id }, { $push: { docsDistribuicao: doc } });

        });

        await newRomaneio.save();


        return res.status(200).send({ sucess: true, romaneio: newRomaneio });

    } catch (error) {
        // console.log(err);
        return res.status(400).send({ sucess: false, error });
    }

});
module.exports = app => app.use('/app', router);