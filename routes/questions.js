const express = require('express');
const router = express.Router();

const Question = require('../models/index').Question;
//??????????????
// const {Question} = require('../model/index');

router.get('/', function(request, response, next){
  Question
  .findAll() //this return a promise allowing us to user .then
  .then(function(questions){
    //!!!!!!the path of the template that response.render takes is relative to the view/ folder by default
    response.render('questions/index', {questions: questions});
    // the second argument passed to response.render is an object where all its properties will be availble to the rendered template as variables
  })
  // response.send('Stuff');
})

module.exports = router;
