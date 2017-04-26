'use strict';
module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Question.hasMany(models.Answer);
        //Answer#setQuestion
       //Answer#getQuestion

       // Answer.findById(89)
       //  .then(function (answer) { return answer.getQuestion() })
       //  .then(console.info) <- Logs the question answer belongs to
      }
    }
  });
  return Question;
};
