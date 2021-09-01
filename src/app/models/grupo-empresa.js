const mongoose = require('../../db/conexao');
const unidades = require('../../app/models/unidades-empresa');
const GrupoSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    razaosocial: {
        type: String,
        unique: true,
        required: true,
    },
    ativo: {
        type: Boolean,
        required: true
    },
    unidadesEmpresa: {
        type: [unidades.unidadesEmpresa],
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const grupoEmpresa = mongoose.model('grupo-empresa', GrupoSchema);

module.exports = grupoEmpresa;