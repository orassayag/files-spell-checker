class CheckResults {

    constructor(itemPath) {
        this.itemPath = itemPath;
        this.resultsList = [];
        this.isLimitExceeded = false;
        this.isItemMisspell = false;
    }
}

module.exports = CheckResults;