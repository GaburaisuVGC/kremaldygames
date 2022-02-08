const Perso = require('../schemas/perso');
const mongoose = require('mongoose');

module.exports = (client) => {
    client.createPerso = async () => {
        let persoProfile = await Perso.findOne();
            persoProfile = await new Perso({
                _id: mongoose.Types.ObjectId(),
                name: "Perso Name",
                description: "Modifiez ce personnage dans votre base de données.",
                image: "à modifier",
                value: 10000,
                masterId: "",
                onSale: 1,
            });
            await persoProfile.save().catch(err => console.log(err));
            return persoProfile;
    };
};