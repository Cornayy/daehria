const Command = require('../base/Command');
const LeagueService = require('../services/LeagueService');
const Discord = require('discord.js');

class GetMatch extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'getmatch',
            description:
                'Returns the solo/duo rank from the participants in a league game. \n Use a summoner name as argument e.g. !getmatch Airhead',
            category: 'Information',
            aliases: ['getmatch']
        });
        this.leagueService = this.client.services.get('LeagueService');
    }

    /**
     * Returns the solo/duo rank from the participants in a league game..
     * @param {Object} message The message object that triggered the command.
     */
    async run(message, args) {
        if (args.length === 0) return;

        const summonerName = args.join('%20');
        const embed = new Discord.RichEmbed()
            .setTitle('Match Information')
            .setDescription(this.help.description)
            .setColor(0x00b405)
            .addBlankField()
            .setFooter(`${this.client.user.username} at ${new Date().toDateString()}`, this.client.user.avatarURL);

        try {
            const participants = await this.leagueService.getGameBySummonerName(summonerName);

            await participants.forEach(summonerInfo => {
                let summoner = summonerInfo.find(summoner => summoner.queueType === 'RANKED_SOLO_5x5');

                if (summoner) {
                    const rank = this.client.emojis.find(emoji => emoji.name === `${summoner.tier.toLowerCase()}`);

                    embed.addField(
                        summoner.summonerName,
                        `${rank} ${summoner.tier} - ${summoner.rank} ${
                            summoner.leaguePoints
                        }LP [**op.gg**](https://euw.op.gg/summoner/userName=${summoner.summonerName
                            .split(' ')
                            .join('+')})`
                    );
                } else {
                    const rank = this.client.emojis.find(emoji => emoji.name === 'unranked');
                    summoner = summonerInfo.participant;

                    embed.addField(
                        summoner.summonerName,
                        `${rank} UNRANKED [**op.gg**](https://euw.op.gg/summoner/userName=${summoner.summonerName
                            .split(' ')
                            .join('+')})`
                    );
                }
            });

            super.respond(embed);
        } catch (err) {
            super.respond(`Something went wrong, the summoner might not be in a game. ${err}`);
        }
    }
}

module.exports = GetMatch;
