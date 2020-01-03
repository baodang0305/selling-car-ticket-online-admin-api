var jwt = require ('jsonwebtoken');
var passport = require('passport')
var users = require('../model/user')

exports.listUsers =  (req,res,next)=>{
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err|| !user ) {
        console.log(err);
        res.send(err);
      } else {
        return  users.listUsers(req,res)
      }
    })(req, res, next);
  }
  
  
  exports.updateUser = (req,res)=>{
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err|| !user ) {
        console.log(err);
        res.send(err);
      } else {
        var email = req.body.email;
        var values  = req.body
        return  users.updateUser(values,email)
      }
    })(req, res);
}

exports.getUser = (req,res)=>{
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err|| !user ) {
      console.log(err);
      res.send(err);
    } else {
      var id = req.body._id;
      return users.getUser(res,id)
    }
  })(req, res);
}

exports.deleteUser = (req,res)=>{
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err|| !user ) {
      console.log(err);
      res.send(err);
    } else {
      var email = req.body.email;
      return users.deleteUser(email)
    }
  })(req, res);
}

exports.count = (req, res)=>{
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err|| !user ) {
      console.log(err);
      res.send(err);
    } else {
      return users.count(res)
    }
  })(req, res);
}