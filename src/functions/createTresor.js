const Tresor = require('../schemas/tresor');
const mongoose = require('mongoose');

module.exports = (client) => {
    client.createTresor = async () => {
        let tresorProfile = await Tresor.findOne();
            tresorProfile = await new Tresor({
                _id: mongoose.Types.ObjectId(),
                title: "Tresor Title",
                description: "Modifiez ce trésor dans votre base de données.",
                image: "",
                prix: 0,
            });
            await tresorProfile.save().catch(err => console.log(err));
            return tresorProfile;
    };
};