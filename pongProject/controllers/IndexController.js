var BaseController = require('./BaseController.js');

class IndexController extends BaseController {
    indexAction() {
        this.request.render('index/index')
    }

    loginAction() {
        this.request.render('index/login')
    }
}



module.exports = IndexController;