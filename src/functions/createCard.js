const Card = require('../schemas/card');
const mongoose = require('mongoose');

module.exports = (client) => {
    client.createCard = async () => {
        let cardProfile = await Card.findOne();
            cardProfile = await new Card({
                _id: mongoose.Types.ObjectId(),
                title: "Card Title",
                rand: 0,
                niveau: "LÉGENDAIRE",
                text: "Modifiez cette carte dans votre base de données.",
                amount: 0,
                image: ""
            });
            await cardProfile.save().catch(err => console.log(err));
            return cardProfile;
    };
};