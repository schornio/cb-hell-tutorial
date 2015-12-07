'use strict';
/* jslint node: true, esnext: true */

module.exports = function (generatorFunction) {
  return function () {
    var callArguments = arguments;
    var generator = generatorFunction.apply(null, callArguments);

    return new Promise(function (fulfill, reject) {

      var onPromiseFulfilled = function (result) {
        var generatorResult = generator.next(result);

        if(generatorResult.done) {
          fulfill(generatorResult.value);
        } else {
          generatorResult.value
            .then(onPromiseFulfilled)
            .catch(reject);
        }
      };

      onPromiseFulfilled();
    });
  };

};
