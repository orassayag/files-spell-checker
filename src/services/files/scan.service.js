const byline = require('byline');
const { CheckResultsModel } = require('../../core/models');
const { MethodEnum, StatusEnum } = require('../../core/enums');
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
        const isName = applicationService.applicationDataModel.method === MethodEnum.NAME;
        const methodName = `scanItem${textUtils.capitalizeFirstLetter(applicationService.applicationDataModel.method)}`;
        let isLimitExceeded = false;
        let items = await fileUtils.getFilesRecursive({
            directory: pathService.pathDataModel.scanPath,
            includeDirectories: isName,
            ignoreFiles: this.ignoreFiles,
            ignorePaths: this.ignorePaths
        });
        items = items.slice(0, countLimitService.countLimitDataModel.maximumItemsCount);
        itemService.itemDataModel.totalItemsCount = items.length;
        applicationService.applicationDataModel.status = StatusEnum.SCAN;
        for (let i = 0; i < items.length; i++) {
            const checkResultsModel = await this[methodName](items[i], i + 1);
            if (!checkResultsModel) {
                continue;
            }
            itemService.itemDataModel.scanItemsCount++;
            if (checkResultsModel.isItemMisspell) {
                itemService.itemDataModel.misspellItemsCount++;
                await logService.logCheckResults(checkResultsModel);
            }
            if (checkResultsModel.isLimitExceeded) {
                isLimitExceeded = true;
                break;
            }
            applicationService.applicationDataModel.itemCheckResult = checkResultsModel.resultsList[0];
        }
        return isLimitExceeded;
    }

    scanItemName(itemPath, index) {
        return new Promise(async (resolve, reject) => {
            if (reject) { }
            try {
                applicationService.applicationDataModel.itemIndex = index;
                itemService.itemDataModel.scanItemsCount++;
                const checkResultsModel = new CheckResultsModel(itemPath);
                const { itemName, itemFullName, itemDirectoryPath } = fileUtils.getItemName(itemPath);
                applicationService.applicationDataModel.itemName = itemFullName;
                applicationService.applicationDataModel.itemDirectoryPath = itemDirectoryPath;
                const wordsList = textUtils.getSplitWords(itemName);
                for (let i = 0; i < wordsList.length; i++) {
                    itemService.itemDataModel.scanWordsCount++;
                    let word = wordsList[i];
                    word = textUtils.replaceNoneAlphabets(word, '');
                    const checkResultModel = spellCheckService.check(word);
                    if (checkResultModel.isIgnore) {
                        itemService.itemDataModel.ignoreWordsCount++;
                    }
                    if (validationUtils.isExists(checkResultModel.suggestions)) {
                        itemService.itemDataModel.misspellWordsCount++;
                        checkResultsModel.isItemMisspell = true;
                    }
                    checkResultsModel.resultsList.push(checkResultModel);
                    checkResultsModel.isLimitExceeded = itemService.itemDataModel.scanWordsCount > countLimitService.countLimitDataModel.maximumWordsScanCount;
                    if (checkResultsModel.isLimitExceeded) {
                        break;
                    }
                }
                await globalUtils.sleep(countLimitService.countLimitDataModel.millisecondsBetweenItemsDelayCount);
                resolve(checkResultsModel);
            }
            catch (e) { this.handleError(e); }
        }).catch(e => this.handleError(e));
    }

    scanItemContent(itemPath, index) {
        return new Promise((resolve, reject) => {
            if (reject) { }
            try {
                applicationService.applicationDataModel.itemIndex = index;
                const fileType = fileUtils.getFileType(itemPath);
                if (this.allowFileExtensions.findIndex(file => file === fileType.toLowerCase()) === -1) {
                    itemService.itemDataModel.skipItemsCount++;
                    resolve(null);
                    return;
                }
                itemService.itemDataModel.scanItemsCount++;
                const checkResultsModel = new CheckResultsModel(itemPath);
                const { itemFullName, itemDirectoryPath } = fileUtils.getItemName(itemPath);
                applicationService.applicationDataModel.itemName = itemFullName;
                applicationService.applicationDataModel.itemDirectoryPath = itemDirectoryPath;
                const stream = byline(fileUtils.createStream(itemPath));
                stream.on('data', (line) => {
                    line = textUtils.replaceNoneAlphabets(line, ' ');
                    const wordsList = textUtils.getSplitWords(line);
                    for (let i = 0; i < wordsList.length; i++) {
                        itemService.itemDataModel.scanWordsCount++;
                        const word = wordsList[i];
                        const checkResultModel = spellCheckService.check(word);
                        if (checkResultModel.isIgnore) {
                            itemService.itemDataModel.ignoreWordsCount++;
                        }
                        if (validationUtils.isExists(checkResultModel.suggestions)) {
                            itemService.itemDataModel.misspellWordsCount++;
                            checkResultsModel.isItemMisspell = true;
                        }
                        checkResultsModel.resultsList.push(checkResultModel);
                        checkResultsModel.isLimitExceeded = itemService.itemDataModel.scanWordsCount > countLimitService.countLimitDataModel.maximumWordsScanCount;
                        if (checkResultsModel.isLimitExceeded) {
                            stream.destroy();
                            break;
                        }
                    }
                    stream.pause();
                    setTimeout(() => {
                        stream.resume();
                    }, countLimitService.countLimitDataModel.millisecondsBetweenItemsDelayCount);
                });
                stream.on('end', () => {
                    resolve(checkResultsModel);
                    return;
                });
                stream.on('close', () => {
                    resolve(checkResultsModel);
                    return;
                });
            }
            catch (e) { this.handleError(e); }
        }).catch(e => this.handleError(e));
    }

    handleError(e) {
        if (e) { }
        itemService.itemDataModel.errorItemsCount++;
    }
}

module.exports = new ScanService();