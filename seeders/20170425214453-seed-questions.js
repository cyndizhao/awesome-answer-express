'use strict';

// require model
const M = require('../models/index');
//
const Question = M.Question;

const faker = require('faker');

// ð Array.from can create arrays in a variety of different ways
// using it as follows will create an array with 100 undefined elements
const questions = Array
  .from({length: 100})
  .map(function(){
    return Question.create({title:`${faker.hacker.adjective()} ${faker.hacker.noun()}`, description:faker.hacker.phrase()})
    .catch(function (error) {console.log(error)})
    // we're using .catch to prevent our query from crashing
    // our program when the title is not unique
  })

module.exports = {
  up: function (queryInterface, Sequelize) {
    // the up & down methods need to return a promise
    // otherwise the command `sequelize db:seed:all` will not work
    return Promise.all(questions);
    // All Sequelize model methods return promises

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
