const User = require('../schemas/user');
const mongoose = require('mongoose');

module.exports = (client) => {
    client.createUser = async (member) => {
        let userProfile = await User.findOne({ memberId: member.id});
        if (userProfile) {
            return userProfile;
        } else {
            userProfile = await new User({
                _id: mongoose.Types.ObjectId(),
                memberId: member.id,
                tresor: 0,
            });
            await userProfile.save().catch(err => console.log(err));
            return userProfile;
        }
       
    };
};