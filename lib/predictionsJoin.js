'use strict';
/* jslint node: true */

module.exports = function namesCsvToJson (predictions, namesCsv) {
  var namesRegEx = /([^;]*); ([^;]*);\n?/g;
  var names = {};

  // Ignore first line: header
  namesRegEx.exec(namesCsv);

  var csvRow = namesRegEx.exec(namesCsv);
  while(csvRow) {
    names[csvRow[1]] = csvRow[2];
    csvRow = namesRegEx.exec(namesCsv);
  }

  for (var i = 0; i < predictions.length; i++) {
    predictions[i].nachname = names[predictions[i].vorname].nachname;
  }
};
