class CheckResult {

    constructor(original) {
        this.original = original;
        this.fix = null;
        this.suggestions = null;
        this.isIgnore = false;
    }
}

module.exports = CheckResult;