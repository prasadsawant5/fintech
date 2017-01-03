'use strict'

var express = require('express');
var jwt = require('jsonwebtoken');

var router = express.Router();

var User = require('../models/user');
var Member = require('../models/member');
var Scheme = require('../models/scheme');
var FixedDeposit = require('../models/fixedDeposit');
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


router.post('/', function(req, res, next) {
    var decoded = jwt.decode(req.headers.token);

    var body = req.body;
    var schemeId;

    if (body.name === null || body.name === '') {
        return res.status(400).json({
            message: 'Please select a Scheme.',
            obj: null
        });
    }

    if (body.interestType === null || body.interestType === '') {
        return res.status(400).json({
            message: 'Please select an Interest Type.',
            obj: null
        });
    }

    if (body.interest === null || parseFloat(body.interest) === 0) {
        return res.status(400).json({
            message: 'Please enter a valid Interest Percentage.',
            obj: null
        });
    }

    if (body.interestCalculation === null || body.interestCalculation === '') {
        return res.status(400).json({
            message: 'Please select an Interest Calculation.',
            obj: null
        });
    }

    if (body.periodType === null || body.periodType === '') {
        return res.status(400).json({
            message: 'Please select a Period Type.',
            obj: null
        });
    }

    if (body.to === null || parseInt(body.to) === 0) {
        return res.status(400).json({
            message: 'Please enter a valid To(Start) Period.',
            obj: null
        });
    }

    if (body.from === null || parseInt(body.from) === 0) {
        return res.status(400).json({
            message: 'Please enter a valid From(End) Period.',
            obj: null
        });
    }

    if (body.schemeId === null || body.schemeId === '') {
        Scheme.findOne({ ledgerName: body.name }, function(err, scheme) {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: 'Scheme not found.',
                    obj: null
                });
            }

            if (scheme === null) {
                return res.status(500).json({
                    message: 'Scheme not found.',
                    obj: null
                }); 
            }

            var fixedDeposit = new FixedDeposit({
                name: body.name.toUpperCase(),
                details: [
                    {
                        interestType: body.interestType.toUpperCase(),
                        interest: parseFloat(body.interest),
                        specialInterest: parseFloat(body.specialInterest),
                        interestCalculation: body.interestCalculation.toUpperCase(),
                        periodType: body.periodType.toUpperCase(),
                        to: parseInt(body.to),
                        from: parseInt(body.from)
                    }
                ],
                schemeId: scheme._id,
                createdBy: decoded.user._id,
                createdAt: new Date()
            });

            fixedDeposit.save(function(err, fd) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        message: 'Unable to save the plan.',
                        obj: null
                    });
                }

                if (fd === null) {
                    return res.status(500).json({
                        message: 'Unable to save the plan.',
                        obj: null
                    }); 
                }

                res.status(201).json({ message: 'Plan saved successfully.', obj: fd });
            });
        });
    } else {
        var fixedDeposit = new FixedDeposit({
            name: body.name.toUpperCase(),
            details: [
                {
                    interestType: body.interestType.toUpperCase(),
                    interest: parseFloat(body.interest),
                    specialInterest: parseFloat(body.specialInterest),
                    interestCalculation: body.interestCalculation.toUpperCase(),
                    periodType: body.periodType.toUpperCase(),
                    to: parseInt(body.to),
                    from: parseInt(body.from)
                }
            ],
            schemeId: body.schemeId,
            createdBy: decoded.user._id,
            createdAt: new Date()
        });

        fixedDeposit.save(function (err, fd) {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: 'Unable to save the plan.',
                    obj: null
                });
            }

            if (fd === null) {
                return res.status(500).json({
                    message: 'Unable to save the plan.',
                    obj: null
                });
            }

            res.status(201).json({ message: 'Plan saved successfully.', obj: fd });
        });
    }
});

module.exports = router;