var express = require('express');

var routes = function(Material){
    var MaterialRouter = express.Router();

    var MaterialController = require('../Controllers/MaterialController')(Material)

    MaterialRouter.route('/')
        .post(MaterialController.post)
        .get(MaterialController.get)

    return MaterialRouter;
}

module.exports = routes;