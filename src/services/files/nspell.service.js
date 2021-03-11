const dictionary = require('dictionary-en');
const nspell = require('nspell');
const { Status } = require('../../core/enums');
const { baseURL, dictionariesURLs, ignoreWords } = require('../../configurations');
const applicationService = require('./application.service');
const { fileUtils, httpsUtils, logUtils, pathUtils, validationUtils } = require('../../utils');

class NSpellService {

    constructor() {
        this.spell = null;
    }

    async initiate(settings) {
        this.updateStatus('DOWNLOAD DICTIONARIES', Status.DOWNLOAD);
        for (let i = 0; i < dictionariesURLs.length; i++) {
            await this.downloadFile(dictionariesURLs[i], settings.DICTIONARIES_PATH);
        }
        this.updateStatus('IMPLEMENT DICTIONARIES', Status.IMPLEMENT);
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

    updateStatus(text, status) {
        logUtils.logMagentaStatus(text);
        if (applicationService.applicationData) {
            applicationService.applicationData.status = status;
        }
    }
}

module.exports = new NSpellService();