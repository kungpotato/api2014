var express = require('express');

var routes = function(User){
	console.log(passport)

    var UserRouter = express.Router();

    var UserController = require('../Controllers/UserController')(User)

    UserRouter.route('/')
        .post(UserController.post)
        .get(UserController.get)

    return UserRouter;
}

module.exports = routes;