var fs = require("fs");
var csv = require("fast-csv");
var parseJSON = require('json-parse-async');
var concat = require('object-concat')
 
var path = "resources/dataset/";
var files = {
	json: path + "restaurants_list.json",
	csv: path + "restaurants_info.csv",
	final: path + "restaurants_list_final.json"
};

function readJSON(file, callback) {
  fs.readFile(file, function (err, data) {
    if (err) return callback(err);
    callback(null, data);
  });
};
  
var keyedJSON = {};
var finalJSON = [];

readJSON(files.json, function (err, data) {
	parseJSON(data)
	  .then(function(content) {
	  	var objectID;
	  	content.forEach(function (entry) {
	  		objectID = entry.objectID;
	  		delete entry.objectID;
	  		keyedJSON[objectID] = entry;
	  	});
	  }).then(function() {
			var objectID;
			var dataObj = {};
			var csvSchema = [
				'objectID', 'food_type', 'stars_count', 'reviews_count', 'neighborhood',
				'phone_number', 'price_range', 'dining_style'
			];

			csv
				.fromPath(files.csv)
				.on("data", function(data){
					var newKey;

					data = data[0].split(';');
					objectID = data[0];
					for(var i = 1; i < data.length; i++) {
						newKey = csvSchema[i];
						dataObj[newKey] = data[i];
					}

					keyedJSON[objectID] = concat(keyedJSON[objectID], dataObj);

				})
				.on("end", function(){
					delete keyedJSON['objectID'];

					for(var key in keyedJSON) {
						keyedJSON[key].objectID = key
						finalJSON.push(keyedJSON[key]);
					}

					finalJSON = JSON.stringify(finalJSON);

					fs.writeFile(files.final, finalJSON, function (err) {
					  if (err) return console.log(err);
					  console.log('File Written Success');
					});

				});
	  })
});

