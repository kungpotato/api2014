var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MasterUnit = new Schema({
    unit: {type: String},
    isChecked: {type: Boolean, default: false }
});

module.exports= mongoose.model('MasterUnit', MasterUnit)