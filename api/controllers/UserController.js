/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var passport = require("passport");
var bcrypt = require('bcrypt-nodejs');
const sendSms = require('../services/sms');
const sendMail = require('../services/email');

module.exports = {


  signup: function (req, res) {

    console.log(req.body);
    const fullname = req.body.fullname;
    const number = req.body.number;
    const email = req.body.email;
    const password = req.body.password;

    let error = [];
    if (req.body.password != req.body.cpassword) {
      res.send({
        message: 'Password do not match'
      });
      console.log(error);
    }
    if (req.body.password.length < 4) {
      res.send({
        message: "Password too short"
      });
      console.log(error);
    } else {
      User.create({
        fullname,
        number,
        email,
        password
      }).exec((err, user) => {
        // console.log(User);
        if (err) {
          return res.send({
            success: false,
            status: "Error",
            message: "User already exist"
          });
        } else {
          console.log("User created");
          console.log(req.body);
          res.send({
            message: "User created",
            success: true
          });
        }
      });
    }
  },



  'login': function (req, res) {
    console.log('login');
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        res.send({
          success: false,
          message: info.message
        });
      }
      if (!user) {
        res.send({
          success: false,
          message: info.message
        });
        return;
      } else {
        req.session.email = user.email;
        req.session.number = user.number,
        req.session.fullname = user.fullname
        req.session.authenticated = true;
        // var localStorage = localStorage.setItem('uemail,user.email');
        res.send({
          success: 'ok',
          message: 'logged in sucessfully',
          name: req.session.fullname,
          email: req.session.email
        });
        console.log(user.fullname);
        console.log(user.number);
      }


      // return res.conUser;
      // return res.ok();
      // return res.send(conUser.conName);
    })(req, res);
  },

  
  'logout':(req,res)=>{
    console.log('here');
    const email = req.body.user.email;
    console.log(email);
    req.body.user.email = "";
    console.log(req.body.user.email);

    res.send({
      email: req.body.user.email
    });
  },


  'deleteAcc': function (req, res) {},


  'editAcc': function (req, res) {
    const number = req.body.number;

    User.findOne({
          number: number
        }, function (err, user) {

          // console.log(user);
          if (err) {
            return res.send(err);
          }else{
              bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function () {}, function (err, hash) {
                  req.body.password = hash;
                });
              })
              User.update({
                password: req.body.password
              });
              console.log(user);
          }
        });
  },

  sendsms: (req, res) => {
    const hobby = req.body.user.hobby; 
    const message = req.body.user.message;
    console.log(message + "oiu");
    const k = (message+" "+hobby)
    console.log('dad');
    sendSms(k).then((err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('sent');
      }
    });

    sendMail(k).then((err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('sent mail');
      }
    });
  }

};
