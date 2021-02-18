const allowFileExtensions = require('./files/allowFileExtensions');
const { baseURL, dictionariesURLs } = require('./files/dictionariesURLs');
const ignoreFiles = require('./files/ignoreFiles');
const ignorePaths = require('./files/ignorePaths');
const ignoreWords = require('./files/ignoreWords');

module.exports = {
    allowFileExtensions, baseURL, dictionariesURLs, ignoreFiles, ignorePaths, ignoreWords
};