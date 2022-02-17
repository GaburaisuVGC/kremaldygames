const mongoose = require('mongoose');
const altcoinSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    value: mongoose.Schema.Types.Decimal128,
    valid: Boolean,
    minval: mongoose.Types.Decimal128,
    maxval: mongoose.Types.Decimal128,
    valueInt: Number,
});

module.exports = mongoose.model('Altcoin', altcoinSchema, 'altcoins');