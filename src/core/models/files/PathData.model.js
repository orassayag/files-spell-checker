class PathDataModel {

	constructor(settings) {
		// Set the parameters from the settings file.
		const { SCAN_PATH, DIST_PATH } = settings;
		this.scanPath = SCAN_PATH;
		this.distPath = DIST_PATH;
	}
}

module.exports = PathDataModel;