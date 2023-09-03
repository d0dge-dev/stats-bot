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
    ],
});

const config = require('../config.js');

async function updateStats() {
    const rolestats = config.stats.roles;
    const channelstats = config.stats.channels;
    const messagestats = config.stats.messages;

    const guild = await client.guilds.fetch(config.guildid);

    rolestats.forEach(async rolestat => {
        if (rolestat.enabled) {
            const role = guild.roles.cache.get(rolestat.role);
            const members = role.members.size;
            const channel = guild.channels.cache.get(rolestat.channel);
            channel.setName(rolestat.name.replace('{counter}', members));
        }
    })

    channelstats.forEach(channelstat => {
        if (channelstat.enabled) {
            let channels = 0
            channelstat.categorys.forEach(async category => {
                const categorychannels = guild.channels.cache.filter(channel => channel.parentId === category);
                channels += categorychannels.size;
            })
            const channel = guild.channels.cache.get(channelstat.channel);
            channel.setName(channelstat.name.replace('{counter}', channels));
        }
    })

    messagestats.forEach(async messagestat => {
        if (messagestat.enabled) {
            const channel = guild.channels.cache.get(messagestat.channel_of_messages);
            const channelmessages = await channel.messages.fetch()
            const ammountofmsgs = channelmessages.size
            const channel2 = guild.channels.cache.get(messagestat.channel);
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