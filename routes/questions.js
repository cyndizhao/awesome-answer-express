const express = require('express');
const router = express.Router();

const Question = require('../models/index').Question;
//??????????????
// const {Question} = require('../model/index');

router.get('/', function(request, response, next){
  Question
  .findAll() //this return a promise allowing us to user .then
  .then(function(questions){
    response.send(questions);
  })
  // response.send('Stuff');
})

module.exports = router;
