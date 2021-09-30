const mongoose = require('../../db/conexao');

const ImagensSchema = new mongoose.Schema({

    name: String,
    size: Number,
    url: String,
    recebedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dados-recebedor',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const imagens = mongoose.model('imagens', ImagensSchema, 'imagens');

module.exports = imagens;