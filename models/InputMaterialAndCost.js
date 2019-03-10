var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InputMaterialAndCost = new Schema({
	periodCode: {type: String},  // running
	department: {type: String},
    dataTable:{type: Array},
});

module.exports= mongoose.model('InputMaterialAndCost', InputMaterialAndCost);