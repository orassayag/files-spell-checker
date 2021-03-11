## Instructions

===================
FAST & BASIC START.
===================
1. Open the project in IDE (Current to 18/02/2021 I'm using VSCode).
2. Open the following file in the src/settings/settings.js file.
3. Search for the first setting - 'METHOD' - And select NAME (file names and paths) or CONTENT (content of specific files).
4. Search for setting 'MODE' - Make sure it's on 'STANDARD'.
5. Search for setting 'SCAN_PATH' - Select the path you want to scan.
6. If you selected 'CONTENT' on the method, go to allowFileExtensions.js file to select the file types to scan.
7. Next - Time to install the NPM packages. On the terminal run 'npm i'. It will install automatically all the required NPM packages.
8. On terminal run 'npm start'. If everything goes well, you will start to see the console status line appear.
9. If you see any error - Need to check what's changed. Current to 18/02/2021, it works fine.
10. If you see the console status line but the 'Total' not progressing - Need to check what's wrong.
11. If no errors and the progress works OK, make sure to check on dist/production/date of today
    (Example: 1_20200316_222124)/ That the TXT file was created successfully.
12. Successful running application on production should look like this:

/* cSpell:disable */
===IMPORTANT SETTINGS===
METHOD: NAME
MODE: STANDARD
SCAN_PATH: C:\Or\Web\sender\sender
========================
OK to run? (y = yes)
y
===VALIDATE GENERAL SETTINGS===
===INITIATE THE SERVICES===
===DOWNLOAD DICTIONARIES===
===IMPLEMENT DICTIONARIES===
===[SETTINGS] Time: 00.00:00:04 [\] | Method: NAME | Ignore Words: 0 | Ignore Paths: 13===
===[GENERAL] Current: 40/250 (16.00%) | Status: SCAN===
===[ITEMS] Total: ✅  79 | Misspell: ❌  0 | Skip: 0 | Error: 0===
===[WORDS] Total: 114 | Misspell: 0===
===[NAME] backup_24122020.txt===
===[PATH] C:\Or\Web\sender\sender\misc\backup===
===[SCAN PATH] C:\Or\Web\sender\sender===
Terminate batch job (Y/N)? y

## Author

* **Or Assayag** - *Initial work* - [orassayag](https://github.com/orassayag)
* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverFlow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://il.linkedin.com/in/orassayag