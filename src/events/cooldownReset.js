const User = require('../schemas/user');
const cron = require('cron');
const mongoose = require('mongoose');


const job = new cron.CronJob('00 00 * * * *', async function() {
	await console.log("Le cooldown est remis à zéro.");
    await User.updateMany({ onCooldown: true }, { onCooldown: false });
});

job.start()
