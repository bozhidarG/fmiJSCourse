module.exports = function routerFunction(SocketHandlerObj) {

    //@TODO make the controllers load automaticly and not requeire them every time
    var router = require('express').Router();

    function checkAuthenticationMidSession(req, res, next) {
        if (req.session && req.session.username) {
            next();
        } else {
            res.redirect('/login');
        }
    }

    router.get('/index', checkAuthenticationMidSession, function(req, res) { // tova si e pove4e eksperiment maj shte go prepravqm
        IndexController = require('./controllers/IndexController.js');
        new IndexController(res).indexAction();
    });

    router.get('/login', function(req, res) { // tova si e pove4e eksperiment maj shte go prepravqm
        IndexController = require('./controllers/IndexController.js');
        new IndexController(res).loginAction();
    });

    router.get('/game', checkAuthenticationMidSession, function(req, res) {
        res.render('game')
    });

    router.post('/login', function(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        UserController = require('./controllers/UserController.js');
        new UserController(username, password).login();

        req.session.username = username;

        IndexController = require('./controllers/IndexController.js');
        new IndexController(res).indexAction();
    });

    router.post('/register', function(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        UserController = require('./controllers/UserController.js');
        new UserController(username, password).register();

        req.session.username = username;

        IndexController = require('./controllers/IndexController.js');
        new IndexController(res).indexAction();
    });

    router.post('/makeGame', checkAuthenticationMidSession, function(req, res) {
        var name = req.body.name; 
        var creator = req.session.username; //should make a object to handle the usermaking the request

        LobbyController = require('./controllers/LobbyController.js');
        var lobbyController = new LobbyController();

        var lobby = lobbyController.makeGame(name, creator);

        req.session.game = name;
        req.session.playerType = 'p1';

        res.redirect('/game');
    });

    router.get('/games', checkAuthenticationMidSession, function(req, res) {
        LobbyController = require('./controllers/LobbyController.js');
        var lobbyController = new LobbyController();

        var lobby = lobbyController.getLobbyObject();

        res.render('game/lobby', {
            lobby: lobby
        });
    });

    router.post('/joinGame', checkAuthenticationMidSession, function(req, res) {
        var gameName = req.body.gameName;
        var competitor = req.session.username;

        LobbyController = require('./controllers/LobbyController.js');
        var lobbyController = new LobbyController();

        var game = lobbyController.joinGame(gameName, competitor);

        req.session.game = gameName;
        req.session.playerType = 'p2';

        res.send(JSON.stringify(game));
    });

    return router;
}
