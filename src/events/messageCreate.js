const Balance = require("../schemas/balance");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    const balanceProfile = await client.createBalance(message.member);
    const amount = Math.floor(Math.random() * 2) + 1;
    if (message.member.id != "937797776748724284") {
      try {
        await Balance.findOneAndUpdate(
          { _id: balanceProfile._id },
          { amount: (balanceProfile.amount += amount) }
        );
      } catch (error) {
        console.log(error);
      }
    }
  },
};
