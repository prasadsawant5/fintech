'use strict'

var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

var User = require('../models/user');
var Member = require('../models/member');
var Nominee = require('../models/nominee');
var config = require('../util/config');

const MOBILE_NO = /^\d{10}$/;
const EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PAN = /^[A-Z]{5}[0-9]{4}[A-Z]{1}/;

router.all('/', function (req, res, next) {
    var token = req.headers.token;

    jwt.verify(token, config.secret, function (err, decoded) {
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
    if (req.headers.id === null) {
        return res.status(400).json({ message: 'No Member ID provided.', obj: null });
    }

    Member.findById(req.headers.id, function (err, member) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Not able to save member.',
                obj: err
            });
        }

        if (member === null) {
            return res.status(500).json({
                message: 'Not able to save member.',
                obj: null
            });
        }

        Nominee.findOne({ memberId: member._id }, function(err, nominee) {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: 'Not able to save member.',
                    obj: err
                });
            }

            if (nominee === null) {
                return res.status(500).json({
                    message: 'Not able to save member.',
                    obj: null
                });
            }
            res.status(200).json({ message: 'Member found.', obj: member, nominee: nominee });
        });
    });
});


router.patch('/', function (req, res, next) {
    if (req.headers.id === null) {
        return res.status(400).json({ message: 'No Member ID provided.', obj: null });
    }

    var body = req.body;

    var decoded = jwt.decode(req.headers.token);

    if (!MOBILE_NO.test(body.mobile)) {
        return res.status(500).json({ message: 'Please enter a valid mobile number.', obj: null });
    }

    if (body.email !== null && body.email !== '' && body.email !== undefined) {
        if (!EMAIL.test(body.email)) {
            return res.status(500).json({ message: 'Please enter a valid email address.', obj: null });
        }
    }

    Member.findById(req.headers.id, function (err, member) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Not able to save member.',
                obj: err
            });
        }

        if (member === null) {
            return res.status(500).json({
                message: 'Not able to save member.',
                obj: null
            });
        }

        member.firstName = body.firstName.toUpperCase();
        member.middleName = body.middleName.toUpperCase();
        member.lastName = body.lastName.toUpperCase();

        if (body.email !== null && body.email !== undefined)
            member.email = body.email;

        member.mobile = body.mobile;
        member.panNo = body.panNo.toUpperCase();
        member.aadharNo = body.aadharNo.replace(' ', '');

        if (body.dob !== null && body.dob !== '')
            member.dob = body.dob;

        if (body.gender !== null && body.gender !== '')
            member.gender = body.gender.toUpperCase();

        member.address = body.address.toUpperCase();
        member.companyName = body.companyName.toUpperCase();
        member.designation = body.designation.toUpperCase();
        member.department = body.department.toUpperCase();
        member.monthlyIncome = body.monthlyIncome;
        member.officeAddress = body.officeAddress.toUpperCase();
        member.updatedBy = decoded.user._id;

        member.save(function (err, newMember) {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: 'Not able to save member.',
                    obj: err
                });
            }

            if (newMember === null) {
                return res.status(500).json({
                    message: 'Not able to save member.',
                    obj: null
                });
            }

            if (body.nomineeFirstName !== null && body.nomineeFirstName !== '' && 
                body.nomineeMiddleName !== null && body.nomineeMiddleName !== '' && 
                body.nomineeLastName !== null && body.nomineeLastName !== '' &&
                body.nomineeRelation !== null && body.nomineeRelation !== '' &&
                parseInt(body.nomineeAge) !== null && !isNaN(parseInt(body.nomineeAge))) {
                    Nominee.findOne({ memberId: newMember._id }, function(err, nominee) {
                        if (err) {
                            console.error(err);
                        }

                        if (nominee !== null) {
                            nominee.firstName = body.nomineeFirstName.toUpperCase();
                            nominee.middleName = body.nomineeMiddleName.toUpperCase();
                            nominee.lastName = body.nomineeLastName.toUpperCase();
                            nominee.relation = body.nomineeRelation.toUpperCase();
                            nominee.age = parseInt(body.nomineeAge);

                            nominee.save(function (err, newNominee) {
                                if (err)
                                    console.error(err);
                            });
                        }
                    })
            }

            res.status(200).json({ message: 'Member information updated.', obj: newMember });
        })

    })
})


