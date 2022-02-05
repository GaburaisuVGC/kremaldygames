const mongoose = require('mongoose');
const persoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: { type: String, required: true},
    image: { type: String, required: true},
    value: Number,
    belongsToSomeone: { type: Boolean, default: false},
    masterId: {type: String, required: false},
});

module.exports = mongoose.model('Perso', persoSchema, 'persos');