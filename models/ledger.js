'use strict';

var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var db = require('./db.js');

var Schema = mongoose.Schema;

var ledgerSchema = new Schema({
    name: { type: String, required: true, uppercase: true },
    type: { type: String, required: true, uppercase: true, enum: ['ASSET', 'LIABILITY'] },
    createdAt: Date,
    updatedAt: Date
});

ledgerSchema.plugin(mongooseUniqueValidator);

ledgerSchema.pre('save', function(callback) {
    var ledger = this;
    
    ledger.createdAt = new Date();
    ledger.updatedAt = new Date();

    callback();
});

var Ledger = mongoose.model('Ledger', ledgerSchema);
module.exports = Ledger;