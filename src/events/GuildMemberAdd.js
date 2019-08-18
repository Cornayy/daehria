const { RichEmbed } = require('discord.js');

class GuildMemberAdd {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * Sends a welcome message to a new member.
     * @param {Object} message
     */
    run(member) {
        const channel =
            member.guild.channels.find(ch => ch.name === 'member-log') ||
            member.guild.channels.find(ch => ch.name === 'general');

        if (!channel) return;

        const embed = new RichEmbed()
            .setTitle(`Welcome: ${member.user.username}`)
            .setDescription(`Welcome ${member.user} to **${member.guild.name}**!`)
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
