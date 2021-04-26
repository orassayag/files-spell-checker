const settings = require('../settings/settings');
const { ColorEnum, ModeEnum, StatusEnum } = require('../core/enums');
const { applicationService, confirmationService, countLimitService, logService, nSpellService,
    itemService, pathService, scanService, validationService } = require('../services');
const globalUtils = require('../utils/files/global.utils');
const { logUtils, systemUtils, timeUtils } = require('../utils');

class ScanLogic {

    constructor() { }

    async run() {
        // Validate all settings are fit to the user needs.
        await this.confirm();
        // Validate general settings.
        await this.validateGeneralSettings();
        // Initiate all the settings, configurations, services, etc...
        await this.initiate();
        // Start the scanning process.
        await this.startSession();
    }

    async initiate() {
        this.updateStatus('INITIATE THE SERVICES', StatusEnum.INITIATE);
        await nSpellService.initiate(settings);
        itemService.initiate();
        scanService.initiate();
        pathService.initiate(settings);
        logService.initiate(settings);
    }

    async validateGeneralSettings() {
        this.updateStatus('VALIDATE GENERAL SETTINGS', StatusEnum.VALIDATE);
        // Validate that the internet connection works.
        countLimitService.initiate(settings);
        applicationService.initiate(settings, StatusEnum.INITIATE);
        await validationService.validateInternetConnection();
    }

    async startSession() {
        // Initiate.
        applicationService.applicationDataModel.startDateTime = timeUtils.getCurrentDate();
        if (applicationService.applicationDataModel.mode === ModeEnum.STANDARD) {
            logService.startLogProgress();
        }
        const isLimitExceeded = await scanService.run();
        let status, color = null;
        if (isLimitExceeded) {
            status = StatusEnum.LIMIT_EXCEEDED;
            color = ColorEnum.RED;
        }
        else {
            status = StatusEnum.FINISH;
            color = ColorEnum.GREEN;
        }
        await this.exit(status, color);
    }

    async sleep() {
        await globalUtils.sleep(countLimitService.countLimitDataModel.millisecondsEndDelayCount);
    }

    // Let the user confirm all the IMPORTANT settings before the process starts.
    async confirm() {
        if (!await confirmationService.confirm(settings)) {
            await this.exit(StatusEnum.ABORT_BY_THE_USER, ColorEnum.RED);
        }
    }

    updateStatus(text, status) {
        logUtils.logMagentaStatus(text);
        if (applicationService.applicationDataModel) {
            applicationService.applicationDataModel.status = status;
        }
    }

    async exit(status, color) {
        if (applicationService.applicationDataModel) {
            applicationService.applicationDataModel.status = status;
            await this.sleep();
            logService.close();
        }
        systemUtils.exit(status, color);
    }
}

module.exports = ScanLogic;