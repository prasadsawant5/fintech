'use strict'

var express = require('express');
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Member = require('../models/member');
var Ledger = require('../models/ledger');
var config = require('../util/config');

var router = express.Router();

router.all('/', function(req, res, next) {
    var token = req.headers.token;

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            return res.status(401).json({
                message: 'Not authenticated.',
                obj: err
            });
        }
    next();
  });
});


router.get('/', function(req, res, next) {
    Ledger.find({}, function(err, ledgers) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Not able to save member.',
                obj: err
            });
        }

        if (ledgers === null) {
            return res.status(500).json({
                message: 'Not able to save member.',
                obj: null
            });
        }

        res.status(200).json({ message: 'Ledgers found.', obj: ledgers});
    })
});

module.exports = router;