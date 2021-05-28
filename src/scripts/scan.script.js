const errorScript = require('./error.script');
require('../services/files/initiate.service').initiate('scan');
const ScanLogic = require('../logics/scan.logic');
try {
    new ScanLogic().run();
} catch (error) {
    errorScript.handleScriptError(error, 1);
}