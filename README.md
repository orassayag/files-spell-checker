# Files Spell Checker

A Node.js application to scan file names, directory paths, and file contents for spelling mistakes and generate comprehensive reports. Built to help developers maintain consistent and error-free naming conventions in their projects.

Built in February 2020. Updated in 2024. Thanks to [cspell-dicts](https://github.com/streetsidesoftware/cspell-dicts/tree/master/dictionaries) for the dictionaries.

## Features

- 📁 **Dual Mode Scanning**
  - NAME mode: Scan file and directory names for misspellings
  - CONTENT mode: Scan file contents for misspellings
- 📚 **Dictionary Support**: Automatic download and integration of multiple dictionaries
- 🎯 **Flexible Configuration**: Extensive settings for paths, file types, and ignore patterns
- 📊 **Real-time Progress**: Console status updates with detailed statistics
- 📝 **Comprehensive Logging**: Detailed TXT reports with suggestions for corrections
- ⚡ **Performance Controls**: Configurable delays and limits for large projects
- 🚫 **Smart Filtering**: Ignore specific words, paths, and file types
- ✅ **Interactive Confirmation**: Review settings before starting scan

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or pnpm
- Internet connection (for initial dictionary download)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/orassayag/files-spell-checker.git
cd files-spell-checker
```

2. Install dependencies:
```bash
npm install
```

3. Configure settings (see Configuration section)

4. Run the application:
```bash
npm start
```

## Configuration

Edit `src/settings/settings.js` to configure the application:

### Essential Settings

```javascript
{
  // Choose scanning method: NAME or CONTENT
  METHOD: MethodEnum.NAME,
  
  // Choose display mode: STANDARD or SILENT
  MODE: ModeEnum.STANDARD,
  
  // Set the path to scan
  SCAN_PATH: 'C:\\projects\\my-project',
  
  // Enable/disable result logging
  IS_LOG_RESULTS: true,
  
  // Maximum items to scan
  MAXIMUM_ITEMS_COUNT: 100000000
}
```

### Additional Configuration Files

- **File Extensions**: `src/configurations/files/allowFileExtensions.configuration.js`
- **Ignore Paths**: `src/configurations/files/ignorePaths.configuration.js`
- **Ignore Words**: `src/configurations/files/ignoreWords.configuration.js`
- **Ignore Files**: `src/configurations/files/ignoreFiles.configuration.js`
- **Dictionaries**: `src/configurations/files/dictionariesURLs.configuration.js`

See [INSTRUCTIONS.md](INSTRUCTIONS.md) for detailed configuration guide.

## Usage

### Basic Usage

```bash
npm start
```

The application will:
1. Display important settings
2. Ask for confirmation
3. Download dictionaries (first run only)
4. Scan files/directories
5. Generate report in `dist` directory

### Console Output Example

```
===IMPORTANT SETTINGS===
METHOD: NAME
MODE: STANDARD
SCAN_PATH: C:\projects\my-project
========================
OK to run? (y = yes)

===[SETTINGS] Time: 00.00:00:04 | Method: NAME | Ignore Words: 0 | Ignore Paths: 13===
===[GENERAL] Current: 40/250 (16.00%) | Status: SCAN===
===[ITEMS] Total: ✅ 79 | Misspell: ❌ 0 | Skip: 0 | Error: 0===
===[WORDS] Total: 114 | Misspell: 0===
```

### Available Scripts

- `npm start` - Run the spell checker
- `npm run backup` - Create a backup of the project
- `npm run sand` - Run sandbox tests

## Project Structure

```mermaid
graph TD
    A[scan.script.js] --> B[ScanLogic]
    B --> C[Confirm Settings]
    B --> D[Validate Settings]
    B --> E[Initiate Services]
    B --> F[Start Scanning]
    
    E --> G[nSpellService]
    E --> H[ScanService]
    E --> I[LogService]
    E --> J[PathService]
    
    F --> K[ItemService]
    F --> L[SpellCheckService]
    
    G --> M[Download Dictionaries]
    G --> N[Load nspell]
    
    H --> O[Scan Files/Dirs]
    O --> K
    K --> L
    L --> I
    
    style A fill:#e1f5ff
    style B fill:#fff3e0
    style G fill:#f3e5f5
    style H fill:#e8f5e9
    style I fill:#fff9c4
```

## Architecture

```mermaid
graph LR
    A[Settings] --> B[Scripts]
    B --> C[Logics]
    C --> D[Services]
    D --> E[Utils]
    D --> F[Models]
    D --> G[Enums]
    
    H[Configurations] --> D
    
    style A fill:#e3f2fd
    style B fill:#f3e5f5
    style C fill:#fff3e0
    style D fill:#e8f5e9
    style E fill:#fce4ec
    style F fill:#fff9c4
    style G fill:#f1f8e9
    style H fill:#fce4ec
```

## Output Files

Results are saved to timestamped directories:
```
dist/
  └── 1_20240305_143022/
      └── scan_results.txt
```

Log files include:
- Files/directories with misspellings
- Suggested corrections
- Full path information
- Summary statistics

## Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [nspell](https://github.com/wooorm/nspell) - Spell checker library
- [dictionary-en](https://github.com/wooorm/dictionary-en) - English dictionary
- [fs-extra](https://github.com/jprichardson/node-fs-extra) - File system utilities
- [log-update](https://github.com/sindresorhus/log-update) - Console logging
- [is-reachable](https://github.com/sindresorhus/is-reachable) - Internet connectivity check

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Versioning

We use [SemVer](http://semver.org) for versioning. For the versions available, see the [tags on this repository](https://github.com/orassayag/files-spell-checker/tags).

## Author

* **Or Assayag** - *Initial work* - [orassayag](https://github.com/orassayag)
* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.