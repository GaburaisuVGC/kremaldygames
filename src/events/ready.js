module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {


        console.log('Kremaldy Games est prêt.');

        client.user.setPresence({activities: [{name: `some games to fill my Greed`, type: `PLAYING`}], status: 'online'});
    },
};