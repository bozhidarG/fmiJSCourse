class SocketHandler {
    constructor(socket) {
        this.socket = socket;
    }

    init() {
        this.socket.on('positions', function(data){
            // //rework me i need to be something smart, this is retarded at the moment
            // let id = clients.filter(((id) => (elem) => {
            //     return elem != id;
            // })(this.socket.id))
            console.log('sdsdd');
            // this.socket.broadcast.to(id[0]).emit('positions', data);
        });

        this.socket.on('disconnect', function(data){
            // let index = clients.indexOf(this.socket.id);
            // clients.splice(index, 1);    
        })
    }

    getId() {
        return this.socket.id;
    }

    startGame(players, game)
    {
        
    }
}

module.exports = SocketHandler;