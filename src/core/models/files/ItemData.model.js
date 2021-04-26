class ItemDataModel {

	constructor() {
		this.totalItemsCount = 0;
		this.scanItemsCount = 0;
		this.misspellItemsCount = 0;
		this.skipItemsCount = 0;
		this.errorItemsCount = 0;
		this.scanWordsCount = 0;
		this.misspellWordsCount = 0;
	}
}

module.exports = ItemDataModel;