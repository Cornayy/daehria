const { RichEmbed } = require('discord.js');
const CATEGORIES = require('../../constants/Categories');
const ERROR_MESSAGES = require('../../constants/ErrorMessages');
const Command = require('../../Command');
const Logger = require('../../utils/Logger');

class GetMatch extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'getmatch',
            description: 'Returns the solo/duo rank from the participants in a league game.',
            category: CATEGORIES.UTILITY,
            aliases: ['getmatch', 'match'],
            args: ['<summoner>']
        });

        this.leagueService = this.client.services.get('LeagueService');
    }

    /**
     * Returns the solo/duo rank from the participants in a league game..
     * @param {Object} message The message object that triggered the command.
     * @param {Array} args The given arguments for the command.
     */
    async run(message, args) {
        if (args.length === 0) return;

        const summonerName = args.join('%20');
        const blueTeam = new RichEmbed().setColor(1127128);
        const redTeam = new RichEmbed().setColor(14177041);

        try {
            const participants = await this.leagueService.getGameBySummonerName(summonerName);
            let currentEmbed = {};

            await participants.forEach((participant, counter) => {
                counter >= 5 ? (currentEmbed = redTeam) : (currentEmbed = blueTeam);

                const summoner = participant.find(
                    summoner => summoner.queueType === 'RANKED_SOLO_5x5'
                );
                this.addSummoner(summoner, currentEmbed);
            });

            super.respond(blueTeam).respond(redTeam);
        } catch (err) {
            super.respond(ERROR_MESSAGES.GENERAL);
            Logger.error(err);
        }
    }

    addSummoner(summoner, embed) {
        if (summoner) {
            this.addRankedSummoner(summoner, embed);
        } else {
            this.addUnrankedSummoner(summoner, embed);
        }
    }

    addRankedSummoner(summoner, embed) {
        const rank = this.client.emojis.find(
            emoji => emoji.name === `${summoner.tier.toLowerCase()}`
        );

        embed.addField(
            summoner.summonerName,
            `${rank} ${summoner.tier} - ${summoner.rank} ${
                summoner.leaguePoints
            }LP [**op.gg**](https://euw.op.gg/summoner/userName=${summoner.summonerName
                .split(' ')
                .join('+')})`
        );
    }

    addUnrankedSummoner(summoner, embed) {
        const rank = this.client.emojis.find(emoji => emoji.name === 'unranked');
        const { participant } = summoner;

        embed.addField(
            participant.summonerName,
            `${rank} UNRANKED [**op.gg**](https://euw.op.gg/summoner/userName=${participant.summonerName
                .split(' ')
                .join('+')})`
        );
    }
}

module.exports = GetMatch;
