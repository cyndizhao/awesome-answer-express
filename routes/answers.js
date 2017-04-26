const express = require('express');
const router = express.Router({mergeParams:true});

const Models = require('../models/index');

const Answer = Models.Answer;
const Question = Models.Question;

// Answers#create URL: /questions/:questionId/answers VERB: Post
router.post('/', function (req, res) {
  // res.send(Object.assign({}, req.body, req.params));
  const questionId = req.params.questionId;

  Answer
    .create({content: req.body.content, QuestionId: questionId})
    .then(function () { res.redirect(`/questions/${questionId}`)});

})

module.exports = router;
