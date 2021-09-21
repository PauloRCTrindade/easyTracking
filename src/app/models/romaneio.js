const mongoose = require('../../db/conexao');
const RomaneioSchema = new mongoose.Schema({

    unidadesEmpresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "unidades-empresa"
    },
    cnpj: {
        type: String,
        index: true,
        required: true,
    },
    unidade: {
        type: String,
        index: true,
        required: true,
    },
    romaneio: {
        type: Number,
        index: true,
        required: true,
    },
    cpfMotorista: {
        type: String,
        required: true
    },
    veiculo: {
        type: String,
        required: true
    },

    dataEmissao: {
        type: Date,
        required: true
    },
    dataHoraRegistro: {
        type: Date,
        default: Date.now,
        required: true
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
    docsDistribuicao: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'docs-distribuicao'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const romaneio = mongoose.model('romaneio', RomaneioSchema);

module.exports = romaneio;