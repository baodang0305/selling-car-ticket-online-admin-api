var jwt = require('jsonwebtoken');
var passport = require('passport');
var Route = require('../model/route');


exports.listRoutes = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user) {
        console.log(err);
        res.send(err);
      } else {
        return Route.listRoutes(req, res)
      }
    })(req, res, next);
  } 

  exports.NewRoutes = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user) {
        console.log(err);
        res.send(err);
      } else {
        const data = {
            departure: req.body.departure,
            destination: req.body.destination,
            typeOfCar:req.body.typeOfCar,
            distance:req.body.distance,
            fare : req.body.fare
        }
        Route.newRoute(data).then(()=>{
            console.log('new route created in db');
            res.status(200).send({ message: 'skill created' });
        })
      }
    })(req, res, next);
  } 

  exports.deleteRoute = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user) {
        console.log(err);
        res.send(err);
      } else {
        var id = req.body._id;
        return Route.deleteRoute(id)
      }
    })(req, res, next);
  } 
  exports.addTime = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user) {
        console.log(err);
        res.send(err);
      } else {
        var id = req.body._id;
        var time = req.body.time
        return Route.AddTime(id,time)
      }
    })(req, res, next);
  } 
  exports.addLocation = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user) {
        console.log(err);
        res.send(err);
      } else {
        var id = req.body._id;
        departure = req.body.departure
        return Route.AddLocation(id,departure)
      }
    })(req, res, next);
  } 