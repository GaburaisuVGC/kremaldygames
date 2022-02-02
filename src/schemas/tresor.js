const mongoose = require('mongoose');
const tresorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    image: { type: String, required: false},
    prix: Number,
});

module.exports = mongoose.model('Tresor', tresorSchema, 'tresors');