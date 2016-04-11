// Generated by CoffeeScript 1.10.0
(function() {
  var InternationalPhones, phoneFormat;

  phoneFormat = require('phoneformat.js');

  module.exports = InternationalPhones = function(knwlInstance) {
    this.validateAndFormat = function(numbers) {
      var countryCode, detectedCountryCode, i, len, number, validatedNumbers;
      validatedNumbers = [];
      for (i = 0, len = numbers.length; i < len; i++) {
        number = numbers[i];
        if (number.indexOf('+' === 0 || number.indexOf('00'))) {
          detectedCountryCode = phoneFormat.countryForE164Number(number);
          if (detectedCountryCode.length > 0) {
            countryCode = detectedCountryCode;
          }
        }
        if ((countryCode == null) && knwlInstance.language !== 'unknown') {
          countryCode = knwlInstance.language;
        }
        try {
          if (phoneFormat.isValidNumber(number, countryCode)) {
            validatedNumbers.push({
              number: phoneFormat.formatE164(countryCode, number),
              country: countryCode
            });
          }
        } catch (undefined) {}
      }
      return validatedNumbers;
    };
    this.calls = function() {
      var gram, gramString, gramStrings, gramStringsByLine, i, index, j, k, l, len, len1, len2, line, lineWords, lines, numbers, raw, ref, wordsByLine;
      raw = knwlInstance.getRaw();
      lines = raw.split('\n');
      wordsByLine = [];
      for (i = 0, len = lines.length; i < len; i++) {
        line = lines[i];
        wordsByLine.push(line.split(' '));
      }
      gramStringsByLine = [];
      for (j = 0, len1 = wordsByLine.length; j < len1; j++) {
        lineWords = wordsByLine[j];
        gramStrings = [];
        for (index = k = 0, ref = lineWords.length - 4; 0 <= ref ? k <= ref : k >= ref; index = 0 <= ref ? ++k : --k) {
          gram = lineWords.slice(index, index + 4);
          gramString = gram.join().replace(/[^\/\d+]/g, '');
          if (gramString !== gramStrings[gramStrings.length - 1] && gramString.length > 5) {
            gramStrings.push(gramString);
          }
        }
        gramStringsByLine.push(gramStrings);
      }
      numbers = [];
      for (l = 0, len2 = gramStringsByLine.length; l < len2; l++) {
        gramStrings = gramStringsByLine[l];
        numbers = numbers.concat(this.validateAndFormat(gramStrings));
      }
      return numbers;
    };
  };

}).call(this);
