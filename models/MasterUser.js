var mongoose = require('mongoose'),
	// bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

var MasterUser = new Schema({
    username: { type: String, required: true, useCreateIndex: true },
    password: { type: String, required: true }
});

MasterUser.methods.verifyPassword = function(password) {
	var res = (password === this.password) ? true : false
	return res
  //callback(bcrypt.compareSync(password, this.password));
};

module.exports= mongoose.model('MasterUser', MasterUser);
