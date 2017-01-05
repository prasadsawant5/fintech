'use strict';

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


router.get('/', function(req, res, next) {
    var decoded = jwt.decode(req.headers.token);

    var name = req.headers.fdname.toUpperCase();

    if (name === null || name === '' || name === undefined) {
        return res.status(400).json({
            message: 'Please select a Scheme.',
            obj: null
        });
    }

    FixedDeposit.find({ name: name }, function(err, fds) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Unable to find Fixed Deposit Plan.',
                obj: null
            });
        }

        if (fds === null) {
            return res.status(500).json({
                message: 'Unable to find Fixed Deposit Plan.',
                obj: null
            });
        }

        res.status(200).json({ message: 'Plans found.', obj: fds });
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

    if (body.start === null || parseInt(body.start) === 0) {
        return res.status(400).json({
            message: 'Please enter a valid Start Period.',
            obj: null
        });
    }

    if (body.end === null || parseInt(body.end) === 0) {
        return res.status(400).json({
            message: 'Please enter a valid End Period.',
            obj: null
        });
    }

    if (parseInt(body.end) <= parseInt(body.start)) {
        return res.status(400).json({
            message: 'Start Period is less than End Period.',
            obj: null
        });
    }


    FixedDeposit.find({ $or: [{ name: body.name.toUpperCase(), start: { $gte: parseInt(body.start), $lte: parseInt(body.start) } }, { end: { $gte: parseInt(body.end), $lte: parseInt(body.end) } }] }, function (err, fds) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Unable to search another plan with the same period.',
                obj: null
            });
        }

        if (fds === null) {
            return res.status(500).json({
                message: 'Unable to search another plan with the same period.',
                obj: null
            });
        }

        if (fds.length > 0) {
            return res.status(400).json({
                message: 'A plan with the same Start and End period already exists.',
                obj: null
            });
        }

        if (body.schemeId === null || body.schemeId === '') {
            
            Scheme.findOne({ ledgerName: body.name }, function (err, scheme) {
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
                    interestType: body.interestType.toUpperCase(),
                    interest: parseFloat(body.interest),
                    specialInterest: parseFloat(body.specialInterest),
                    periodType: body.periodType.toUpperCase(),
                    start: parseInt(body.start),
                    end: parseInt(body.end),
                    schemeId: scheme._id,
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
            });
        } else {

            var fixedDeposit = new FixedDeposit({
                name: body.name.toUpperCase(),
                interestType: body.interestType.toUpperCase(),
                interest: parseFloat(body.interest),
                specialInterest: parseFloat(body.specialInterest),
                periodType: body.periodType.toUpperCase(),
                start: parseInt(body.start),
                end: parseInt(body.end),
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
});


router.patch('/', function(req, res, next) {
    var decoded = jwt.decode(req.headers.token);

    var body = req.body;

    if (body.name === null || body.name === '') {
        return res.status(400).json({
            message: 'Please select a Scheme.',
            obj: null
        });
    }

    FixedDeposit.find({ name: body.name }, function(err, fds) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Unable to search another plan with the same period.',
                obj: null
            });
        }

        if (fds === null) {
            return res.status(500).json({
                message: 'Unable to search another plan with the same period.',
                obj: null
            });
        }

        res.status(200).json({ message: fds.length + ' Fixed Deposit Plans found.', obj: fds });
    });

});


router.get('/plan', function(req, res, next) {
    var id = req.headers.id;

    if (id === null || id === '') {
        return res.status(400).json({
            message: 'Plan ID not found.',
            obj: null
        });
    }

    FixedDeposit.findById(id, function(err, fd) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Unable to find the Fixed Deposit plan.',
                obj: null
            });
        }

        if (fd === null) {
            return res.status(500).json({
                message: 'Unable to find the Fixed Deposit plan.',
                obj: null
            });
        }

        res.status(200).json({ message: 'Fixed deposit plan found.', obj: fd });
    })
});


router.patch('/plan', function(req, res, next) {
    var decoded = jwt.decode(req.headers.token);

    var body = req.body;

    if (req.headers.id === null || req.headers.id === '') {
        return res.status(400).json({
            message: 'Plan ID cannot be null.',
            obj: null
        });
    }

    FixedDeposit.findById(req.headers.id, function(err, fd) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Unable to search another plan with the same period.',
                obj: null
            });
        }

        if (fd === null) {
            return res.status(500).json({
                message: 'Unable to search another plan with the same period.',
                obj: null
            });
        }

        fd.name = body.name;
        fd.interest = parseFloat(body.interest);
        fd.specialInterest = parseFloat(body.specialInterest);
        fd.start = parseInt(body.start);
        fd.end = parseInt(body.end);

        if (body.interestType !== null && body.interestType !== '')
            fd.interestType = body.interestType;

        if (body.periodType !== null && body.periodType !== '')
            fd.periodType = body.periodType;

        fd.updatedBy = decoded.user._id;

        fd.save(function(err, newFd) {
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

            res.status(200).json({ message: 'Fixed Deposit Plans updated.', obj: fd });
        });
    });

});

module.exports = router;