const mongoose = require('mongoose');
const balanceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    memberId: String,
    amount: { type: Number, default: 1000 }
});

module.exports = mongoose.model('Balance', balanceSchema, 'balances');