const { ItemData } = require('../../core/models');

class ItemService {

    constructor() {
        this.itemData = null;
    }

    initiate() {
        this.itemData = new ItemData();
    }
}

module.exports = new ItemService();