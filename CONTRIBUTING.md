# Contributing

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [project's open source license](LICENSE).

Everyone is welcome to contribute to this project. Contributing doesn't just mean submitting pull requests—there are many different ways for you to get involved, including answering questions, reporting issues, improving documentation, or suggesting new features.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:
1. Check if the issue already exists in the [GitHub Issues](https://github.com/orassayag/files-spell-checker/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Your environment details (OS, Node version)
   - Sample files or paths that demonstrate the issue

### Submitting Pull Requests

1. Fork the repository
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following the code style guidelines below
4. Test your changes thoroughly
5. Commit with clear, descriptive messages
6. Push to your fork and submit a pull request

### Code Style Guidelines

This project uses:
- **JavaScript (Node.js)** with ES6+ features
- **ESLint** for code quality
- Service-oriented architecture pattern

Before submitting:
```bash
# Check for linting errors
npm run lint

# Test the application
npm start
```

### Coding Standards

1. **Service pattern**: Logic should be organized in services under `src/services/`
2. **Models**: Use model classes for data structures in `src/core/models/`
3. **Enums**: Define enums in `src/core/enums/`
4. **Clear naming**: Use descriptive names for variables, functions, and files
5. **Error handling**: All errors should be handled gracefully
6. **Configuration**: Keep configurable values in `src/settings/settings.js`

### Adding New Features

When adding new features:
1. Add configuration options in `src/settings/settings.js`
2. Create service logic in `src/services/files/`
3. Update models in `src/core/models/` if needed
4. Add utilities in `src/utils/files/` if needed
5. Update documentation (README.md, INSTRUCTIONS.md)
6. Test thoroughly with different file types and paths

### Testing Guidelines

When testing your changes:
1. Test both NAME and CONTENT methods
2. Test with various file types and extensions
3. Test with different path configurations
4. Verify log outputs are generated correctly
5. Test ignore configurations (ignore words, paths, files)
6. Test with large directory structures
7. Verify dictionary downloads work properly

### Adding Dictionary Support

To add support for new dictionaries:
1. Add the dictionary URL to `src/configurations/files/dictionariesURLs.configuration.js`
2. Ensure the dictionary format is compatible with nspell
3. Test with words from the new dictionary
4. Update documentation

### Ignore Configuration

To help others configure ignore lists:
- Add common technical terms to `src/configurations/files/ignoreWords.configuration.js`
- Document patterns in `src/configurations/files/ignorePaths.configuration.js`
- Explain in comments why certain patterns are ignored

## Questions or Need Help?

Please feel free to contact me with any question, comment, pull-request, issue, or any other thing you have in mind.

* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

Thank you for contributing! 🙏
