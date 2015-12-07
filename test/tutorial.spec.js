'use strict';
/* jslint node: true */
/* global describe, it, afterEach */
/* jslint -W030 */

var BASE_PATH = __dirname + '/files';
var expect = require('chai').expect;
var BBPromise = require('bluebird');

function testTutorial(implementation) {

  it('should combine `predictions.csv` and `names.csv` into `predictions.json`', function (done) {
    var promise = implementation(BASE_PATH);

    promise.then(function() {
      var predictions = require(BASE_PATH + '/predictions.json');
      var predictionsExpected = require(BASE_PATH + '/predictions_expected.json');
      expect(predictions).to.be.ok;
      expect(predictions).to.be.eql(predictionsExpected);

      done();
    });
  });

  afterEach(function () {
    var fs = require('fs');
    var predictionsJsonPath = BASE_PATH + '/predictions.json';
    if (fs.existsSync(predictionsJsonPath)) {
      fs.unlink(predictionsJsonPath);
    }
  });
}

describe('Quick and dirty', function () {
  var quick_and_dirty = require('../quick_and_dirty.js');
  var quick_and_dirty_promisified = BBPromise.promisify(quick_and_dirty);
  testTutorial(quick_and_dirty_promisified);
});

describe('Promisies', function () {
  var promises = require('../promises');
  testTutorial(promises);
});

describe('Generator', function () {
  var generator = require('../generator');
  testTutorial(generator);
});

describe('Async Await', function () {
  var generator = require('../dist/async_await');
  testTutorial(generator);
});
