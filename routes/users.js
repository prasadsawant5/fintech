'use strict'

var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var router = express.Router();

var User = require('../models/user');
var Member = require('../models/member');
var config = require('../util/config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var user = new User({
    _id: '585849736a807194f7782500',
    firstName: 'Prasad',
    lastName: 'Sawant',
    username: 'prasadsawant5',
    password: bcrypt.hashSync('password', 10),
    mobile: '9987556981',
    accessLevel: 'SOFTWARE',
    createdAt: new Date(),
    updatedAt: new Date()
  });  

  user.save(function(err, user) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Not able to save user.',
        obj: err
      });
    }

    res.sendStatus(201);
  });
});


router.get('/login', function(req, res, next) {
  var username = req.headers.username;
  var password = req.headers.password;

  User.findOne({ username: username }, function(err, user) {
    if (err) {
      return res.status(401).json({
        message: 'Something wrong with the server.',
        obj: err
      });
    }

    if (!user) {
      return res.status(401).json({
        message: 'User not found.',
        obj: null
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        message: 'Invalid password.',
        obj: null
      });
    }

    var token = jwt.sign({user: user}, config.secret, {expiresIn: 7200});
    res.status(200).json({
        message: 'User found.',
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        mobile: user.mobile,
        accessLevel: user.accessLevel,
        token: token
    });
  })
});


router.get('/dashboard', function(req, res, next) {
  var actCount;
  Member.count({ isActive: { $exists: true } }, function(err, activeCount) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Unable to get total number of active users.',
        obj: err
      });
    }

    if (activeCount === null) {
      return res.status(500).json({
        message: 'Unable to get total number of active users.',
        obj: null
      });
    }

    console.log('Active members: ' + activeCount);

    actCount = activeCount;

    Member.count({}, function(err, totalCount) {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: 'Unable to get total number of users.',
          obj: err
        });
      }

      if (totalCount === null) {
        return res.status(500).json({
          message: 'Unable to get total number of users.',
          obj: null
        });
      }

      console.log('Total members: ' + totalCount);

      res.status(200).json({ message: 'Information found.', activeCount: actCount, totalCount: totalCount });
    });


  });
});


router.all('/', function(req, res, next) {
  var token = req.headers.token;

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      return res.status(401).json({
        message: 'Not authenticated.',
        obj: null
      });
    }

    next();
  });
});


router.patch('/edit/profile', function(req, res, next) {
  var token = req.headers.token;
  var body = req.body;

  var decoded = jwt.decode(token);

  User.findByIdAndUpdate(decoded.user._id, { $set: { firstName: body.firstName, lastName: body.lastName, username: body.username, mobile: body.mobile, updatedAt: new Date() }}, { new: true }, function(err, user) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Not able to save user.',
        obj: null
      });
    }

    if (user === null) {
      return res.status(500).json({
        message: 'There was a problem saving user.',
        obj: null
      });
    }

    var token = jwt.sign({user: user}, config.secret, {expiresIn: 7200});
    res.status(200).json({
        message: 'User information saved.',
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        mobile: user.mobile,
        token: token
    });
  });
});


router.patch('/edit/password', function(req, res, next) {
    var token = req.headers.token;
    var body = req.body;

    if (body.newPassword !== body.confirmPassword) {
      return res.status(500).json({
          message: 'Your new password does not match the confirmed password.',
          obj: null
        });
    }

    var decoded = jwt.decode(token);

    User.findById(decoded.user._id, function(err, user) {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: 'Not able to save user.',
          obj: null
        });
      }

      if (user === null) {
        return res.status(500).json({
          message: 'There was a problem saving user.',
          obj: null
        });
      }

      if (!bcrypt.compareSync(body.oldPassword, user.password)) {
        return res.status(401).json({
          message: 'Old password is invalid.',
          obj: null
        });
      }

      user.password = bcrypt.hashSync(body.newPassword, 10);

      user.save(function(err, newUser) {
        if (err) {
          console.error(err);
          return res.status(500).json({
            message: 'Not able to save user.',
            obj: null
          });
        }

        if (user === null) {
          return res.status(500).json({
            message: 'There was a while resetting your password. Please try again later.',
            obj: null
          });
        }

        var token = jwt.sign({ user: newUser }, config.secret, { expiresIn: 7200 });
        res.status(200).json({
          message: 'New password saved.',
          username: newUser.username,
          firstName: newUser.firstName,
          lastName: user.lastName,
          mobile: newUser.mobile,
          token: token
        });

      });
    })
});


router.get('/user-information', function(req, res, next) {
  if (req.token === null || req.token === undefined) {
    return res.status(401).json({ message: 'Not authenticated.'});
  }

  var decoded = jwt.decode(req.token);

  res.status(200).json({ message: 'User found.', obj: decoded });
})


router.get('/logout', function(req, res, next) {
  
})

module.exports = router;
