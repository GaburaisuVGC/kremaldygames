const mongoose = require('mongoose');
const tresorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    image: { type: String, required: false},
    rolls: Number,
});

module.exports = mongoose.model('Tresor', tresorSchema, 'tresors');