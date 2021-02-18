const { CheckResult } = require('../../core/models');
const nSpellService = require('./nspell.service');

class SpellCheckService {

    constructor() { }

    check(word) {
        const checkResult = new CheckResult(word);
        if (!word || word.length <= 1) {
            return checkResult;
        }
        word = word.trim();
        if (!word || word.length <= 1) {
            return checkResult;
        }
        checkResult.fix = word;
        checkResult.suggestions = nSpellService.spell.suggest(checkResult.fix);
        return checkResult;
    }
}

module.exports = new SpellCheckService();