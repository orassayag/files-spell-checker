# Setup and Usage Instructions

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Available Commands](#available-commands)
4. [Configuration](#configuration)
5. [Running the Application](#running-the-application)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)
8. [Extending the Application](#extending-the-application)

## Quick Start Guide

### Prerequisites

#### System Requirements

- **Node.js**: Version 14.0.0 or higher
- **RAM**: 512MB minimum (higher for large projects)
- **Disk Space**: 100MB for dictionaries and logs
- **OS**: Windows, macOS, or Linux

- Node.js (v14 or higher)
- npm or pnpm

### Basic Setup

## Initial Setup

### 1. Install Dependencies

1. Clone the repository
2. Run installation command:

```bash
npm install
```

1. **Install the project**

   ```bash
   git clone https://github.com/orassayag/files-spell-checker.git
   cd files-spell-checker
   npm install
   ```

2. **Configure settings**
   - Open `src/settings/settings.js`
   - Configure the main settings (see Configuration section below)

3. **Run the application**
   ```bash
   npm start
   ```

## Available Commands

### Development Commands

**Linting and Formatting:**

- `npm run sand`: Run sandbox tests to verify spell-checker behavior.
- `npm run backup`: Create a compressed backup of the project.

### Running Scripts

**Main Scripts:**

- `npm start`: Main entry point to start the spell-checker.

## Configuration

Edit `src/settings/settings.js` to configure the application:

### Essential Settings

#### METHOD

Choose the scanning method:

- `MethodEnum.NAME` - Scan file names and directory paths for misspellings
- `MethodEnum.CONTENT` - Scan file contents for misspellings

```javascript
METHOD: MethodEnum.NAME;
```

#### MODE

Choose the display mode:

- `ModeEnum.STANDARD` - Display console status while running
- `ModeEnum.SILENT` - Run without console output

```javascript
MODE: ModeEnum.STANDARD;
```

#### SCAN_PATH

Set the absolute path to scan:

```javascript
SCAN_PATH: 'C:\\projects\\my-project';
```

### Log Settings

#### IS_LOG_RESULTS

Enable or disable logging results to TXT files:

```javascript
IS_LOG_RESULTS: true;
```

#### MAXIMUM_LOGS_COUNT_PER_FILE

Maximum number of log entries per file:

```javascript
MAXIMUM_LOGS_COUNT_PER_FILE: 5000;
```

### Limits and Performance

#### MAXIMUM_WORDS_SCAN_COUNT

Maximum words to scan before stopping:

```javascript
MAXIMUM_WORDS_SCAN_COUNT: 100000000;
```

#### MAXIMUM_ITEMS_COUNT

Maximum items (files/directories) to scan:

```javascript
MAXIMUM_ITEMS_COUNT: 100000000;
```

#### MILLISECONDS_BETWEEN_ITEMS_DELAY_COUNT

Delay between scanning items (in milliseconds):

```javascript
MILLISECONDS_BETWEEN_ITEMS_DELAY_COUNT: 100;
```

## Advanced Configuration

### File Type Selection (CONTENT method only)

If you selected `CONTENT` method, configure file extensions to scan:

Edit `src/configurations/files/allowFileExtensions.configuration.js`:

```javascript
const allowFileExtensions = ['.txt', '.js', '.md', '.json'];
```

### Ignore Configurations

#### Ignore Paths

Edit `src/configurations/files/ignorePaths.configuration.js` to exclude specific paths:

```javascript
const ignorePaths = ['node_modules', '.git', 'dist', 'build'];
```

#### Ignore Words

Edit `src/configurations/files/ignoreWords.configuration.js` to whitelist specific words:

```javascript
const ignoreWords = ['webpack', 'redux', 'async'];
```

#### Ignore Files

Edit `src/configurations/files/ignoreFiles.configuration.js` to skip specific files:

```javascript
const ignoreFiles = ['.DS_Store', 'thumbs.db'];
```

## Running the Application

### Standard Mode

```bash
npm start
```

You'll see a confirmation prompt:

```
===IMPORTANT SETTINGS===
METHOD: NAME
MODE: STANDARD
SCAN_PATH: C:\projects\my-project
========================
OK to run? (y = yes)
```

Type `y` and press Enter to start.

### Console Output

While running, you'll see real-time status:

```
===[SETTINGS] Time: 00.00:00:04 [\] | Method: NAME | Ignore Words: 0 | Ignore Paths: 13===
===[GENERAL] Current: 40/250 (16.00%) | Status: SCAN===
===[ITEMS] Total: ✅  79 | Misspell: ❌  0 | Skip: 0 | Error: 0===
===[WORDS] Total: 114 | Misspell: 0===
===[NAME] backup_24122020.txt===
===[PATH] C:\projects\my-project\misc\backup===
===[SCAN PATH] C:\projects\my-project===
```

Status indicators:

- ✅ = Correct items
- ❌ = Items with misspellings
- Current/Total = Progress through items
- Status = Current operation (SCAN, DOWNLOAD, etc.)

### Silent Mode

For automated scripts or CI/CD:

```javascript
MODE: ModeEnum.SILENT;
```

## Output Files

Results are saved to the `dist` directory with timestamp-based folder names:

```
dist/
  └── 1_20240305_143022/
      └── scan_results.txt
```

Log files contain:

- File/directory names with misspellings
- Suggested corrections
- Path information
- Statistics summary

## Additional Scripts

### Backup

Create a backup of the project:

```bash
npm run backup
```

### Sandbox Testing

Run sandbox tests:

```bash
npm run sand
```

## Troubleshooting

### Internet Connection Required

The first run downloads dictionaries from online sources. Ensure you have an internet connection.

### Dictionary Download Issues

If dictionary downloads fail:

1. Check your internet connection
2. Verify firewall settings
3. The application will retry automatically

### Path Not Found

Ensure `SCAN_PATH` exists and uses proper format:

- Windows: `C:\\projects\\my-project`
- Unix/Linux/Mac: `/home/user/projects/my-project`

### No Progress

If the console shows status but no progress:

1. Check if the path contains accessible files
2. Verify file permissions
3. Review ignore configurations

### Memory Issues

For very large directories:

1. Reduce `MAXIMUM_ITEMS_COUNT`
2. Increase `MILLISECONDS_BETWEEN_ITEMS_DELAY_COUNT`
3. Use ignore configurations to skip large directories

## Dictionary Management

Dictionaries are downloaded automatically on first run to the `dictionaries` directory.

To add custom dictionaries:

1. Add URL to `src/configurations/files/dictionariesURLs.configuration.js`
2. Format: plain text, one word per line
3. Dictionaries are loaded into nspell on initialization

## Examples

### Example 1: Scan Project Files

```javascript
METHOD: MethodEnum.NAME;
SCAN_PATH: 'C:\\projects\\my-app';
```

### Example 2: Scan Code Content

```javascript
METHOD: MethodEnum.CONTENT;
SCAN_PATH: 'C:\\projects\\my-app';
// Also configure allowFileExtensions.configuration.js
```

## Best Practices

- **Pre-scan Review**: Always verify the `SCAN_PATH` in the console prompt before confirming.
- **Gradual Scanning**: For large projects, start with `NAME` mode before running `CONTENT` mode.
- **Custom Dictionaries**: Use the `ignoreWords` configuration for project-specific terminology.
- **Log Management**: Regularly clear the `dist` folder to maintain organized results.

## Extending the Application

- **Adding Dictionaries**: Add new URLs to `src/configurations/files/dictionariesURLs.configuration.js`.
- **New File Types**: Update `src/configurations/files/allowFileExtensions.configuration.js` for content scanning.
- **Custom Logic**: Implement new services in `src/services/files/` and register them in `initiate.service.js`.

## Documentation

- [README.md](README.md): Project overview and architecture.
- [CONTRIBUTING.md](CONTRIBUTING.md): Guidelines for code contributions.
- [LICENSE](LICENSE): MIT License details.

## External Resources

- [nspell Documentation](https://github.com/wooorm/nspell)
- [cspell Dictionaries](https://github.com/streetsidesoftware/cspell-dicts)
- [Node.js Documentation](https://nodejs.org/docs)

## Author

- **Or Assayag** - _Initial work_ - [orassayag](https://github.com/orassayag)
- Or Assayag <orassayag@gmail.com>
- GitHub: https://github.com/orassayag
- StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
- LinkedIn: https://linkedin.com/in/orassayag

## Version

1.0.0

## Last Updated

2026-05-31
