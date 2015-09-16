'use strict';
/* jslint node: true */

module.exports = function predictionsCsvToJson (csvFileString) {
  var predictionsRegEx = /([^;]*); ([^;]*); ([^;]*);\n?/g;
  var predictions = [];

  // Ignore first line: header
  predictionsRegEx.exec(csvFileString);

  var csvRow = predictionsRegEx.exec(csvFileString);
  while(csvRow) {
    predictions.push({
      vorname: csvRow[1],
      status: csvRow[2],
      isAzorAhai: Boolean(csvRow[3])
    });

    csvRow = predictionsRegEx.exec(csvFileString);
  }

  return predictions;
};
