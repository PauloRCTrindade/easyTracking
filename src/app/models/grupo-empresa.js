const mongoose = require('../../db/conexao');
const unidades = require('../../app/models/unidades-empresa');
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

    // unidadesEmpresa: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "unidades-empresa"
    // }],

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const grupoEmpresa = mongoose.model('grupo-empresa', GrupoSchema);

module.exports = grupoEmpresa;