var BaseController = require('./BaseController.js');
var UserModel = require('../models/UserModel.js');

class UserController extends BaseController {
    constructor(username, password) {
        super();
        this.username = username;
        this.password = password;
    }

    register() {
        new UserModel().registerUser(this.username, this.password);
    }

    login() {
        new UserModel().loginUser(this.username, this.password);
    }
}

module.exports = UserController;