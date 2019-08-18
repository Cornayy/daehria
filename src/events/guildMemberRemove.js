const { RichEmbed } = require('discord.js');

class GuildMemberAdd {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * Sets the presence of the bot.
     * @param {Object} message
     */
    run(guild, member) {
        const channel =
            guild.channels.find(ch => ch.name === 'member-log') ||
            guild.channels.find(ch => ch.name === 'general');

        if (!channel) return;

        const embed = new RichEmbed()
            .setTitle(`Bye: ${member.user.username}`)
            .setDescription(
                `**${member.user.username}** has left or has been kicked from **${guild.name}**!`
            )
            .setColor(0x00b405)
            .setThumbnail(member.user.avatarURL)
            .setFooter(
                `${this.client.user.username} at ${new Date().toDateString()}`,
                this.client.user.avatarURL
            );

        channel.send(embed);
    }
}

module.exports = GuildMemberAdd;
