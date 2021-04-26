/* cSpell:disable */
// This file paths are equal case, so if the file path, for example, equal the word 'package-lock.json',
// and the file name 'package-lock.json' is in this array, it will be ignored.
const ignoreFiles = [
    '.eslintignore',
    '.eslintrc',
    '.jsbeautifyrc',
    'package-lock.json'
];

module.exports = ignoreFiles;