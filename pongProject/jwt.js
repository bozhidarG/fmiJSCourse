var jwt = require('jsonwebtoken');
var config = require('./configs');

var tokenObject = {
    sign: payload => jwt.sign(payload, config.jwt.secret),
    verify: token => new Promise((resolve, reject) =>
        jwt.verify(token, config.jwt.secret, (err, decode) =>
            err ? reject(err) : resolve(decode) 
        ) 
    )
};

module.exports = tokenObject;