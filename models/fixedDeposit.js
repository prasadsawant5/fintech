'use strict';

var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var db = require('./db.js');

var Schema = mongoose.Schema;

var fixedDepositSchema = new Schema({
    name: { type: String, required: true, uppercase: true },
    interestType: { type: String, require: true, uppercase: true, enum: ['SIMPLE', 'COMPOUND'] },
    interest: { type: Number, required: true },
    specialInterest: { type: Number, required: true },
    periodType: { type: String, required: true, uppercase: true, enum: ['DAYS', 'MONTHS'] },
    start: { type: Number, required: true },
    end: { type: Number, required: true },
    schemeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scheme', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: Date,
    updatedAt: Date
});

fixedDepositSchema.plugin(mongooseUniqueValidator);

fixedDepositSchema.pre('save', function(callback) {
    var fixedDeposit = this;
    fixedDeposit.updatedAt = new Date();
    callback();
});
    
var FixedDeposit = mongoose.model('FixedDeposit', fixedDepositSchema);
module.exports = FixedDeposit;