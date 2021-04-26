const { LogDataModel } = require('../../core/models');
const { ColorEnum, PlaceholderEnum, StatusIconEnum } = require('../../core/enums');
const { ignorePaths, ignoreWords } = require('../../configurations');
const applicationService = require('./application.service');
const countLimitService = require('./countLimit.service');
const itemService = require('./item.service');
const pathService = require('./path.service');
const { fileUtils, logUtils, pathUtils, textUtils, timeUtils, validationUtils } = require('../../utils');

class LogService {

	constructor() {
		this.logDataModel = null;
		this.logInterval = null;
		// ===PATH=== //
		this.baseSessionPath = null;
		this.sessionDirectoryPath = null;
		this.itemResultsPath = null;
		this.frames = ['-', '\\', '|', '/'];
		this.i = 0;
		this.emptyValue = '##';
		this.logSeparator = '==========';
		this.directoryIndex = null;
		this.fileIndex = null;
		this.logCounts = 0;
	}

	initiate(settings) {
		this.logDataModel = new LogDataModel(settings);
		this.initiateDirectories();
	}

	initiateDirectories() {
		// ===PATH=== //
		if (!this.logDataModel.isLogResults) {
			return;
		}
		this.baseSessionPath = pathService.pathDataModel.distPath;
		fileUtils.createDirectory(this.baseSessionPath);
		this.getNextDirectoryIndex();
		this.createSessionDirectory();
	}

	createSessionDirectory() {
		this.sessionDirectoryPath = pathUtils.getJoinPath({
			targetPath: this.baseSessionPath,
			targetName: `${this.directoryIndex}_${applicationService.applicationDataModel.logDateTime}`
		});
		fileUtils.createDirectory(this.sessionDirectoryPath);
		this.updateFileName();
	}

	updateFileName() {
		if (this.directoryIndex) {
			this.fileIndex++;
		}
		else {
			this.fileIndex = 1;
		}
		this.itemResultsPath = this.createFilePath(`${this.fileIndex}_${textUtils.toLowerCase(applicationService.applicationDataModel.method)}_${PlaceholderEnum.DATE}`);
	}

	createFilePath(fileName) {
		return pathUtils.getJoinPath({
			targetPath: this.sessionDirectoryPath ? this.sessionDirectoryPath : pathService.pathDataModel.distPath,
			targetName: `${fileName.replace(PlaceholderEnum.DATE, applicationService.applicationDataModel.logDateTime)}.txt`
		});
	}

	getNextDirectoryIndex() {
		const directories = fileUtils.getAllDirectories(this.baseSessionPath);
		if (!validationUtils.isExists(directories)) {
			this.directoryIndex = 1;
			return;
		}
		this.directoryIndex = Math.max(...directories.map(name => textUtils.getSplitNumber(name))) + 1;
	}

	startLogProgress() {
		// Start the process for the first interval round.
		this.logInterval = setInterval(() => {
			// Update the current time of the process.
			applicationService.applicationDataModel.time = timeUtils.getDifferenceTimeBetweenDates({
				startDateTime: applicationService.applicationDataModel.startDateTime,
				endDateTime: timeUtils.getCurrentDate()
			});
			// Log the status console each interval round.
			this.logProgress();
		}, countLimitService.countLimitDataModel.millisecondsIntervalCount);
	}

	getDisplayItem(itemName) {
		return textUtils.cutText({ text: itemName, count: countLimitService.countLimitDataModel.maximumItemNamePathCharactersDisplayCount });
	}

