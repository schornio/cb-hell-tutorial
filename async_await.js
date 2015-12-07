// jshint ignore: start
'use strict';

var fs = require('fs');
var predictionsCsvToJson = require(__dirname + '/../lib/predictionsCsvToJson');
var predictionsJoin = require(__dirname + '/../lib/predictionsJoin');

async function async_await (basePath) {
  var predictionsCsvBuffer = await fs.readFileAsync(basePath + '/predictions.csv');
  var predictions = predictionsCsvToJson(predictionsCsvBuffer.toString());

  var namesCsvBuffer = await fs.readFileAsync(basePath + '/names.csv');
  predictionsJoin(predictions, namesCsvBuffer.toString());

  var predictionsJsonString = JSON.stringify(predictions);
  await fs.writeFileAsync(basePath + '/predictions.json', predictionsJsonString);
}

module.exports = async_await;
