const enumUtils = require('../enum.utils');

const MethodEnum = enumUtils.createEnum([
    ['NAME', 'NAME'],
    ['CONTENT', 'CONTENT']
]);

const ModeEnum = enumUtils.createEnum([
    ['STANDARD', 'STANDARD'],
    ['SILENT', 'SILENT']
]);

const ScriptTypeEnum = enumUtils.createEnum([
    ['INITIATE', 'initiate'],
    ['BACKUP', 'backup'],
    ['SCAN', 'scan'],
    ['TEST', 'test']
]);

const StatusEnum = enumUtils.createEnum([
    ['INITIATE', 'INITIATE'],
    ['ABORT_BY_THE_USER', 'ABORT BY THE USER'],
    ['VALIDATE', 'VALIDATE'],
    ['DOWNLOAD', 'DOWNLOAD'],
    ['IMPLEMENT', 'IMPLEMENT'],
    ['SCAN', 'SCAN'],
    ['LIMIT_EXCEEDED', 'LIMIT EXCEEDED'],
    ['FINISH', 'FINISH']
]);

module.exports = { MethodEnum, ModeEnum, ScriptTypeEnum, StatusEnum };