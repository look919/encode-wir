"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionMachine = exports.codesArray = void 0;
const utils_1 = require("./utils");
const splitter = " ";
exports.codesArray = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z', 'ą', 'ć', 'ę', 'ł',
    'ó', 'ś', 'ż', 'ź', ' ', '.', ',', ';', ':', '\n',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    ')', '!', '@', '#', '$', '%', '^', '&', '*', '(',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z', 'Ą', 'Ć', 'Ę', 'Ł',
    'Ó', 'Ś', 'Ż', 'Ź', '?', "'", '"', '-', '<', '>',
];
class EncryptionMachine {
    constructor(privateArrCodes, publicArrayCodes = exports.codesArray) {
        this.codesArray = [];
        this.encodedArray = [];
        this.codesArray = publicArrayCodes;
        this.encodedArray = privateArrCodes.map(utils_1.mapForbiddenChars);
    }
    getShuffles(oneTimeKey) {
        let parsedKey = parseInt(oneTimeKey);
        if (isNaN(parsedKey) || oneTimeKey.length > 3) {
            throw new Error("oneTimeKey must be a number in 0-999 range");
        }
        parsedKey = parsedKey < 100 ? parsedKey + 100 : parsedKey;
        const initialShuffle = Math.abs(99 - (parsedKey % 100));
        const iterationShuffle = Math.floor(parsedKey / 100);
        return [initialShuffle, iterationShuffle];
    }
    encodeMessage(oneTimeKey, message) {
        const [initialShuffle, iterationShuffle] = this.getShuffles(oneTimeKey);
        let shuffledArray = (0, utils_1.shuffleArray)(this.encodedArray, initialShuffle);
        const encodedMessage = message.split("").map((char) => {
            const index = this.codesArray.indexOf(char);
            if ((0, utils_1.indexNotFound)(index)) {
                return char;
            }
            const storedValueBeforeShuffling = shuffledArray[index];
            if (char === splitter) {
                shuffledArray = (0, utils_1.shuffleArray)(shuffledArray, iterationShuffle);
            }
            return storedValueBeforeShuffling;
        });
        return encodedMessage.join("");
    }
    decodeMessage(oneTimeKey, message) {
        const [initialShuffle, iterationShuffle] = this.getShuffles(oneTimeKey);
        let shuffledArray = (0, utils_1.shuffleArray)(this.encodedArray, initialShuffle);
        const decodedMessage = message.split("").map((char) => {
            const index = shuffledArray.indexOf(char);
            if ((0, utils_1.indexNotFound)(index)) {
                return char;
            }
            let decodedChar = this.codesArray[index];
            if (decodedChar === splitter) {
                shuffledArray = (0, utils_1.shuffleArray)(shuffledArray, iterationShuffle);
            }
            return decodedChar;
        });
        return decodedMessage.join("");
    }
}
exports.EncryptionMachine = EncryptionMachine;
exports.default = EncryptionMachine;
