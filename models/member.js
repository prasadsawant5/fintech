'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var db = require('./db.js');

var Schema = mongoose.Schema;

var memberSchema = new Schema({
    memberId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, uppercase: true },
    middleName: { type: String, required: true, uppercase: true },
    lastName: { type: String, required: true, uppercase: true },
    dob: Date,
    panNo: { type: String, required: true, unique: true, uppercase: true },
    aadharNo: { type: String, required: true, unique: true, uppercase: true },
    gender: { type: String, uppercase: true, enum: ['MALE', 'FEMALE'] },
    address: { type: String, uppercase: true, required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, unique: true, sparse: true },
    companyName: { type: String, uppercase: true },
    monthlyIncome: { type: Number },
    designation: { type: String, uppercase: true },
    department: { type: String, uppercase: true },
    officeAddress: { type: String, uppercase: true },    
    isActive: Boolean,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: Date,
    updatedAt: Date
});

memberSchema.plugin(mongooseUniqueValidator);

memberSchema.pre('save', function(callback) {
    var user = this;
    user.updatedAt = new Date();
    callback();
});
    
var Member = mongoose.model('Member', memberSchema);
module.exports = Member;