class GameModel {
    constructor(name, creator) {
        this.name = name;
        this.creator = creator;
        this.competitor = {};
    }

    joinGame(competitor) {
        this.competitor = competitor;
    }
}

module.exports = GameModel;