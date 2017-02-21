var templates = require('./templates');

module.exports = function(query, content) {
  var displayCount = 0;

  var foodContext = {
    Italian: 0,
    American: 0,
    Californian: 0,
    French: 0,
    Seafood: 0,
    Japanese: 0,
    Indian: 0,
  }

  if (query) {
    $('.search-results').empty();

    for (var i = 0; i < content.length; i++) {
      var data = content[i];

      var starCount = Math.round(data.stars_count);
      var stars = ['', '', '', '', ''];

      if(foodContext[data.food_type] !== undefined) {
        foodContext[data.food_type] += 1;
      }

      var context = {
        image: data.image_url,
        name: data.name,
        rating: data.stars_count,
        gold: stars.slice(5 - starCount),
        grey: stars.slice(starCount),
        reviews: data.reviews_count,
        cuisineType: data.dining_style,
        neighborhood: data.neighborhood,
        priceRange: data.price_range
      };

      if(displayCount < 5) {
        var resultToAppend = templates.resultsTemplate(context);
        $('.search-results').append(resultToAppend);
        displayCount += 1;
      }
    }
    $('table.cuisines').remove();
    var foodToInsert = templates.foodTemplate(foodContext);
    $('.cuisine h4').after(foodToInsert);
  } else {
    $('table.cuisines').remove();
    var foodToInsert = templates.foodTemplate(foodContext);
    $('.cuisine h4').after(foodToInsert);
    $('.search-results').children().remove()
  }
}