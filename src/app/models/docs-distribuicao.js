const mongoose = require('../../db/conexao');
const DistribuicaoSchema = new mongoose.Schema({

    romaneio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "romaneio"
    },
    sequencia: {
        type: Number,
        required: true,
    },
    tipoDoc: {
        type: String,
        index: true,
        required: true,
    },
    unidade: {
        type: String,
        index: true,
        required: true,
    },
    numero: {
        type: String,
        index: true,
        required: true,
    },
    chave: {
        type: String,
        index: true,

    },
    remetente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "entidade"
    },
    destinatario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "entidade"
    },
    tipo: {
        type: String,
        required: false
    },
    pesoReal: {
        type: Number
    },
    pesoCubado: {
        type: Number
    },
    volumes: {
        type: Number
    },
    dataHoraRegistro: {
        type: Date,
        default: Date.now,
        required: true
    },
    dataHotaChegada: {
        type: Date,
        required: false
    },
    dataHotaSaida: {
        type: Date,
        required: false
    },

    status: {
        type: String,
        required: true,
        default: 'AG'
    },
    tmsIntegrado: {
        type: Boolean,
        default: false
    },
    appIntegrado: {
        type: Boolean,
        default: false,
    },

    dadosRecebedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dados-recebedor"
    },


    createdAt: {
        type: Date,
        default: Date.now,
        selected: false,
    }

});

const docsDistribuicao = mongoose.model('docs-distribuicao', DistribuicaoSchema, 'docs-distribuicao');

module.exports = docsDistribuicao;