const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    memberId: String,
    amount: { type: Number, default: 1000 },
    tresor: Number,
    persosList : Array,
    freerolls: Number,
    onCooldown: Boolean,
    gc: Boolean,
    amountGC: mongoose.Schema.Types.Decimal128,

});

module.exports = mongoose.model('User', userSchema, 'users');