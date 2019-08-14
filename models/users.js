var mongoose = require('mongoose');
var Bcrypt = require('bcryptjs');
var uniqueValidator = require('mongoose-unique-validator');


//defines the user model schema
var UserModelSchema = mongoose.Schema({
    email: {type: String, required: true, lowercase: true, unique: true },
    password: { type: String, requred: true }
},{
    timestamps: { createdAt: true, updatedAt: false }
});


//useful in password verification
UserModelSchema.methods.passwordVerification = function(password){
    console.log('password', password, 'this.password', this.password)
    return Bcrypt.compareSync(password, this.password);
}


//validates emails 
UserModelSchema.path('email').validate((email) => {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    // console.log('hahahhaha', email)
    return emailRegex.test(email);
}, 'The e-mail field cannot be empty.')


UserModelSchema.plugin(uniqueValidator);

module.exports = mongoose.model('UserModelSchema', UserModelSchema);
