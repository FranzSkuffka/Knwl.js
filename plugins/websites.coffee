module.exports = (knwlInstance) ->
    @calls = ->
        words = knwlInstance.words.get('linkWords')
        clean = (word) -> word.replace(/[\(\)!]/g, ""); # replaces every bracket ')' or '(' and every '!' with an empty character

        regEx = /(^(www)?\.)?([\w-])*(\.([\w]){2,10})$/
        websites = []
        for word in words
            res = clean(word).match regEx
            websites.push res[0] if res?
        return websites
    return
