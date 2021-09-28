const mongoose = require('../../db/conexao');
const GrupoSchema = new mongoose.Schema({

    cnpj: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    razaoSocial: {
        type: String,
        required: true,
    },
    ativo: {
        type: Boolean,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const grupoEmpresa = mongoose.model('grupo-empresa', GrupoSchema);

module.exports = grupoEmpresa;