router.post('/new', function (req, res, next) {
    var body = req.body;
    var decoded = jwt.decode(req.headers.token);
    var member;

    console.log(body);

    if (body.firstName === null || body.firstName === '') {
        return res.status(400).json({ message: 'Please enter a First Name.', obj: null });
    }

    if (body.middleName === null || body.middleName === '') {
        return res.status(400).json({ message: 'Please enter a Middle Name.', obj: null });
    }

    if (body.lastName === null || body.lastName === '') {
        return res.status(400).json({ message: 'Please enter a Last Name.', obj: null });
    }

    if (body.panNo === null || body.panNo === '') {
        return res.status(400).json({ message: 'Please enter a PAN number.', obj: null });
    }

    if (body.aadharNo === null || body.aadharNo === '') {
        return res.status(400).json({ message: 'Please enter the AADHAR number.', obj: null });
    }

    if (body.address === null || body.address === '') {
        return res.status(400).json({ message: 'Please enter an address.', obj: null });
    }

    if (body.mobile === null || body.mobile === '') {
        return res.status(400).json({ message: 'Please enter a valid mobile number.', obj: null });
    }

    if (!MOBILE_NO.test(body.mobile)) {
        return res.status(400).json({ message: 'Please enter a valid mobile number.', obj: null });
    }

    if (!PAN.test(body.panNo)) {
        return res.status(400).json({ message: 'Please enter a valid PAN number.', obj: null });
    }

    if (body.email !== null && body.email !== '') {
        if (!EMAIL.test(body.email)) {
            return res.status(400).json({ message: 'Please enter a valid email address.', obj: null });
        }
    }

    Member.find({ panNo: body.panNo }, function (err, panUsers) {
        if (err) {
            console.error(err);
            return res.status(400).json({
                message: 'Not able to save member.',
                obj: err
            });
        }

        if (panUsers.length > 0) {
            return res.status(400).json({ message: 'A member with the same PAN Number already exists.', obj: null });
        }

        Member.find({ aadharNo: body.aadharNo }, function (err, aadharUsers) {
            if (err) {
                console.error(err);
                return res.status(400).json({
                    message: 'Not able to save member.',
                    obj: err
                });
            }

            if (aadharUsers.length > 0) {
                return res.status(400).json({ message: 'A member with the same AADHAR Number already exists.', obj: null });
            }

            if (body.email !== null && body.email !== '') {
                Member.find({ $or: [{ email: body.email }, { mobile: body.mobile }] }, function (err, members) {
                    if (err) {
                        console.error(err);
                        return res.status(400).json({
                            message: 'Not able to save member.',
                            obj: err
                        });
                    }

                    if (members.length > 0) {
                        return res.status(400).json({ message: 'A member with the same email or mobile number already exists.', obj: null });
                    }

                    member = new Member({
                        memberId: new Date().getTime(),
                        firstName: body.firstName.toUpperCase(),
                        middleName: body.middleName.toUpperCase(),
                        lastName: body.lastName.toUpperCase(),
                        dob: body.dob,
                        panNo: body.panNo.toUpperCase(),
                        aadharNo: body.aadharNo.replace(' ', ''),
                        gender: body.gender.toUpperCase(),
                        address: body.address.toUpperCase(),
                        mobile: body.mobile,
                        email: body.email,
                        companyName: body.companyName.toUpperCase(),
                        monthlyIncome: body.monthlyIncome,
                        designation: body.designation.toUpperCase(),
                        department: body.department.toUpperCase(),
                        officeAddress: body.officeAddress.toUpperCase(),
                        isActive: true,
                        createdBy: decoded.user._id,
                        createdAt: new Date()
                    });

                    member.save(function (err, member) {
                        if (err) {
                            console.error(err);
                            return res.status(400).json({
                                message: 'Not able to save member.',
                                obj: err
                            });
                        }

                        if (member === null) {
                            return res.status(400).json({
                                message: 'Not able to save member.',
                                obj: null
                            });
                        }

                        if (body.nomineeFirstName !== null && body.nomineeFirstName !== '' && 
                            body.nomineeMiddleName !== null && body.nomineeMiddleName !== '' && 
                            body.nomineeLastName !== null && body.nomineeLastName !== '' &&
                            body.nomineeRelation !== null && body.nomineeRelation !== '' &&
                            parseInt(body.nomineeAge) !== null && !isNaN(parseInt(body.nomineeAge))) {

                            var nominee = new Nominee({
                                firstName: body.nomineeFirstName.toUpperCase(),
                                middleName: body.nomineeMiddleName.toUpperCase(),
                                lastName: body.nomineeLastName.toUpperCase(),
                                age: parseInt(body.nomineeAge),
                                relation: body.nomineeRelation.toUpperCase(),
                                memberId: member._id
                            });

                            nominee.save(function (err, nominee) {
                                if (err) {
                                    console.error(err);
                                    return res.status(400).json({
                                        message: 'Not able to save member.',
                                        obj: err
                                    });
                                }

                                if (member === null) {
                                    return res.status(400).json({
                                        message: 'Not able to save member.',
                                        obj: null
                                    });
                                }

                            });
                        }
                        res.status(201).json({ message: 'New member created.', obj: member });
                    });
                });
            } else {                
                Member.find({ mobile: body.mobile }, function (err, members) {
                    if (err) {
                        console.error(err);
                        return res.status(400).json({
                            message: 'Not able to save member.',
                            obj: err
                        });
                    }

                    if (members.length > 0) {
                        return res.status(400).json({ message: 'A member with the same mobile number already exists.', obj: null });
                    }

                    member = new Member({
                        memberId: new Date().getTime(),
                        firstName: body.firstName.toUpperCase(),
                        middleName: body.middleName.toUpperCase(),
                        lastName: body.lastName.toUpperCase(),
                        dob: body.dob,
                        panNo: body.panNo.toUpperCase(),
                        aadharNo: body.aadharNo.replace(' ', ''),
                        gender: body.gender.toUpperCase(),
                        address: body.address.toUpperCase(),
                        mobile: body.mobile,
                        companyName: body.companyName.toUpperCase(),
                        monthlyIncome: body.monthlyIncome,
                        designation: body.designation.toUpperCase(),
                        department: body.department.toUpperCase(),
                        officeAddress: body.officeAddress.toUpperCase(),
                        isActive: true,
                        createdBy: decoded.user._id,
                        createdAt: new Date()
                    });

                    member.save(function (err, member) {
                        if (err) {
                            console.error(err);
                            return res.status(400).json({
                                message: 'Not able to save member.',
                                obj: err
                            });
                        }

                        if (member === null) {
                            return res.status(400).json({
                                message: 'Not able to save member.',
                                obj: null
                            });
                        }

                        if (body.nomineeFirstName !== null && body.nomineeFirstName !== '' && 
                            body.nomineeMiddleName !== null && body.nomineeMiddleName !== '' && 
                            body.nomineeLastName !== null && body.nomineeLastName !== '' &&
                            body.nomineeRelation !== null && body.nomineeRelation !== '' &&
                            parseInt(body.nomineeAge) !== null && !isNaN(parseInt(body.nomineeAge))) {

                            var nominee = new Nominee({
                                firstName: body.nomineeFirstName.toUpperCase(),
                                middleName: body.nomineeMiddleName.toUpperCase(),
                                lastName: body.nomineeLastName.toUpperCase(),
                                age: parseInt(body.nomineeAge),
                                relation: body.nomineeRelation.toUpperCase(),
                                memberId: member._id
                            });

                            nominee.save(function (err, nominee) {
                                if (err) {
                                    console.error(err);
                                    return res.status(400).json({
                                        message: 'Not able to save member.',
                                        obj: err
                                    });
                                }

                                if (member === null) {
                                    return res.status(400).json({
                                        message: 'Not able to save member.',
                                        obj: null
                                    });
                                }

                            });
                        }
                        res.status(201).json({ message: 'New member created.', obj: member });
                    });
                });
            }                            
        });
    });
});


