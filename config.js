require('dotenv').config()

const config = {}

config.guildid = '1140404810735173702'

config.bot = {
    token: process.env.TOKEN, // Bot Token (Change this in the .env File)
    user: {
        enabled: false, // If enabled the Name and Avatar will be overwritten and are permanent
        name: "Stats Bot",
        avatar: "https://media.discordapp.net/attachments/1061453021902544978/1140418112940945418/cdbz2.png",
    },
    color: "#2b2b2b", // Default Embed Color
    activity_enabled: true, // If disabled Bot wont override Activity (if multiple Bots are running on same Token)
    activitys: [
        {
            name: "through the matrix",
            type: "Watching",
            status: "idle",
        },
        {
            name: "with your data",
            type: "Playing",
            status: "dnd",
        },
        {
            name: "in your life",
            type: "Competing",
            status: "online",
        },
    ],
    intervall: 10 * 1000, // Intervall of Activity Change
};

config.stats = {
    intervall: 5 * 60 * 1000, // Intervall of Stats Change (min 5 Minutes)
    roles: [
        {
            enabled: true,
            name: "👥︱Memebrs: {counter}",
            role: "1140405831658110996",
            channel: "1147185633559842908"
        },
        {
            enabled: true,
            name: "👑︱Customers: {counter}",
            role: "1140405872250601523",
            channel: "1147185764233392188"
        },
        {
            enabled: true,
            name: "💕︱Boosters: {counter}",
            role: "1141020085272723547",
            channel: "1147185812413358141"
        }
    ],
    // Observers how may Channels are in a Category
    channels: [
        {
            enabled: true,
            name: "🎫︱Tickets: {counter}",
            categorys: ["1140462314743681186", "1140462360612589678", "1140459329242275930", "1140462467215007816"],
            channel: "1147185907049435216"
        }
    ],
    // Observers ammount of Messages in a Channel
    messages: [
        {
            enabled: true,
            name: "🙏︱Feedbacks: {counter}",
            channel_of_messages: "1140424294002868264",
            channel: "1147199154490196052"
        }
    ],
}

module.exports = config;