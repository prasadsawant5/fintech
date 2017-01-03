'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var db = require('./db.js');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    accessLevel: { type: String, require: true, uppercase: true, enum: ['MANAGER', 'ACCOUNTANT', 'CASHIER', 'SR. CLERK', 'JR CLERK', 'AGENT', 'DIRECTOR', 'SOFTWARE'] },
    createdAt: Date,
    updatedAt: Date
});

userSchema.plugin(mongooseUniqueValidator);

// userSchema.pre('save', function(callback) {
    
//     var user = this;
//     var currentDate = new Date();
    
//     user.createdAt = currentDate;
//     user.updatedAt = currentDate;
    
//     bcrypt.genSalt(5, function(error, salt) {
        
//         if (error)
//             return callback(error);
            
//         bcrypt.hash(user.password, salt, function(error, hash) {
            
//             if (error)
//                 return callback();
                
//             user.password = hash;
//             callback();
            
//         });
//     }); 
// });

// userSchema.methods.validPassword = function(password, user) {
//     return bcrypt.compareSync(password, user.password);
// };

// userSchema.methods.verifyPassword = function(password, user) {
//     return bcrypt.compare(password, user.password);
// };
    
var User = mongoose.model('User', userSchema);
module.exports = User;