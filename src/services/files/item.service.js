const { ItemDataModel } = require('../../core/models');

class ItemService {

    constructor() {
        this.itemDataModel = null;
    }

    initiate() {
        this.itemDataModel = new ItemDataModel();
    }
}

module.exports = new ItemService();