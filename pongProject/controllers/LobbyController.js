var BaseController = require('./BaseController.js');
var lobbyModelObject = require('../models/LobbyModel.js');

class LobbyController extends BaseController {

    makeGame(name, creator) {
        lobbyModelObject.makeGame(name, creator);
        
        return lobbyModelObject;
    }

    joinGame(name, competitor) {
        var game = lobbyModelObject.joinGame(name, competitor);
        
        return game;
    }

    getLobbyObject() {
        return lobbyModelObject;
    }
}

module.exports = LobbyController;