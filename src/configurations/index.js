const allowFileExtensions = require('./files/allowFileExtensions.configuration');
const { baseURL, dictionariesURLs } = require('./files/dictionariesURLs.configuration');
const ignoreFiles = require('./files/ignoreFiles.configuration');
const ignorePaths = require('./files/ignorePaths.configuration');
const ignoreWords = require('./files/ignoreWords.configuration');

module.exports = {
    allowFileExtensions, baseURL, dictionariesURLs, ignoreFiles, ignorePaths, ignoreWords
};