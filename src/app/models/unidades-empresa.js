const mongoose = require('../../db/conexao');

const UnidadesSchema = new mongoose.Schema({
    grupo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GrupoEmpresa",
        required: true
    },
    cnpj: {
        type: String,
        unique: true,
        required: true,
    },
    siglaUnidade: {
        type: String,
        unique: true,
        required: true,
    },
    razaosocial: {
        type: String,
        required: true,
    },
    ativo: {
        type: Boolean,
        required: true
    },
    contato: {
        type: String,
        required: true,
    },
    endereco: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Endereco",
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }

});


const unidadesEmpresa = mongoose.model('unidades-empresa', UnidadesSchema);

module.exports = unidadesEmpresa;