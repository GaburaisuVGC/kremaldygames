const mongoose = require('mongoose');
const cardSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    niveau: String,
    text: String,
    image: { type: String, required: false}
});

module.exports = mongoose.model('Card', cardSchema, 'cards');