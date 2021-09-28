const mongoose = require('../../db/conexao');

const RecebedorSchema = new mongoose.Schema({
    documento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "docs-distribuicao",
        unique: true,
    },

    doc: {
        type: String,
        required: false,
        index: true
    },
    nome: {
        type: String,
        required: false,
        index: true
    },


    codOcorrencia: {
        type: String,
        required: false,
    },

    descOcorrencia: {
        type: String,
        required: false,
    },
    imagens: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'imagens'
    }],

    createdAt: {
        type: Date,
        default: Date.now,
        selected: false,
    }

});

const dadosRecebedor = mongoose.model('dados-recebedor', RecebedorSchema, 'dados-recebedor');

module.exports = dadosRecebedor;