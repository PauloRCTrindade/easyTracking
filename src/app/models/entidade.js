const mongoose = require('../../db/conexao');
const EntidadeSchema = new mongoose.Schema({

    cnpj: {
        type: String,
        unique: true,
        required: true,
    },
    razaoSocial: {
        type: String,
        unique: true,
        required: true,
    },
    logradouro: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    complemento: {
        type: String,
        required: false
    },
    bairro: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    uf: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: false
    },
    longitude: {
        type: String,
        required: false
    },
    telefone: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const entidade = mongoose.model('entidade', EntidadeSchema);

module.exports = entidade;