// search results templating
var handlebars = require('handlebars');

var resultsSource = $('#search-results-template').html()
var resultsTemplate = handlebars.compile(resultsSource);

var foodSource = $('#food-type-template').html()
var foodTemplate = handlebars.compile(foodSource);

module.exports = {
  resultsTemplate: resultsTemplate,
  foodTemplate: foodTemplate
}