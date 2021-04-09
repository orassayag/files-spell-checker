const byline = require('byline');
const { CheckResults } = require('../../core/models');
const { Method, Status } = require('../../core/enums');
const { allowFileExtensions, ignoreFiles, ignorePaths } = require('../../configurations');
const applicationService = require('./application.service');
const countLimitService = require('./countLimit.service');
const itemService = require('./item.service');
const logService = require('./log.service');
const pathService = require('./path.service');
const spellCheckService = require('./spellCheck.service');
const globalUtils = require('../../utils/files/global.utils');
const { fileUtils, textUtils, validationUtils } = require('../../utils');

class ScanService {

    constructor() {
        this.ignoreFiles = null;
        this.ignorePaths = null;
        this.allowFileExtensions = null;
    }

    initiate() {
        this.ignoreFiles = textUtils.lowerCaseList(ignoreFiles);
        this.ignorePaths = textUtils.lowerCaseList(ignorePaths);
        this.allowFileExtensions = textUtils.lowerCaseList(allowFileExtensions);
    }

    async run() {
        const isName = applicationService.applicationData.method === Method.NAME;
        const methodName = `scanItem${textUtils.capitalizeFirstLetter(applicationService.applicationData.method)}`;
        let isLimitExceeded = false;
        let items = await fileUtils.getFilesRecursive({
            directory: pathService.pathData.scanPath,
            includeDirectories: isName,
            ignoreFiles: this.ignoreFiles,
            ignorePaths: this.ignorePaths
        });
        items = items.slice(0, countLimitService.countLimitData.maximumItemsCount);
        itemService.itemData.totalItemsCount = items.length;
        applicationService.applicationData.status = Status.SCAN;
        for (let i = 0; i < items.length; i++) {
            const checkResults = await this[methodName](items[i], i + 1);
            if (!checkResults) {
                continue;
            }
            itemService.itemData.scanItemsCount++;
            if (checkResults.isItemMisspell) {
                itemService.itemData.misspellItemsCount++;
                await logService.logCheckResults(checkResults);
            }
            if (checkResults.isLimitExceeded) {
                isLimitExceeded = true;
                break;
            }
            applicationService.applicationData.itemCheckResult = checkResults.resultsList[0];
        }
        return isLimitExceeded;
    }

    scanItemName(itemPath, index) {
        return new Promise(async (resolve, reject) => {
            if (reject) { }
            try {
                applicationService.applicationData.itemIndex = index;
                itemService.itemData.scanItemsCount++;
                const checkResults = new CheckResults(itemPath);
                const { itemName, itemFullName, itemDirectoryPath } = fileUtils.getItemName(itemPath);
                applicationService.applicationData.itemName = itemFullName;
                applicationService.applicationData.itemDirectoryPath = itemDirectoryPath;
                const wordsList = textUtils.getSplitWords(itemName);
                for (let i = 0; i < wordsList.length; i++) {
                    itemService.itemData.scanWordsCount++;
                    let word = wordsList[i];
                    word = textUtils.replaceNoneAlphabets(word, '');
                    const checkResult = spellCheckService.check(word);
                    if (checkResult.isIgnore) {
                        itemService.itemData.ignoreWordsCount++;
                    }
                    if (validationUtils.isExists(checkResult.suggestions)) {
                        itemService.itemData.misspellWordsCount++;
                        checkResults.isItemMisspell = true;
                    }
                    checkResults.resultsList.push(checkResult);
                    checkResults.isLimitExceeded = itemService.itemData.scanWordsCount > countLimitService.countLimitData.maximumWordsScanCount;
                    if (checkResults.isLimitExceeded) {
                        break;
                    }
                }
                await globalUtils.sleep(countLimitService.countLimitData.millisecondsBetweenItemsDelayCount);
                resolve(checkResults);
            }
            catch (e) { this.handleError(e); }
        }).catch(e => this.handleError(e));
    }

    scanItemContent(itemPath, index) {
        return new Promise((resolve, reject) => {
            if (reject) { }
            try {
                applicationService.applicationData.itemIndex = index;
                const fileType = fileUtils.getFileType(itemPath);
                if (this.allowFileExtensions.findIndex(file => file === fileType.toLowerCase()) === -1) {
                    itemService.itemData.skipItemsCount++;
                    resolve(null);
                    return;
                }
                itemService.itemData.scanItemsCount++;
                const checkResults = new CheckResults(itemPath);
                const { itemFullName, itemDirectoryPath } = fileUtils.getItemName(itemPath);
                applicationService.applicationData.itemName = itemFullName;
                applicationService.applicationData.itemDirectoryPath = itemDirectoryPath;
                const stream = byline(fileUtils.createStream(itemPath));
                stream.on('data', (line) => {
                    line = textUtils.replaceNoneAlphabets(line, ' ');
                    const wordsList = textUtils.getSplitWords(line);
                    for (let i = 0; i < wordsList.length; i++) {
                        itemService.itemData.scanWordsCount++;
                        const word = wordsList[i];
                        const checkResult = spellCheckService.check(word);
                        if (checkResult.isIgnore) {
                            itemService.itemData.ignoreWordsCount++;
                        }
                        if (validationUtils.isExists(checkResult.suggestions)) {
                            itemService.itemData.misspellWordsCount++;
                            checkResults.isItemMisspell = true;
                        }
                        checkResults.resultsList.push(checkResult);
                        checkResults.isLimitExceeded = itemService.itemData.scanWordsCount > countLimitService.countLimitData.maximumWordsScanCount;
                        if (checkResults.isLimitExceeded) {
                            stream.destroy();
                            break;
                        }
                    }
                    stream.pause();
                    setTimeout(() => {
                        stream.resume();
                    }, countLimitService.countLimitData.millisecondsBetweenItemsDelayCount);
                });
                stream.on('end', () => {
                    resolve(checkResults);
                    return;
                });
                stream.on('close', () => {
                    resolve(checkResults);
                    return;
                });
            }
            catch (e) { this.handleError(e); }
        }).catch(e => this.handleError(e));
    }

    handleError(e) {
        if (e) { }
        itemService.itemData.errorItemsCount++;
    }
}

module.exports = new ScanService();