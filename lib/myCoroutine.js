'use strict';
/* jslint node: true, esnext: true */

var BBPromise = require('bluebird');

module.exports = function (generatorFunction) {
  return function () {
    var callArguments = arguments;
    var generator = generatorFunction.apply(null, callArguments);

    return new BBPromise(function (fullfil, reject) {

      var onPromiseFullfiled = function (result) {
        var generatorResult = generator.next(result);

        if(generatorResult.done) {
          fullfil(generatorResult.value);
        } else {
          generatorResult.value
            .then(onPromiseFullfiled)
            .catch(reject);
        }
      };

      onPromiseFullfiled();
    });
  };

};
