const express = require('express');
const router = express.Router();

const Question = require('../models/index').Question;

//require answers router
const answers = require('./answers');
// const {Question} = require('../model/index');

// Questions#index URL: /questions VERB: GET
router.get('/', function(request, response, next){
  Question
  .findAll({order: [['createdAt', 'DESC'], ['updatedAt', 'DESC']]}) //this return a promise allowing us to user .then
  .then(function(questions){
    //!!!!!!the path of the template that response.render takes is relative to the view/ folder by default
    response.render('questions/index', {questions: questions});
    // the second argument passed to response.render is an object where all its properties will be availble to the rendered template as variables
  })
  // response.send('Stuff');
})

//Questions#new URL: /questions/new VERB: GET
router.get('/new', function(req, res){
  const question = Question.build();
  res.render('questions/new', {question: question});
})
//Question#create
router.post('/', function(req, res){
  // .body is a property of the request object that
  // contains all form data as a JavaScript object
  // res.send(req.body);

  // const title = req.body.title;
  // const description = req.body.description;
  const {title, description} = req.body;
  Question.create({title: title, description: description})
  .then(function(question){
    res.redirect('/questions');
  })

})

//Questions#destroy URL: /questions/:id VERB: delete
router.delete("/:id", function(req, res){
  const id = req.params.id;
  Question.findById(id)
  .then(function(question){return question.destroy()})
  .then(function(){res.redirect('/questions')});
})

//Question#edit URL: /questions/:id/edit VERB: GET
router.get('/:id/edit', function(req, res){
  const id = req.params.id;
  Question.findById(id).then(function(question){
    res.render('questions/edit', {question: question});
  })
  // .catch(function(err){
  //   next(err);
  // })
})

// Questions#update URL: /questions/:id VERB: PATCH
router.patch('/:id', function (req, res, next) {
  const id = req.params.id;

  Question
    .findById(id)
    .then(function (question) {
      question.update(
        {title: req.body.title, description: req.body.description}
      );
    })
    .then(function (question) {
      res.redirect(`/questions/${id}`)
    })
    .catch(function (err) { next(err) })
})


// Questions#show URL: /questions/:id VERB: GET
// For a url `/questions/99`, the req.params object will be equal to {id: '99'}
router.get('/:id', function(req, res){
  const id = req.params.id;
  Question.findById(id).then(function(question){
    return Promise.all([question, question.getAnswers({ order: [['createdAt', 'DESC']] })]);
    // return Promise.all([question, question.getAnswers({ order: '"createdAt" DESC' })]);

  }).then(function([question, answers]){
    //New! Array Destructuring
    //const [first, second, ...rest] = [1, 2, 3, 4]
    // first === 1, second === 2 rest === [3, 4]
    //can also be done with function argument above
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    res.render('questions/show', {question: question, answers: answers})

  })
})

// URL: /questions/:questionId/answers VERB: All of them!
router.use('/:questionId/answers', answers)


module.exports = router;
