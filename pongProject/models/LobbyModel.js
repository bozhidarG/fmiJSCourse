var GameModel = require('../models/GameModel.js');

class LobbyModel {
    constructor() {
        this.games = [];
    }

    makeGame(name ,creator) {
        this.games[name] = new GameModel(name, creator);   
    }

    joinGame(name, competitor) {
        this.games[name].joinGame(competitor);

        return this.games[name];
    }
}

module.exports = new LobbyModel();