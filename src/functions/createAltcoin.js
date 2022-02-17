const Altcoin = require('../schemas/altcoin');
const mongoose = require('mongoose');

module.exports = (client) => {
    client.createAltcoin = async () => {
        let altcoinProfile = await Altcoin.findOne();
            altcoinProfile = await new Altcoin({
                _id: mongoose.Types.ObjectId(),
                name: "XXX Coin",
                value: 0,
                minval: 0.98954,
                maxval: 1.011,
                valueInt: 0
            });
            await altcoinProfile.save().catch(err => console.log(err));
            return altcoinProfile;
    };
};