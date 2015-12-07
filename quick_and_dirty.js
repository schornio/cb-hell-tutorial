'use strict';
/* jslint node: true */

var fs = require('fs');
var predictionsCsvToJson = require(__dirname + '/lib/predictionsCsvToJson');
var predictionsJoin = require(__dirname + '/lib/predictionsJoin');

function quickAndDirty (basePath, callback) {
  fs.readFile(basePath + '/predictions.csv', function (error, predictionsCsvBuffer) {
    if(error) { callback(error); return; }

    var predictions = predictionsCsvToJson(predictionsCsvBuffer.toString());

    fs.readFile(basePath + '/names.csv', function (error, namesCsvBuffer) {
      if(error) { callback(error); return; }

      predictionsJoin(predictions, namesCsvBuffer.toString());

      var predictionsJsonString = JSON.stringify(predictions);
      fs.writeFile(basePath + '/predictions.json', predictionsJsonString, function (error) {
        callback(error);
      });
    });
  });
}

module.exports = quickAndDirty;
