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
        const blue = new Discord.RichEmbed().setColor(1127128);
        const red = new Discord.RichEmbed().setColor(14177041);
        const currentEmbed = blue;
        let counter = 0;

        try {
            const participants = await this.leagueService.getGameBySummonerName(summonerName);

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

                counter === 5 ? (currentEmbed = red) : (currentEmbed = blue);
            });

            super.respond(blue);
            super.respond(red);
        } catch (err) {
            super.respond(`Something went wrong, the summoner might not be in a game.`);
        }
    }
}

module.exports = GetMatch;
