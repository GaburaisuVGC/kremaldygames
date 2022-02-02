const mongoose = require('mongoose');
const cardSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    rand: Number,
    niveau: String,
    text: String,
    amount: Number,
    image: { type: String, required: false}
});

module.exports = mongoose.model('Card', cardSchema, 'cards');