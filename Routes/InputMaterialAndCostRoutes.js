var express = require('express');

var routes = function(InputMaterialAndCost){
    var inputMaterialAndCostRouter = express.Router();

    var inputMaterialAndCostController = require('../Controllers/InputMaterialAndCostController')(InputMaterialAndCost)

    inputMaterialAndCostRouter.route('/')
        .post(inputMaterialAndCostController.post)
        .get(inputMaterialAndCostController.get)

    return inputMaterialAndCostRouter;
}

module.exports = routes;