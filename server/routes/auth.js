const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const async = require('async');
const crypto = require('crypto');

const db = require('../models');
const validateForm = require('../lib/validate-form');
const User = db.User;
const saltRounds = 12;

const router = express.Router();
//----------NAVIGATION MENU----------FORGOT/LOGIN/LOGOUT/REGISTER

//FORGOT password

router.post('/forgot', (req, res, next) => {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      console.log(req.body.email, "REQ BOdOy E m A I l");
      console.log(token, "atakoknTOkSn");
      User.findOne({ where : { email: req.body.email }, function(err, user) {
        // if (!user) {
        //   req.flash('error', 'No account with that email address exists.');
        //   return res.redirect('/forgot');
        // }
      console.log(user, "useoser uSeer USER");
          return user.update({
            resetPasswordToken: token,
            resetPasswordExpires: new Date() + 3600000 // 1 hour
          })
          .then(userEmailed => {
          console.log('Email Sent');
            res.json(userEmailed);
          });
        }
      });
    },
    function(token, user, done) {
        let smtpTransport = nodemailer.createTransport('SMTP', {
          service: 'SendGrid',
          auth: {
            user: 'backyardboiz',
            pass: 'shadeeapp1'
          }
        });
        let mailOptions = {
          to: user.email,
          from: 'passwordreset@shadeeapp.com',
          subject: 'Shadee App Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          done(err, 'done');
        });
      }
  ], function(err) {
      if(err) return next(err);
      res.redirect('/forgot');
  });
});

//LogIN an authenticated user
router.post('/login',
  passport.authenticate('local'), (req, res) => {
    console.log(res.user);
  // if authentication is successful this will be sent
  // front end should check if returned object has a success key with true
  return res.json({
    id : req.user.id,
    username : req.user.username,
    role : req.user.role,
    success : true
  });
});

//LogOUT a user
router.get('/logout', (req, res) => {
  console.log("Serverside hitting Logout");
  req.logout(); //fire logout request
  res.sendStatus(200);
});

//REGISTER a user
router.post('/register', validateForm, (req, res) => {
  const { email, username } = req.body;
  // need to check if user already exists first
  return User.findOne({
    where : { $or : [ { username : username }, { email : username } ] },
    attributes: { exclude: ['password'] }
  })
  .then(response => {
    // if user does not exist, findOne will return null
    // if user does exist, user details will be returned
    if (response) {
      res.json({
        error: 'Sorry, that username/email is already in use!'
      });

    } else {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          User.create({
            email: email,
            username: username,
            password: hash,
            role: 2
          })
          .then((newUserDetails) => {
            console.log('new user registered');
            return res.json({
              id : newUserDetails.id,
              username : newUserDetails.username,
              success : true
            });
          });
        });
      });
    }
  })
  .catch((err) => {
    console.log("error", err);
    return res.json({
      error : 'Oh no! Something went wrong!'
    });
  });
});

module.exports = router;