router.post('/search', function (req, res, next) {
    var body = req.body;

    if (body.panNo !== null || body.mobile !== null || body.aadharNo !== null) {
        if (MOBILE_NO.test(body.mobile)) {
            Member.find({ lastName: body.lastName.toUpperCase(), mobile: body.mobile }, function (err, members) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'No member found.', obj: err });
                }

                if (members === null) {
                    return res.status(500).json({ message: 'No member found.', obj: null });
                }

                if (members.length === 0) {
                    return res.status(500).json({ message: 'No member found.', obj: null });
                }

                return res.status(200).json({ message: members.length + ' members found.', obj: members });
            });

        } else if (PAN.test(body.panNo)) {
            Member.find({ lastName: body.lastName.toUpperCase(), panNo: body.panNo.toUpperCase() }, function (err, members) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'No member found.', obj: err });
                }

                if (members === null) {
                    return res.status(500).json({ message: 'No member found.', obj: null });
                }

                if (members.length === 0) {
                    return res.status(500).json({ message: 'No member found.', obj: null });
                }

                return res.status(200).json({ message: members.length + ' members found.', obj: members });
            });

        } else {
            Member.find({ lastName: body.lastName.toUpperCase(), aadharNo: body.aadharNo }, function (err, members) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'No member found.', obj: err });
                }

                if (members === null) {
                    return res.status(500).json({ message: 'No member found.', obj: null });
                }

                if (members.length === 0) {
                    return res.status(500).json({ message: 'No member found.', obj: null });
                }

                return res.status(200).json({ message: members.length + ' members found.', obj: members });
            });
        }

    } else {
        Member.find({ lastName: body.lastName.toUpperCase() }, function (err, members) {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'No member found.', obj: err });
            }

            if (members === null) {
                return res.status(500).json({ message: 'No member found.', obj: null });
            }

            if (members.length === 0) {
                return res.status(500).json({ message: 'No member found.', obj: null });
            }

            res.status(200).json({ message: members.length + ' members found.', obj: members });
        })
    }
})


module.exports = router;