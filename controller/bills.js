var jwt = require('jsonwebtoken');
var passport = require('passport');
var Bill = require('../model/bills');


exports.listBills = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user) {
        console.log(err);
        res.send(err);
      } else {
        return Bill.listBills(req, res)
      }
    })(req, res, next);
  } 

  
exports.Total = (req, res) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user) {
        console.log(err);
        res.send(err);
      } else {
        return Bill.TOTAL( res)
      }
    })(req, res);
  } 

  exports.Chart = (req, res) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user) {
        console.log(err);
        res.send(err);
      } else {
        return Bill.Chart( res)
      }
    })(req, res);
  } 