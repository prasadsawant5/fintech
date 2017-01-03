'use strict';

var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var db = require('./db.js');

var Schema = mongoose.Schema;

var schemeSchema = new Schema({
    ledgerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ledger', required: true },
    ledgerNature: { type: String, required: true, uppercase: true, ref: 'Ledger' },
    ledgerName: { type: String, required: true, uppercase: true, ref: 'Ledger' },
    ledgerType: { type: String, required: true, uppercase: true, ref: 'Ledger' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: Date,
    updatedAt: Date
});

schemeSchema.plugin(mongooseUniqueValidator);

schemeSchema.pre('save', function(callback) {
    var scheme = this;
    scheme.updatedAt = new Date();
    callback();
});
    
var Scheme = mongoose.model('Scheme', schemeSchema);
module.exports = Scheme;