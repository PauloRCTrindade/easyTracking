const mongoose = require('../../db/conexao');

const EnderecoSchema = new mongoose.Schema({

    tipoEndereco: {
        type: String,
        require: true
    },
    logradouro: {
        type: String,
        require: true
    },
    numero: {
        type: String,
        require: true
    },
    complemento: {
        type: String,
        require: false
    },
    cep: {
        type: String,
        require: true
    },
    bairro: {
        type: String,
        require: true
    },
    cidade: {
        type: String,
        require: true
    },
    uf: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});


const Endereco = mongoose.model('endereco', EnderecoSchema);

module.exports = Endereco;