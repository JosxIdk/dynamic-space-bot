const Discord = require('discord.js');
const timer = new Discord.Collection();
const { falseEmbed } = require('../Utils/utilities');

module.exports = async(client, message) => {
    const distube = client.distube;
    if(message.author.bot) return;
    if(message.guild && !message.channel.permissionsFor(client.user.id)?.has('SEND_MESSAGES')) return;
    const prefix = await client.prefix(message);
    if(message.content.startsWith(prefix)) {
        const args = message.content.substring(prefix.length).trimEnd().split(/ +/g);
        const command = args.shift().toLowerCase()
        const cmd = client.comandos.get(command) || client.comandos.find(a => a.aliases.includes(command));
        if(cmd) {
            if(cmd.devOnly && !['838812671100321843', '811810262893461565'].includes(message.author.id)) return message.channel.send(falseEmbed('This command can be only executed by a server owner'));
            if(!message.guild && cmd.guildOnly) return message.channel.send(falseEmbed('This command can be only executed in a guild'));
            try {
                await cmd.run(client, message, args, distube);
            } catch(err) {
                if(err.name === 'StructureError') return message.channel.send(err.message).catch(() => { });
                console.error(err);
            }
        }
    }
}