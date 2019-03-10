var express = require('express');

var routes = function(Unit){
    var UnitRouter = express.Router();

    var UnitController = require('../Controllers/UnitController')(Unit)

    UnitRouter.route('/')
        .post(UnitController.post)
        .get(UnitController.get)

    return UnitRouter;
}

module.exports = routes;