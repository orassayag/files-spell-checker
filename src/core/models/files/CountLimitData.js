class CountLimitData {

	constructor(settings) {
		// Set the parameters from the settings file.
		const { MAXIMUM_WORDS_SCAN_COUNT, MILLISECONDS_INTERVAL_COUNT, MAXIMUM_ITEM_NAME_PATH_CHARACTERS_DISPLAY_COUNT,
			MAXIMUM_ITEMS_COUNT, MILLISECONDS_BETWEEN_ITEMS_DELAY_COUNT, MILLISECONDS_END_DELAY_COUNT } = settings;
		this.maximumWordsScanCount = MAXIMUM_WORDS_SCAN_COUNT;
		this.millisecondsIntervalCount = MILLISECONDS_INTERVAL_COUNT;
		this.maximumItemNamePathCharactersDisplayCount = MAXIMUM_ITEM_NAME_PATH_CHARACTERS_DISPLAY_COUNT;
		this.maximumItemsCount = MAXIMUM_ITEMS_COUNT;
		this.millisecondsBetweenItemsDelayCount = MILLISECONDS_BETWEEN_ITEMS_DELAY_COUNT;
		this.millisecondsEndDelayCount = MILLISECONDS_END_DELAY_COUNT;
	}
}

module.exports = CountLimitData;