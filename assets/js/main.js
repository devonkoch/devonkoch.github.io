var renderResult = require('./render');
var algoliasearch = require('algoliasearch');
var algoliasearchHelper = require('algoliasearch-helper');

// algolia credentials
var appID = 'A2MSAFKPK9';
var apiKey = '74f12b7b0ceea2f1f27951dc2d9a0a97';
var index = 'test_objectID';

var client = algoliasearch(appID, apiKey);
var helper = algoliasearchHelper(client, index, {
  facets: [ 'food_type' ],
  hitsPerPage: 1000
});

/* geolocation is available */
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var geoQuery = '' + position.coords.latitude + ',' + position.coords.longitude + '';
    helper.setQueryParameter('aroundLatLng', geoQuery);
  });
}

$(function () {

  var query;
  $('.search').keyup(function() {
    query = $(this).val();

    helper
      .setQuery(query)
      .search();
  });

  $('.cuisine tr').click(function (event) {
    if (event.target.type !== 'checkbox') {
      $(':checkbox', this).trigger('click');
    }
    var facetValue = $(this).data('facet');
    helper
      .toggleFacetRefinement('food_type', facetValue)
      .search();
  });

  $("input[type='checkbox']").change(function (e) {
    if ($(this).is(":checked")) {
      $(this).closest('tr').addClass("highlight");
    } else {
      $(this).closest('tr').removeClass("highlight");
    }
  });

  helper.on('result', function(content) {
    renderResult(query, content.hits);
  });

});