const dictionary = require('dictionary-en');
const nspell = require('nspell');
const { baseURL, dictionariesURLs, ignoreWords } = require('../../configurations');
const { fileUtils, httpsUtils, logUtils, pathUtils, validationUtils } = require('../../utils');

class NSpellService {

    constructor() {
        this.spell = null;
    }

    async initiate(settings) {
        logUtils.logMagentaStatus('DOWNLOAD DICTIONARIES');
        for (let i = 0; i < dictionariesURLs.length; i++) {
            await this.downloadFile(dictionariesURLs[i], settings.DICTIONARIES_PATH);
        }
        logUtils.logMagentaStatus('IMPLEMENT DICTIONARIES');
        this.spell = await new Promise((resolve, reject) => {
            if (reject) { }
            dictionary(async (err, dict) => {
                if (err) { }
                const spell = nspell(dict);
                for (let i = 0; i < dictionariesURLs.length; i++) {
                    const words = await this.getDictionary(this.getFilePath(dictionariesURLs[i], settings.DICTIONARIES_PATH));
                    for (let y = 0; y < words.length; y++) {
                        const word = words[y];
                        if (!word) {
                            continue;
                        }
                        spell.add(word);
                    }
                }
                if (validationUtils.isExists(ignoreWords)) {
                    for (let i = 0; i < ignoreWords.length; i++) {
                        spell.add(ignoreWords[i]);
                    }
                }
                resolve(spell);
            });
        });
    }

    async downloadFile(uri, dictionariesPath) {
        const fileFullName = `${uri}.txt`;
        const filePath = this.getFilePath(uri, dictionariesPath);
        if (!await fileUtils.isPathExists(filePath)) {
            await httpsUtils.downloadFile(`${baseURL}${fileFullName}`, filePath);
        }
    }

    getFilePath(uri, dictionariesPath) {
        const fileFullName = `${uri}.txt`;
        const fileName = pathUtils.getFileName(fileFullName);
        return `${dictionariesPath}\\${fileName}.txt`;
    }

    async getDictionary(filePath) {
        const words = await fileUtils.read(filePath);
        return words.split('\n');
    }
}

module.exports = new NSpellService();