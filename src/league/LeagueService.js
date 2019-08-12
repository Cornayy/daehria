const fetch = require('node-fetch');

class LeagueService {
    /**
     * @param {String} apiKey The Riot API key.
     */
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    /**
     * Gets the summoner by name.
     * @param {String} summoner The name of the summoner.
     */
    getSummonerByName(summoner) {
        return fetch(
            `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${this.apiKey}`
        ).then(res => res.json());
    }

    /**
     * Gets the game by summoner id.
     * @param {String} summoner The id of the summoner.
     */
    getGameBySummonerId(id) {
        return fetch(
            `https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${id}?api_key=${this.apiKey}`
        ).then(res => res.json());
    }

    /**
     * Gets information about all the participants.
     * @param {Array} participants The participants.
     */
    getAllParticipants(participants) {
        return Promise.all(
            participants.map(participant =>
                fetch(
                    `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${
                        participant.summonerId
                    }?api_key=${this.apiKey}`
                )
                    .then(res => res.json())
                    .then(res => {
                        res.participant = participant;

                        return res;
                    })
            )
        );
    }

    /**
     * Gets the current match of the summoner.
     * @param {String} summoner The name of the summoner.
     */
    getMatchBySummonerName(summoner) {
        return this.getSummonerByName(summoner).then(summoner => this.getGameBySummonerId(summoner.id));
    }

    /**
     * Gets the current game of the summoner.
     * @param {String} summoner The name of the summoner.
     */
    getGameBySummonerName(summoner) {
        return this.getMatchBySummonerName(summoner).then(match => this.getAllParticipants(match.participants));
    }
}

module.exports = LeagueService;
