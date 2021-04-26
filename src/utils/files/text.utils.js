const colorUtils = require('./color.utils');
const regexUtils = require('./regex.utils');
const validationUtils = require('./validation.utils');

class TextUtils {

    constructor() {
        this.b = '===';
    }

    setLogStatus(status) {
        if (!status) {
            return '';
        }
        return `${this.b}${status}${this.b}`;
    }

    getBackupName(data) {
        const { applicationName, date, title, index } = data;
        return `${applicationName}_${date}-${(index + 1)}${title ? `-${title}` : ''}`;
    }

    // This method adds leading 0 if needed.
    addLeadingZero(number) {
        if (!validationUtils.isValidNumber(number)) {
            return '';
        }
        return number < 10 ? `0${number}` : number;
    }

    removeAllCharacters(text, target) {
        if (!text) {
            return '';
        }
        return text.split(target).join('');
    }

    addBackslash(text) {
        if (!text) {
            return '';
        }
        return `${text}/`;
    }

    toLowerCase(text) {
        if (!text) {
            return '';
        }
        return text.toLowerCase();
    }

    getSplitWords(name) {
        if (!name) {
            return name;
        }
        return name.split(regexUtils.splitWords);
    }

    replaceNoneAlphabets(name, character) {
        if (!name) {
            return name;
        }
        return name.replace(regexUtils.clearNoneAlphabets, character);
    }

    calculatePercentageDisplay(data) {
        const { partialValue, totalValue } = data;
        if (!validationUtils.isValidNumber(partialValue) || !validationUtils.isValidNumber(totalValue)) {
            return '';
        }
        return `${this.addLeadingZero(((100 * partialValue) / totalValue).toFixed(2))}%`;
    }

    removeLastCharacters(data) {
        const { value, charactersCount } = data;
        if (!value || !validationUtils.isValidNumber(charactersCount)) {
            return '';
        }
        return value.substring(0, value.length - charactersCount);
    }

    setLogStatusColored(status, color) {
        if (!status || !color) {
            return '';
        }
        const delimiter = colorUtils.createColorMessage({
            message: this.b,
            color: color
        });
        return `${delimiter}${status}${delimiter}`;
    }

    // This method converts a given number to display comma number.
    getNumberWithCommas(number) {
        if (number <= -1 || !validationUtils.isValidNumber(number)) {
            return '';
        }
        return number.toString().replace(regexUtils.numberCommasRegex, ',');
    }

    getSplitNumber(text) {
        if (!text) {
            return -1;
        }
        return Number(text.split('_')[0]);
    }

    getPositiveNumber(number) {
        if (!validationUtils.isValidNumber(number)) {
            return -1;
        }
        return Math.abs(number);
    }

    getFloorPositiveNumber(number) {
        return this.addLeadingZero(this.getFloorNumber(number));
    }

    getFloorNumber(number) {
        if (!validationUtils.isValidNumber(number)) {
            return -1;
        }
        return Math.floor(number);
    }

    getNumberOfNumber(data) {
        const { number1, number2 } = data;
        if (!validationUtils.isValidNumber(number1) || !validationUtils.isValidNumber(number2)) {
            return '';
        }
        return `${this.getNumberWithCommas(number1)}/${this.getNumberWithCommas(number2)}`;
    }

    cutText(data) {
        const { text, count } = data;
        if (!text) {
            return '';
        }
        if (text.length > count) {
            return text.substring(0, count);
        }
        return text;
    }

    addBreakLine(text) {
        return `${text}\r\n`;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    lowerCaseList(list) {
        if (!validationUtils.isExists(list)) {
            return list;
        }
        return list.map(i => this.toLowerCase(i));
    }
}

module.exports = new TextUtils();