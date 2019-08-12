const Command = require('../base/Command');
const LeagueService = require('../league/LeagueService');
const Discord = require('discord.js');
const fetch = require('node-fetch');

class GetMatch extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'getmatch',
            description: 'Returns the solo/duo rank from the participants in a league game.',
            category: 'Information',
            aliases: ['getmatch']
        });
        this.leagueService = new LeagueService(this.client.config.leagueToken);
    }

    /**
     * Returns the solo/duo rank from the participants in a league game..
     * @param {Object} message The message object that triggered the command.
     */
    run(message, args) {
        const summonerName = args.join('%20');
        const embed = new Discord.RichEmbed()
            .setTitle(`Match Information: ${summonerName.replace('%20', ' ')}`)
            .setDescription(this.help.description)
            .setColor(0x00b405)
            .addBlankField()
            .setFooter(`${this.client.user.username} at ${new Date().toDateString()}`, this.client.user.avatarURL);

        this.leagueService
            .getGameBySummonerName(summonerName)
            .then(participants => {
                participants.forEach(summonerInfo => {
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
                        [summoner] = summonerInfo;

                        embed.addField(
                            summoner.summonerName,
                            `${rank} Unranked [**op.gg**](https://euw.op.gg/summoner/userName=${summoner.summonerName
                                .split(' ')
                                .join('+')})`
                        );
                    }
                });
            })
            .then(() => {
                super.respond(embed);
            })
            .catch(error => {
                super.respond(`Something went wrong, the summoner might not be in a game.`);
            });
    }
}

module.exports = GetMatch;
