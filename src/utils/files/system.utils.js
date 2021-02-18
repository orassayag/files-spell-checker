const logUtils = require('./log.utils');

class SystemUtils {

    constructor() { }

    exit(exitReason, color) {
        logUtils.logColorStatus({
            status: this.getExitReason(exitReason),
            color: color
        });
        process.exit(0);
    }

    getExitReason(exitReason) {
        if (!exitReason) {
            return '';
        }
        return `EXIT: ${exitReason}`;
    }
}

module.exports = new SystemUtils();