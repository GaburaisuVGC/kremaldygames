const Altcoin = require('../schemas/altcoin');
const User = require('../schemas/user');
const cron = require('cron');
const { stringify } = require('nodemon/lib/utils');
const mongoose = require('mongoose');


const job1 = new cron.CronJob('00 * * * * *', async function() {
    function randomIntFromInterval(min, max) { // min and max included 
        return (Math.random() * (max - min ) + min)
      }
    const greedcoin = await Altcoin.findOne({ valid: true});
    const minval = stringify(greedcoin.minval);
    const floatminval = parseFloat(minval);
    const maxval = stringify(greedcoin.maxval);
    const floatmaxval = parseFloat(maxval);
    const rndInt = randomIntFromInterval(floatminval, floatmaxval)
    
	await console.log("Altcoin changed value");
} else if (interaction.user.id != "414311854614118401") {
    await interaction.reply({
      content: "Cette commande est exclusive au créateur du bot.",
      ephemeral: true,
    });
    const newgreedcoin = await Altcoin.findOne({ valid: true});
    function float2int (value) {
        return value | 0;
    }

    await Altcoin.findOneAndUpdate({ valid: true}, {valueInt : float2int(newgreedcoin.value)});
    const newintcoin = await Altcoin.findOne({ valid: true});
    console.log(newintcoin.valueInt);
});

job1.start()
