const Card = require('../schemas/card');
const mongoose = require('mongoose');

module.exports = (client) => {
    client.createCard = async () => {
        let cardProfile = await Card.findOne();
            cardProfile = await new Card({
                _id: mongoose.Types.ObjectId(),
                title: "Card Title",
                niveau: "LÉGENDAIRE",
                text: "Modifiez cette carte dans votre base de données.",
                amount: -100,
                image: "",
                hasTresor: false,
                hasPersonnage: "",
                compensation: 0,
            });
            await cardProfile.save().catch(err => console.log(err));
            return cardProfile;
    };
};