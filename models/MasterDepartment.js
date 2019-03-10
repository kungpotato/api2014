var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MasterDepartment = new Schema({
    department: {type: String},
    isChecked: {type: Boolean, default: false }
});

module.exports= mongoose.model('MasterDepartment', MasterDepartment);