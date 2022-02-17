const User = require("../schemas/user");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    const userProfile = await client.createUser(message.member);
    const amount = Math.floor(Math.random() * 29) + 1;
    if (message.member.id != "937797776748724284") {
      try {
        await User.findOneAndUpdate(
          { _id: userProfile._id },
          { amount: (userProfile.amount += amount) }
        );
      } catch (error) {
        console.log(error);
      }
    }
  },
};
