const pathUtils = require('../utils/files/path.utils');
const { Method, Mode } = require('../core/enums');

const settings = {
    // ===GENERAL=== //
    // Determine the method type of checking misspells: NAME / CONTENT.
    // NAME = Scan file and directory names for misspells.
    // CONTENT = Scan file contents for misspells.
    METHOD: Method.NAME,
    // Determine the mode of the application: STANDARD / SILENT.
    // STANDARD - Display the console status log while the application is running.
    // SILENT - Don't display anything while the application is running.
    MODE: Mode.STANDARD,
    // Determine the absolute path to scan the files (and directories in case of NAME
    // method) in order to scan them. For example: C:\\Or\\Web\\PuppeteerExample
    SCAN_PATH: 'C:\\',

    // ===LOG=== //
    // Determine if to log results for each email to a TXT file.
    IS_LOG_RESULTS: true,
    // Determine the maximum log counts per TXT file.
    MAXIMUM_LOGS_COUNT_PER_FILE: 5000,

    // ===COUNT & LIMIT=== //
    // Determine the maximum limit words to scan for misspells. After the limit is exceeded the application will exit.
    MAXIMUM_WORDS_SCAN_COUNT: 100000000,
    // Determine how much milliseconds interval to calculate the time of the status line in the console.
    MILLISECONDS_INTERVAL_COUNT: 500,
    // Determine the maximum number of characters count of the file name and directory path displayed in the console
    // status. If exceeded it will be cutted.
    MAXIMUM_ITEM_NAME_PATH_CHARACTERS_DISPLAY_COUNT: 150,
    // Determine the maximum items to scan for misspells. Other items will be ignored.
    MAXIMUM_ITEMS_COUNT: 100000000,
    // Determine the delay in milliseconds to pause between items scan.
    MILLISECONDS_BETWEEN_ITEMS_DELAY_COUNT: 100,
    // Determine the delay in milliseconds to pause before exiting the application in the end.
    MILLISECONDS_END_DELAY_COUNT: 1000,
    // Determine the number of retries to validate the URLs.
    MAXIMUM_URL_VALIDATION_COUNT: 5,
    // Determine the milliseconds count timeout to wait between URL validation retry.
    MILLISECONDS_TIMEOUT_URL_VALIDATION: 1000,

    // ===ROOT PATH=== //
    // Determine the application name used for some of the calculated paths.
    APPLICATION_NAME: 'files-spell-checker',
    // Determine the path for the outer application, where other directories located, such as backups, sources, etc...
    // (Working example: 'C:\\Or\\Web\\sender\\').
    OUTER_APPLICATION_PATH: pathUtils.getJoinPath({
        targetPath: __dirname,
        targetName: '../../../'
    }),
    // Determine the inner application path where all the source of the application is located.
    // (Working example: 'C:\\Or\\Web\\sender\\sender\\').
    INNER_APPLICATION_PATH: pathUtils.getJoinPath({
        targetPath: __dirname,
        targetName: '../../'
    }),

    // ===DYNAMIC PATH=== //
    // All these paths will be calculated during runtime in the initiate service.
    // DON'T REMOVE THE KEYS, THEY WILL BE CALCULATED TO PATHS DURING RUNTIME.
    // Determine the application path where all the source of the application is located.
    // (Working example: 'C:\\Or\\Web\\files-spell-checker\\files-spell-checker').
    APPLICATION_PATH: 'files-spell-checker',
    // Determine the backups directory which all the local backup will be created to.
    // (Working example: 'C:\\Or\\Web\\files-spell-checker\\backups').
    BACKUPS_PATH: 'backups',
    // Determine the dist directory path which there, all the outcome of the logs will be created.
    // (Working example: 'C:\\Or\\Web\\files-spell-checker\\files-spell-checker\\dist').
    DIST_PATH: 'dist',
    // (Working example: 'C:\\Or\\Web\\files-spell-checker\\files-spell-checker\\node_modules').
    NODE_MODULES_PATH: 'node_modules',
    // (Working example: 'C:\\Or\\Web\\files-spell-checker\\files-spell-checker\\package.json').
    PACKAGE_JSON_PATH: 'package.json',
    // (Working example: 'C:\\Or\\Web\\files-spell-checker\\files-spell-checker\\package-lock.json').
    PACKAGE_LOCK_JSON_PATH: 'package-lock.json',
    // (Working example: 'C:\\Or\\Web\\files-spell-checker\\files-spell-checker\\dictionaries').
    DICTIONARIES_PATH: 'dictionaries',

    // ===BACKUP=== //
    // Determine the directories to ignore when a backup copy is taking place.
    // For example: 'dist'.
    IGNORE_DIRECTORIES: ['dist', 'node_modules', 'dictionaries', 'sources'],
    // Determine the files to ignore when the back copy is taking place.
    // For example: 'back_sources_tasks.txt'.
    IGNORE_FILES: [],
    // Determine the files to force include when the back copy is taking place.
    // For example: '.gitignore'.
    INCLUDE_FILES: ['.gitignore'],
    // Determine the period of time in milliseconds to
    // check that files were created / moved to the target path.
    MILLISECONDS_DELAY_VERIFY_BACKUP_COUNT: 1000,
    // Determine the number of times in loop to check for version of a backup.
    // For example, if a backup name "test-test-test-1" exists, it will check for "test-test-test-2",
    // and so on, until the current maximum number.
    BACKUP_MAXIMUM_DIRECTORY_VERSIONS_COUNT: 50,

    // ===VALIDATION=== //
    // Determine the link address to test the internet connection.
    VALIDATION_CONNECTION_LINK: 'google.com'
};

module.exports = settings;