phoneFormat = require 'phoneformat.js'

module.exports = InternationalPhones = (knwlInstance) ->

    @validateAndFormat = (numbers) ->
        validatedNumbers = []
        for number in numbers

            # detect country automatically
            if number.indexOf '+' == 0 || number.indexOf '00'
                detectedCountryCode = phoneFormat.countryForE164Number number
                countryCode = detectedCountryCode if detectedCountryCode.length > 0

            # Use country of knwl instance, otherwise USA
            countryCode = knwlInstance.language if !countryCode? && knwlInstance.language != 'unknown'

            # validate and format number
            try
                if phoneFormat.isValidNumber number, countryCode
                    validatedNumbers.push
                        number: phoneFormat.formatE164 countryCode, number
                        country: countryCode
        return validatedNumbers

    @calls = ->
        raw = knwlInstance.getRaw()

        lines = raw.split('\n')

        # array of words for each line
        wordsByLine = []
        for line in lines
            wordsByLine.push line.split(' ')

        # validateAndFormat grams for each line
        gramStringsByLine = []
        for lineWords in wordsByLine
            gramStrings = []

            # extract numbers from 4grams
            for index in [0 .. lineWords.length - 4]
                gram = lineWords.slice index, index + 4
                # extract numbers with leading plus only
                gramString = gram.join().replace(/[^\/\d+]/g,'')
                if gramString != gramStrings[gramStrings.length - 1] && gramString.length > 5
                    gramStrings.push gramString
            gramStringsByLine.push gramStrings


        numbers = []
        for gramStrings in gramStringsByLine
            numbers = numbers.concat @validateAndFormat gramStrings
        numbers

    return
