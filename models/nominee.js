'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var db = require('./db.js');

var Schema = mongoose.Schema;

var nomineeSchema = new Schema({
    firstName: { type: String, required: true, uppercase: true },
    middleName: { type: String, required: true, uppercase: true },
    lastName: { type: String, required: true, uppercase: true },
    age: { type: Number, required: true },
    relation: { type: String, required: true, uppercase: true },
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: Date,
    updatedAt: Date
});

nomineeSchema.plugin(mongooseUniqueValidator);

nomineeSchema.pre('save', function(callback) {
    var nominee = this;
    nominee.updatedAt = new Date();
    callback();
});
    
var Nominee = mongoose.model('Nominee', nomineeSchema);
module.exports = Nominee;