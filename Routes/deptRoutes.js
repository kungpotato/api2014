var express = require('express');

var routes = function(Department){
    var DepartmentRouter = express.Router();

    var DepartmentController = require('../Controllers/DepartmentController')(Department)

    DepartmentRouter.route('/')
        .post(DepartmentController.post)
        .get(DepartmentController.get)

    return DepartmentRouter;
}

module.exports = routes;