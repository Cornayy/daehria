const fetch = require('node-fetch');

class LeagueService {
  /**
   * @param {Daehria} client The client used for the bot.
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Creates a request.
   * @param {String} endpoint The endpoint of the query.
   * @param {String} param The parameter of the query.
   */
  createRequest(endpoint, param) {
    return fetch(
      `https://${this.client.config.league.region}.${endpoint}${param}?api_key=${this.client.config.league.token}`
    ).then(res => res.json());
  }

  /**
   * Gets the summoner by name.
   * @param {String} summoner The name of the summoner.
   */
  getSummonerByName(summoner) {
    return this.createRequest('api.riotgames.com/lol/summoner/v4/summoners/by-name/', summoner);
  }

  /**
   * Gets the game by summoner id.
   * @param {String} summoner The id of the summoner.
   */
  getGameBySummonerId(id) {
    return this.createRequest('api.riotgames.com/lol/spectator/v4/active-games/by-summoner/', id);
  }

  /**
   * Gets information about all the participants.
   * @param {Array} participants The participants.
   */
  getAllParticipants(participants) {
    return Promise.all(
      participants.map(participant =>
        this.createRequest(
          'api.riotgames.com/lol/league/v4/entries/by-summoner/',
          participant.summonerId
        ).then(res => {
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
  getMatchBySummonerName(summonerName) {
    return this.getSummonerByName(summonerName).then(summoner =>
      this.getGameBySummonerId(summoner.id)
    );
  }

  /**
   * Gets the current game of the summoner.
   * @param {String} summoner The name of the summoner.
   */
  getGameBySummonerName(summonerName) {
    return this.getMatchBySummonerName(summonerName).then(match =>
      this.getAllParticipants(match.participants)
    );
  }
}

module.exports = LeagueService;
