'use strict';
/* jslint node: true, esnext: true */

var BBPromise = require('bluebird');
var fs = require('fs');
var predictionsCsvToJson = require(__dirname + '/lib/predictionsCsvToJson');
var predictionsJoin = require(__dirname + '/lib/predictionsJoin');

BBPromise.promisifyAll(fs);

module.exports = BBPromise.coroutine(function* generator (basePath, callback) {
  var predictionsCsvBuffer = yield fs.readFileAsync(basePath + '/predictions.csv');
  var predictions = predictionsCsvToJson(predictionsCsvBuffer.toString());

  var namesCsvBuffer = yield fs.readFileAsync(basePath + '/names.csv');
  predictionsJoin(predictions, namesCsvBuffer.toString());
  
  var predictionsJsonString = JSON.stringify(predictions);
  yield fs.writeFileAsync(basePath + '/predictions.json', predictionsJsonString);
});
