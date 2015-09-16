'use strict';
/* jslint node: true */
/* global describe, it, afterEach */
/* jslint -W030 */

var BASE_PATH = __dirname + '/files';
var expect = require('chai').expect;

describe('Quick and dirty', function () {
  var quickAndDirty = require(process.cwd() + '/quick_and_dirty.js');

  it('should combine `predictions.csv` and `names.csv` into `predictions.json`', function (done) {
    quickAndDirty(BASE_PATH, function (error) {
      expect(error).to.not.be.ok;

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
