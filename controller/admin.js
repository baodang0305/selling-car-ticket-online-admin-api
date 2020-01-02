var jwt = require('jsonwebtoken');
var passport = require('passport');
var Admin = require('../model/admin');


exports.loginUser = (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info != undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      req.logIn(user, err => {
        Admin.getUser(user.email, user.password).then(user => {
          const token = jwt.sign({ id: user.email }, 'your_jwt_secret');
          res.status(200).send({
            auth: true,
            token: token,
            message: 'user found & logged in',
          });
        });
      });
    }
  })(req, res, next);
}

exports.registerUser = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log(err);
    }
    if (info != undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      console.log('user found in db from route');
      const data = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        sex: req.body.sex,
        address: req.body.address,
        phone: req.body.phone,
        identity: req.body.identity,

      }
      Admin.saveUser(data).then(() => {
        console.log('user created in db');
        res.status(200).send({ message: 'user created' });
      })
    }
  })(req, res, next);


}

exports.defaultRouter = function (req, res, next) {
  res.send('respond with a resource');
}

exports.listUsers = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log(err);
    }
    if (info != undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      return Admin.listUsers(req, res)

    }
  })(req, res, next);
}

exports.logout = async (req, res) => {

  req.logout();

}

exports.updateWallet = (req,res)=>{
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err|| !user ) {
      console.log(err);
    }
    if (info != undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      var price = req.body.price;
      return  Admin.updateWallet(price)
    }
  })(req, res);
}

exports.getUser = function (req, res) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {

      console.log(err);
    }
    if (info != undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      console.log('user found in db from route');
      res.status(200).json({user:{
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        sex: user.sex,
        address: user.address,
        phone: user.phone,
        identity: user.identity,
      }});
    }
  })(req, res);
}

exports.getUserByEmail = (req, res) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log(err);
    }
    if (info != undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      return Admin.getUserByEmail(req, res)

    }
  })(req, res);
}