// jshint ignore: start
'use strict';

var _bluebird = require('bluebird');

var fs = require('fs');
var predictionsCsvToJson = require(__dirname + '/../lib/predictionsCsvToJson');
var predictionsJoin = require(__dirname + '/../lib/predictionsJoin');

let async_await = (function () {
  var ref = (0, _bluebird.coroutine)(function* (basePath) {
    var predictionsCsvBuffer = yield fs.readFileAsync(basePath + '/predictions.csv');
    var predictions = predictionsCsvToJson(predictionsCsvBuffer.toString());

    var namesCsvBuffer = yield fs.readFileAsync(basePath + '/names.csv');
    predictionsJoin(predictions, namesCsvBuffer.toString());

    var predictionsJsonString = JSON.stringify(predictions);
    yield fs.writeFileAsync(basePath + '/predictions.json', predictionsJsonString);
  });
  return function async_await(_x) {
    return ref.apply(this, arguments);
  };
})();

module.exports = async_await;