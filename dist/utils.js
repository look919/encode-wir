"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleArray = exports.indexNotFound = exports.mapForbiddenChars = void 0;
const mapForbiddenChars = (char) => {
    if (char === "new-line") {
        return "\n";
    }
    if (char === "apostrophe") {
        return "'";
    }
    if (char === "dollar") {
        return "$";
    }
    if (char === "quote") {
        return '"';
    }
    return char;
};
exports.mapForbiddenChars = mapForbiddenChars;
const indexNotFound = (index) => index === -1;
exports.indexNotFound = indexNotFound;
const shuffleArray = (arr, n) => {
    const length = arr.length;
    const normalizedN = n % length;
    if (normalizedN === 0) {
        return arr;
    }
    const movedItems = arr.slice(length - normalizedN);
    const remainingItems = arr.slice(0, length - normalizedN);
    return movedItems.concat(remainingItems);
};
exports.shuffleArray = shuffleArray;
