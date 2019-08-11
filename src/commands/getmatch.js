const Command = require('../base/Command');
const Discord = require('discord.js');
const fetch = require('node-fetch');

class GetMatch extends Command {
    /**
     * @param {Daehria} client The client used in the command.
     */
    constructor(client) {
        super(client, {
            name: 'getmatch',
            description: 'Returns information about a live match in League of Legends.',
            category: 'Information',
            aliases: ['getmatch']
        });
    }

    /**
     * Returns information about a live match in League of Legends.
     * @param {Object} message The message object that triggered the command.
     */
    run(message, args) {
        const summoner = args[0];

        const result = fetch(
            `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${
                this.client.config.leagueToken
            }`
        )
            .then(res => res.json())
            .then(summoner => {
                return fetch(
                    `https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summoner.id}?api_key=${
                        this.client.config.leagueToken
                    }`
                );
            })
            .then(res => {
                return res.json();
            })
            .catch(error => {
                super.respond(`Something went wrong, please try again. ${error}`);
            });

        result
            .then(match => {
                if (match.status) throw `${match.status.message}`;

                const matchInfo = new Discord.RichEmbed()
                    .setTitle('Match Information')
                    .setDescription(this.help.description)
                    .setColor(0x00b405)
                    .addBlankField()
                    .setFooter(
                        `${this.client.user.username} at ${new Date().toDateString()}`,
                        this.client.user.avatarURL
                    );

                const addParticipants = new Promise((resolve, reject) => {
                    match.participants.forEach(participant => {
                        fetch(
                            `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${
                                participant.summonerId
                            }?api_key=${this.client.config.leagueToken}`
                        )
                            .then(res => res.json())
                            .then(summoner => {
                                summoner = summoner[0];

                                matchInfo.addField(
                                    summoner.summonerName,
                                    `${summoner.tier} ${summoner.leaguePoints}LP`
                                );
                            })
                            .catch(error => {
                                super.respond(`Something went wrong, could not retrieve summoner stats. ${error}`);
                            });
                    });

                    resolve();
                });

                addParticipants.then(() => {
                    setTimeout(() => {
                        super.respond({ embed: matchInfo });
                    }, 1000);
                });
            })
            .catch(error => {
                super.respond(`Something went wrong, please try again. ${error}`);
            });
    }
}

module.exports = GetMatch;
