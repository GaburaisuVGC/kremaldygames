const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    memberId: String,
    amount: { type: Number, default: 1000 },
    tresor: Number,
    tresorList : Array,
    persosList : Array,
    freerolls: Number,
    onCooldown: Boolean,

});

module.exports = mongoose.model('User', userSchema, 'users');