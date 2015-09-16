'use strict';
/* jslint node: true */

var BBPromise = require('bluebird');
var fs = require('fs');
var predictionsCsvToJson = require(__dirname + '/lib/predictionsCsvToJson');
var predictionsJoin = require(__dirname + '/lib/predictionsJoin');

BBPromise.promisifyAll(fs);

module.exports = function promises (basePath, callback) {
  var predictions;
  
  return fs.readFileAsync(basePath + '/predictions.csv')
    .then(function (predictionsCsvBuffer) {
      predictions = predictionsCsvToJson(predictionsCsvBuffer.toString());
      return fs.readFileAsync(basePath + '/names.csv');
    })
    .then(function (namesCsvBuffer) {
      predictionsJoin(predictions, namesCsvBuffer.toString());
      var predictionsJsonString = JSON.stringify(predictions);
      return fs.writeFileAsync(basePath + '/predictions.json', predictionsJsonString);
    });
};
