module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Ready !');

        client.user.setPresence({activities: [{name: `some games`, type: `PLAYING`}], status: 'online'});
    },
};