const enumUtils = require('../enum.utils');

const Method = enumUtils.createEnum([
    ['NAME', 'NAME'],
    ['CONTENT', 'CONTENT']
]);

const Mode = enumUtils.createEnum([
    ['STANDARD', 'STANDARD'],
    ['SILENT', 'SILENT']
]);

const ScriptType = enumUtils.createEnum([
    ['BACKUP', 'backup'],
    ['SCAN', 'scan'],
    ['TEST', 'test']
]);

const Status = enumUtils.createEnum([
    ['INITIATE', 'INITIATE'],
    ['VALIDATE', 'VALIDATE'],
    ['DOWNLOAD', 'DOWNLOAD'],
    ['IMPLEMENT', 'IMPLEMENT'],
    ['SCAN', 'SCAN'],
    ['LIMIT_EXCEEDED', 'LIMIT EXCEEDED'],
    ['ABORT_BY_THE_USER', 'ABORT BY THE USER'],
    ['FINISH', 'FINISH']
]);

module.exports = { Method, Mode, ScriptType, Status };