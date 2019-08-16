const Command = require('../base/Command');
const Discord = require('discord.js');
const logger = require('../utils/Logger');

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

        try {
            const participants = await this.leagueService.getGameBySummonerName(summonerName);
            const blueTeam = new Discord.RichEmbed().setColor(1127128);
            const redTeam = new Discord.RichEmbed().setColor(14177041);
            let currentEmbed = blueTeam;
            let counter = 0;

            await participants.forEach(summonerInfo => {
                let summoner = summonerInfo.find(summoner => summoner.queueType === 'RANKED_SOLO_5x5');

                if (summoner) {
                    const rank = this.client.emojis.find(emoji => emoji.name === `${summoner.tier.toLowerCase()}`);

                    currentEmbed.addField(
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

                    currentEmbed.addField(
                        summoner.summonerName,
                        `${rank} UNRANKED [**op.gg**](https://euw.op.gg/summoner/userName=${summoner.summonerName
                            .split(' ')
                            .join('+')})`
                    );
                }
                counter++;

                counter >= 5 ? (currentEmbed = redTeam) : (currentEmbed = blueTeam);
            });

            super.respond(blueTeam);
            super.respond(redTeam);
        } catch (err) {
            super.respond(`Something went wrong, the summoner might not be in a game.`);
            logger.error(err);
        }
    }
}

module.exports = GetMatch;
