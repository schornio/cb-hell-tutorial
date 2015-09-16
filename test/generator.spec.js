'use strict';
/* jslint node: true */
/* global describe, it, afterEach */
/* jslint -W030 */

var BASE_PATH = __dirname + '/files';
var expect = require('chai').expect;

describe('Generator', function () {
  var promises = require(process.cwd() + '/generator.js');

  it('should combine `predictions.csv` and `names.csv` into `predictions.json`', function (done) {
    var promise = promises(BASE_PATH);

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

});
