var templates = require('./templates');

// algolia search + helper
var algoliasearch = require('algoliasearch');
var algoliasearchHelper = require('algoliasearch-helper');

// algolia credentials
var data = {
  appID: 'A2MSAFKPK9',
  apiKey: '74f12b7b0ceea2f1f27951dc2d9a0a97',
  index: 'test_objectID'
};

var client = algoliasearch(data.appID, data.apiKey);
var helper = algoliasearchHelper(client, data.index, {
  facets: [ 'food_type', '_geoloc.lat', '_geoloc.lng' ]
});

$(function () {
  var query;
  $('.search').keyup(function(e) {
    query = $(this).val();

    helper
      .setQuery(query)
      .search();
  });

  $('.cuisine tr').click(function(e) {

    var facetValue = $(this).data('facet');

    helper.toggleFacetRefinement('food_type', facetValue)
          .search();
  });

  helper.on('result', function(content) {
    console.log('content');
    renderResult(query, content.hits);
  });
  
  /* geolocation is available */
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude, position.coords.longitude);
    });
  /* geolocation IS NOT available */
  }



});

function renderResult(query, content) {
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