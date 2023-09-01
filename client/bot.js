const discord = require('discord.js');

const client = new discord.Client({
    intents: [
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMembers,
        discord.GatewayIntentBits.GuildModeration,
        discord.GatewayIntentBits.GuildMembers,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.GuildMessageReactions,
        discord.GatewayIntentBits.GuildPresences,
        discord.GatewayIntentBits.GuildVoiceStates,
        discord.GatewayIntentBits.GuildInvites,
        discord.GatewayIntentBits.GuildMessageTyping,
        discord.GatewayIntentBits.DirectMessages,
        discord.GatewayIntentBits.DirectMessageReactions,
        discord.GatewayIntentBits.DirectMessageTyping,
    ],
});

const config = require('../config.js');

console.log('Starting Bot...');

async function updateStats() {
    const rolestats = config.stats.roles;
    const channelstats = config.stats.channels;
    const messagestats = config.stats.messages;

    const guild = await client.guilds.fetch(config.guildid);

    rolestats.forEach(async rolestat => {
        if (rolestat.enabled) {
            const role = guild.roles.cache.get(rolestat.role);
            // get ammount of members with role
            const members = role.members.size;
            // set channel name to ammount of members with role
            const channel = guild.channels.cache.get(rolestat.channel);
            // Update Channel Name
            channel.setName(rolestat.name.replace('{counter}', members));
        }
    })

    channelstats.forEach(channelstat => {
        if (channelstat.enabled) {
            // get all channels of each category in channelstats.categoys
            let channels = 0
            channelstat.categorys.forEach(async category => {
                const categorychannels = guild.channels.cache.filter(channel => channel.parentId === category);
                channels += categorychannels.size;
            })
            // set channel name to ammount of channels in category
            const channel = guild.channels.cache.get(channelstat.channel);
            // Update Channel Name
            channel.setName(channelstat.name.replace('{counter}', channels));
        }
    })

    messagestats.forEach(async messagestat => {
        if (messagestat.enabled) {
            // get all messages in channel
            const channel = guild.channels.cache.get(messagestat.channel_of_messages);
            // set channel name to ammount of messages in channel
            const channelmessages = await channel.messages.fetch()
            // get the ammount of messages
            const ammountofmsgs = channelmessages.size
            // set channel name to ammount of messages in channel
            const channel2 = guild.channels.cache.get(messagestat.channel);
            // Update Channel Name
            channel2.setName(messagestat.name.replace('{counter}', ammountofmsgs));
        }
    })
}

client.on('ready', () => {
    updateStats();
    setInterval(async () => {
        await updateStats();
    }, config.stats.intervall)
})

client.login(config.bot.token);
