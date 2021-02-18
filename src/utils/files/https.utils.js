const https = require('https');
const fileUtils = require('./file.utils');

class HttpsUtils {

    constructor() { }

    async downloadFile(uri, filepath) {
        await new Promise((resolve, reject) => {
            if (reject) { }
            https.get(uri, res => {
                res.pipe(fileUtils.createWriteStream(filepath));
                resolve();
            });
        });
    }
}

module.exports = new HttpsUtils();