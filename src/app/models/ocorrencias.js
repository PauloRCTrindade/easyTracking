const mongoose = require('../../db/conexao');

const OcorrenciaSchema = new mongoose.Schema({

    cnpj: {
        type: String,
        index: true,
        require: true,

    },
    chave: {
        type: String,
        index: true,
        require: true,

    },
    codOcorrencia: {
        type: String,
        index: true,
        require: true,

    },
    descOcorrencia: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});


const Ocorrencias = mongoose.model('Ocorrencias', OcorrenciaSchema, 'ocorrencias');

module.exports = Ocorrencias;