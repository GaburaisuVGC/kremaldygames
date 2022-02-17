const mongoose = require('mongoose');
const cardSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    niveau: String,
    text: String,
    amount: Number,
    image: { type: String, required: false},
    hasTresor: Boolean,
    hasPersonnage: String,
    compensation: Number,
    rolls: Number,
});

module.exports = mongoose.model('Card', cardSchema, 'cards');