	logProgress() {
		const time = `${applicationService.applicationDataModel.time} [${this.frames[this.i = ++this.i % this.frames.length]}]`;
		const currentPercentage = textUtils.calculatePercentageDisplay({ partialValue: applicationService.applicationDataModel.itemIndex, totalValue: itemService.itemDataModel.totalItemsCount });
		const current = textUtils.getNumberOfNumber({ number1: applicationService.applicationDataModel.itemIndex, number2: itemService.itemDataModel.totalItemsCount });
		const currentItem = `${current} (${currentPercentage})`;
		const scanItemsCount = `${StatusIconEnum.V}  ${textUtils.getNumberWithCommas(itemService.itemDataModel.scanItemsCount)}`;
		const misspellItemsCount = `${StatusIconEnum.X}  ${textUtils.getNumberWithCommas(itemService.itemDataModel.misspellItemsCount)}`;
		const itemName = this.getDisplayItem(applicationService.applicationDataModel.itemName);
		const itemDirectoryPath = this.getDisplayItem(applicationService.applicationDataModel.itemDirectoryPath);
		const scanPath = this.getDisplayItem(pathService.pathDataModel.scanPath);
		logUtils.logProgress({
			titlesList: ['SETTINGS', 'GENERAL', 'ITEMS', 'WORDS', 'NAME', 'PATH', 'SCAN PATH'],
			colorsTitlesList: [ColorEnum.BLUE, ColorEnum.BLUE, ColorEnum.BLUE, ColorEnum.BLUE, ColorEnum.BLUE, ColorEnum.BLUE, ColorEnum.BLUE],
			keysLists: [{
				'Time': time,
				'Method': applicationService.applicationDataModel.method,
				'Ignore Words': ignoreWords.length,
				'Ignore Paths': ignorePaths.length
			}, {
				'Current': currentItem,
				'Status': applicationService.applicationDataModel.status
			}, {
				'Total': scanItemsCount,
				'Misspell': misspellItemsCount,
				'Skip': itemService.itemDataModel.skipItemsCount,
				'Error': itemService.itemDataModel.errorItemsCount
			}, {
				'Total': itemService.itemDataModel.scanWordsCount,
				'Misspell': itemService.itemDataModel.misspellWordsCount
			}, {
				'#': itemName
			}, {
				'#': itemDirectoryPath
			}, {
				'#': scanPath
			}],
			colorsLists: [
				[ColorEnum.YELLOW, ColorEnum.YELLOW, ColorEnum.YELLOW, ColorEnum.YELLOW],
				[ColorEnum.YELLOW, ColorEnum.YELLOW],
				[ColorEnum.GREEN, ColorEnum.RED, ColorEnum.CYAN, ColorEnum.CYAN],
				[ColorEnum.GREEN, ColorEnum.RED],
				[],
				[],
				[]
			],
			nonNumericKeys: {},
			statusColor: ColorEnum.CYAN
		});
	}

	createEmailTemplate(checkResultsModel) {
		const { itemPath, resultsList } = checkResultsModel;
		const lines = [];
		lines.push(itemPath);
		for (let i = 0; i < resultsList.length; i++) {
			const { fix, suggestions } = resultsList[i];
			if (!fix || !validationUtils.isExists(suggestions)) {
				continue;
			}
			lines.push(`${fix} => ${suggestions.join(', ')}`);
		}
		lines.push(`${this.logSeparator}\n`);
		return lines.join('\n');
	}

	updateSessionDirectoryPath() {
		this.logCounts++;
		if (this.logCounts % countLimitService.countLimitDataModel.maximumLogsCountPerFile === 0) {
			this.updateFileName();
		}
	}

	async logCheckResults(checkResultsModel) {
		if (!this.logDataModel.isLogResults) {
			return;
		}
		const message = this.createEmailTemplate(checkResultsModel);
		await fileUtils.appendFile({
			targetPath: this.itemResultsPath,
			message: message
		});
		this.updateSessionDirectoryPath();
	}

	createLineTemplate(title, value) {
		return textUtils.addBreakLine(`${logUtils.logColor(`${title}:`, ColorEnum.MAGENTA)} ${value}`);
	}

	createConfirmSettingsTemplate(settings) {
		const parameters = ['METHOD', 'MODE', 'SCAN_PATH'];
		let settingsText = Object.keys(settings).filter(s => parameters.indexOf(s) > -1)
			.map(k => this.createLineTemplate(k, settings[k])).join('');
		settingsText = textUtils.removeLastCharacters({
			value: settingsText,
			charactersCount: 1
		});
		return `${textUtils.setLogStatus('IMPORTANT SETTINGS')}
${settingsText}
========================
OK to run? (y = yes)`;
	}

	close() {
		if (this.logInterval) {
			clearInterval(this.logInterval);
		}
	}
}

module.exports = new LogService();