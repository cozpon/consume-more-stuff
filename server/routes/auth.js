const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');



const db = require('../models');
const validateForm = require('../lib/validate-form');
const User = db.User;
const saltRounds = 12;

const router = express.Router();
//----------NAVIGATION MENU----------FORGOT/LOGIN/LOGOUT/REGISTER

//FORGOT password
router.post('/forgot', (req, res) => {
  return User.findOne({ where : { email: req.body.email } })
  .then(user => {
    crypto.randomBytes(20, function(err, buf) { //creates random TOKEN
      let token = buf.toString('hex');
      let client = nodemailer.createTransport({ //sets up nodemailer
          service: 'SendGrid',
          auth: {
            user: 'user', // username & password stored in config/nodemailer.js
            pass: 'pass'  // hidden with .gitignore so as not to push up sensitive details
          }
        });
      let email = {
        to: req.body.email, // sends email to data input
        from: 'passwordreset@shadeeapp.com', //from us
        subject: 'Shadee App Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' + // this link be from server side, req.headers.host can be our website html
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        }; // ^^ rewrite the "text" and make it more specific // customized
      client.sendMail(email, function(err, info){ //
        if(err){
          console.log(err);
        }
        else {
        console.log('Message sent: ' + info.response);
        console.log('info', 'An e-mail has been sent to ' + req.body.email + ' with further instructions.');
        req.flash('info', 'An e-mail has been sent to ' + req.body.email + ' with further instructions.');
        } // req.flash meant for express-flash
      })
      return user.update({ // sends the token + expiration date to the user DB
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000 // 1 hour
      })
    })
  })
  .catch(err => {
    console.log(err);
    res.json(err);
  });
});

router.get('/reset/:token', (req, res) => {
  return User.findOne({ where: { resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()} }
  .then(user => { // find the user who has the resetPasswordToken attached to them & whose token hasn't expired.
    if (!user) { // if there is no user, return error and redirect to /forgot
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    console.log("yoooo"); //here is where the POST/PUT will edit the password
    res.render('reset', { // make sure to HASH the new password
      user: req.user
    }); // after it PUT's the new password, set resetPasswordToken & resetPasswordExpires to null
    })
})
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

    }
    else {
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