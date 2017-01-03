'use strict'

var express = require('express');
var jwt = require('jsonwebtoken');

var router = express.Router();

var User = require('../models/user');
var Member = require('../models/member');
var Scheme = require('../models/scheme');
var config = require('../util/config');

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


router.get('/', function (req, res, next) {
    var decoded = jwt.decode(req.headers.token);

    Scheme.find({}, function(err, schemes) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Not able to find all the schemes.',
                obj: null
            });
        }

        if (schemes === null) {
           return res.status(500).json({
                message: 'Not able to find all the schemes.',
                obj: null
            }); 
        }

        res.status(200).json({ message: 'Schemes found.', obj: schemes });
    });
});


router.post('/', function (req, res, next) {
    var body = req.body;

    if (body.ledgerId === null || body.ledgerId === '') {
        return res.status(400).json({
            message: 'Ledger information not found.',
            obj: null
        });
    }

    if (body.ledgerNature === null || body.ledgerNature === '') {
        return res.status(400).json({
            message: 'Please enter Ledger Nature.',
            obj: null
        });
    }

    if (body.ledgerName === null || body.ledgerName === '') {
        return res.status(400).json({
            message: 'Please enter Ledger Name.',
            obj: null
        });
    }

    var decoded = jwt.decode(req.headers.token);

    var scheme = new Scheme({
        ledgerId: body.ledgerId,
        ledgerNature: body.ledgerNature,
        ledgerName: body.ledgerName,
        ledgerType: body.ledgerType,
        createdBy: decoded.user._id,
        createdAt: new Date()
    });

    scheme.save(function(err, scheme) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Not able to save the scheme.',
                obj: null
            });
        }

        if (scheme === null) {
           return res.status(500).json({
                message: 'Not able to save the scheme.',
                obj: null
            }); 
        }

        res.status(201).json({ message: 'Scheme saved.', obj: scheme });
    });
});



module.exports = router;