var express = require('express');
var bodyParser = require('body-parser');
var SocketHandler = require('./network.js');

var Session = require('express-session');
var SessionStore = require('session-file-store')(Session);
session = Session({
    store: new SessionStore({ path: '../tmp/node/sessions' }),
    secret: 'pass',
    resave: true,
    saveUninitialized: true
});

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

players = {};
games = {};

io.use(function(socket, next) {
  session(socket.handshake, {}, next);
});
io.on('connection', function(socket){
    let username = socket.handshake.session.username;
    players.username = socket.id;

    let gameName = socket.handshake.session.game;

    if (gameName) {

        socket.join(gameName);

        if (games[gameName]) {
            games[gameName] += 1;
        } else {
            games[gameName] = 1;
        }

        if (games[gameName] == 2) {
            let playerType = socket.handshake.session.playerType;
            io.sockets.in(gameName).emit('gameStart', {player: playerType});
            console.log('gamestartsend');
        }
console.log(games, gameName);

        socket.on('disconnect', function(data){
            io.sockets.in(gameName).emit('gameEnd');
            socket.leave(gameName);
            games[gameName] -= 1;
        })

        socket.on('positions', function(data){
            // //rework me i need to be something smart, this is retarded at the moment
            // let id = clients.filter(((id) => (elem) => {
            //     return elem != id;
            // })(this.socket.id))
            console.log('sdsdd', data);
            socket.broadcast.to(gameName).emit('positions', data);
        });
    }


    // console.log(socket.handshake.session.username, SocketHandlerObj.getId());


});

var router = require('./routes.js')(io);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session)

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/', router);
app.use(express.static('public'))

http.listen(3000, function() {
    console.log('Server listening on 3000');
});