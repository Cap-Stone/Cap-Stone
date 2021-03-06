const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Points = require('../models/saved-points');
const jwt = require('jsonwebtoken')
const db = "mongodb+srv://admin:admin@databasebenchmark-ga1yr.gcp.mongodb.net/test?retryWrites=true&w=majority";
// mongoose.Promise = global.Promise;

mongoose.connect(db,{useNewUrlParser: true ,useUnifiedTopology: true}, function(err){
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')      
    }
});

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err)      
    } else {
      let payload = {subject: registeredUser._id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({email: userData.email}, (err, user) => {
    if (err) {
      console.log(err)    
    } else {
      if (!user) {
        res.status(401).send('Invalid Email')
      } else 
      if ( user.password !== userData.password) {
        res.status(401).send('Invalid Password')
      } else {
        let payload = {subject: user._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    }
  })
})

router.post('/savePointsUrl', (req, res) => {
  let pointsData = req.body
  let points = new Points(pointsData)
  points.save((err, savedPoints) => {
    if (err) {
      console.log(err)      
    } else {
      let payload = {subject: savedPoints._id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
    }
  })
})

router.get('/getPointsUrl', (req, res) => {
  Points.find((err, savedPoints) => {
    if (err) { 
      console.log(err)      
    } else {
      let payload = {subject: savedPoints}
      res.status(200).send(savedPoints)
    }
  })
})

router.post('/updatePointUrl', (req, res) => {
  const point = req.body;
  Points.updateOne({_id: point._id}, point, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

router.post('/deletePoint', (req, res) => {
  const point = req.body;
  Points.deleteOne({_id: point._id}, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.status(200).send(result);
    }
  })
});

module.exports = router;