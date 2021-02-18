const settings = require('../settings/settings');
const { Color, Mode, Status } = require('../core/enums');
const { applicationService, confirmationService, countLimitService, logService, nSpellService,
    itemService, pathService, scanService, validationService } = require('../services');
const globalUtils = require('../utils/files/global.utils');
const { logUtils, systemUtils } = require('../utils');

class ScanLogic {

    constructor() { }

    async run() {
        // Validate all settings are fit to the user needs.
        await this.confirm();
        // Validate general settings.
        await this.validateGeneralSettings();
        // Initiate all the settings, configurations, services, ect...
        await this.initiate();
        // Start the scanning process.
        await this.startSession();
    }

    async initiate() {
        logUtils.logMagentaStatus('INITIATE THE SERVICES');
        await nSpellService.initiate(settings);
        countLimitService.initiate(settings);
        itemService.initiate();
        scanService.initiate();
        pathService.initiate(settings);
        await logService.initiate(settings);
    }

    async validateGeneralSettings() {
        logUtils.logMagentaStatus('VALIDATE GENERAL SETTINGS');
        // Validate internet connection works.
        applicationService.initiate(settings, Status.INITIATE);
        await validationService.validateInternetConnection();
    }

    async startSession() {
        // Initiate.
        applicationService.applicationData.startDateTime = new Date();
        if (applicationService.applicationData.mode === Mode.STANDARD) {
            logService.startLogProgress();
        }
        const isLimitExceeded = await scanService.run();
        let status, color = null;
        if (isLimitExceeded) {
            status = Status.LIMIT_EXCEEDED;
            color = Color.RED;
        }
        else {
            status = Status.FINISH;
            color = Color.GREEN;
        }
        await this.exit(status, color);
    }

    async sleep() {
        await globalUtils.sleep(countLimitService.countLimitData.millisecondsBetweenItemsDelayCount);
    }

    // Let the user confirm all the IMPORTANT settings before the process start.
    async confirm() {
        if (!await confirmationService.confirm(settings)) {
            await this.exit(Status.ABORT_BY_THE_USER, Color.RED);
        }
    }

    async exit(status, color) {
        if (applicationService.applicationData) {
            applicationService.applicationData.status = status;
            await this.sleep();
            logService.close();
        }
        systemUtils.exit(status, color);
    }
}

module.exports = ScanLogic;