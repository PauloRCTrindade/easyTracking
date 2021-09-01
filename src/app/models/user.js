const mongoose = require('../../db/conexao');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    cnpj: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    nome: {
        type: String,
        required: true
    },

    senha: {
        type: String,
        required: true
    },

    passowordResetToken: {
        type: String,
        selected: false,
    },
    passwordResetExpires: {
        type: String,
        selected: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;
    next();
});


const User = mongoose.model('User', UserSchema);

module.exports = User;