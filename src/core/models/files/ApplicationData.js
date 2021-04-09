const { timeUtils } = require('../../../utils');

class ApplicationData {

	constructor(data) {
		// Set the parameters from the settings file.
		const { settings, status } = data;
		const { METHOD, MODE, VALIDATION_CONNECTION_LINK } = settings;
		this.method = METHOD;
		this.mode = MODE;
		this.validationConnectionLink = VALIDATION_CONNECTION_LINK;
		this.status = status;
		this.startDateTime = null;
		this.time = null;
		this.logDateTime = timeUtils.getFullDateNoSpaces();
		this.itemIndex = 0;
		this.itemName = null;
		this.itemDirectoryPath = null;
		this.itemCheckResult = null;
	}
}

module.exports = ApplicationData;