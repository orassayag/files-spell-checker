const { CheckResultModel } = require('../../core/models');
const nSpellService = require('./nspell.service');

class SpellCheckService {

    constructor() { }

    check(word) {
        const checkResultModel = new CheckResultModel(word);
        if (!word || word.length <= 1) {
            return checkResultModel;
        }
        word = word.trim();
        if (!word || word.length <= 1) {
            return checkResultModel;
        }
        checkResultModel.fix = word;
        checkResultModel.suggestions = nSpellService.spell.suggest(checkResultModel.fix);
        return checkResultModel;
    }
}

module.exports = new SpellCheckService();