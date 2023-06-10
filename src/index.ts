import { indexNotFound, mapForbiddenChars, shuffleArray } from "./utils";

const splitter = " ";
// prettier-ignore
export const codesArray = [
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
]

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type OneTimeKey = `${Digit}${Digit}${Digit}`;

export class EncryptionMachine {
  private codesArray: string[] = [];
  private encodedArray: string[] = [];

  constructor(
    privateArrCodes: string[],
    publicArrayCodes: string[] = codesArray
  ) {
    this.codesArray = publicArrayCodes;
    this.encodedArray = privateArrCodes.map(mapForbiddenChars);
  }

  private getShuffles(oneTimeKey: OneTimeKey): [number, number] {
    let parsedKey = parseInt(oneTimeKey);
    if (isNaN(parsedKey) || oneTimeKey.length > 3) {
      throw new Error("oneTimeKey must be a number in 0-999 range");
    }

    parsedKey = parsedKey < 100 ? parsedKey + 100 : parsedKey;
    const initialShuffle = Math.abs(99 - (parsedKey % 100));
    const iterationShuffle = Math.floor(parsedKey / 100);

    return [initialShuffle, iterationShuffle];
  }

  public encodeMessage(oneTimeKey: OneTimeKey, message: string) {
    const [initialShuffle, iterationShuffle] = this.getShuffles(oneTimeKey);
    let shuffledArray = shuffleArray(this.encodedArray, initialShuffle);

    const encodedMessage = message.split("").map((char) => {
      const index = this.codesArray.indexOf(char);

      if (indexNotFound(index)) {
        return char;
      }

      const storedValueBeforeShuffling = shuffledArray[index];
      if (char === splitter) {
        shuffledArray = shuffleArray(shuffledArray, iterationShuffle);
      }

      return storedValueBeforeShuffling;
    });

    return encodedMessage.join("");
  }

  public decodeMessage(oneTimeKey: OneTimeKey, message: string) {
    const [initialShuffle, iterationShuffle] = this.getShuffles(oneTimeKey);
    let shuffledArray = shuffleArray(this.encodedArray, initialShuffle);

    const decodedMessage = message.split("").map((char) => {
      const index = shuffledArray.indexOf(char);

      if (indexNotFound(index)) {
        return char;
      }

      let decodedChar = this.codesArray[index];

      if (decodedChar === splitter) {
        shuffledArray = shuffleArray(shuffledArray, iterationShuffle);
      }

      return decodedChar;
    });

    return decodedMessage.join("");
  }
}

export default EncryptionMachine;
