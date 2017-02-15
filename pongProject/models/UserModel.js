class UserModel {
    registerUser(username, password) {
        var MongoClient = require('mongodb').MongoClient;
        var assert = require('assert');
            
        // Connection URL 
        var url = 'mongodb://localhost:27017/pong_project';
        // Use connect method to connect to the Server 
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");
            
            db.collection('user').insert({'name': username, 'pass': password});

        });        
    }

    loginUser(username, password) {
        var MongoClient = require('mongodb').MongoClient;
        var assert = require('assert');
            
        // Connection URL 
        var url = 'mongodb://localhost:27017/pong_project';
        // Use connect method to connect to the Server 
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");
            
            db.collection('user').find({'name': username, 'pass': password});
        });
    }
}

module.exports = UserModel;