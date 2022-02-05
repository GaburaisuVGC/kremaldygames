const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    memberId: String,
    amount: { type: Number, default: 1000 },
    tresor: Number,
    tresorList : Array, // Ajouter un index avec le trésor
    persos: Number,
    persosList : Array, // Ajouter un index avec le perso
});

module.exports = mongoose.model('User', userSchema, 'users');