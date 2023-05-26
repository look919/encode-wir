import dotenv from "dotenv";
import {
  getSplitterByMessageLength,
  indexNotFound,
  mapForbiddenChars,
  shuffleArray,
} from "./utils";

dotenv.config();

// prettier-ignore
export const codesArray = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', 
    '9', '.', ',', ';', ':', '-', "'", '\n',')',
    '!', '@', '#', '$', '%', '^', '&', '*', '(', 
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '?'
]

if (!process.env.ENCODED_ARRAY) {
  throw new Error("ENCODED_ARRAY is not defined");
}

let secretKey = parseInt(process.env.SECRET_KEY!);
secretKey = secretKey < 100 ? secretKey + 100 : secretKey;

if (secretKey >= 1000 || secretKey < 0) {
  throw new Error("SECRET_KEY must be in 0-999 range");
}

const initialShuffle = Math.abs(80 - (secretKey % 100));
const iterationShuffle = Math.floor(secretKey / 100);

const encodedArray =
  process.env.ENCODED_ARRAY.split("=").map(mapForbiddenChars);

const codeMessage = (message: string) => {
  let shuffledArray = shuffleArray(encodedArray, initialShuffle);
  const splitter = getSplitterByMessageLength(message.length);

  const encodedMessage = message.split("").map((char) => {
    const index = codesArray.indexOf(char);

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
};

const decodeMessage = (message: string) => {
  const splitter = getSplitterByMessageLength(message.length);
  let shuffledArray = shuffleArray(encodedArray, initialShuffle);
  let shuffleCounter = 0;
  let amountOfShuffles = 0;

  const decodedMessage = message.split("").map((char) => {
    const index = shuffledArray.indexOf(char);

    if (indexNotFound(index)) {
      return char;
    }

    let decodedChar = codesArray[Math.abs(index)];

    if (decodedChar === splitter) {
      shuffledArray = shuffleArray(shuffledArray, iterationShuffle);

      if (shuffleCounter + iterationShuffle > 80) {
        shuffleCounter = shuffleCounter + iterationShuffle - 80;
      } else {
        shuffleCounter = shuffleCounter + iterationShuffle;
      }
      amountOfShuffles++;
      decodedChar =
        codesArray[
          Math.abs(index - shuffleCounter + iterationShuffle * amountOfShuffles)
        ];
    }

    return decodedChar;
  });

  return decodedMessage.join("");
};

// const test = "Ala ma kota";
// const test =
//   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt, neque eu posuere pretium, urna augue interdum enim, sed vehicula eros nisi eget lacus. Donec vitae tellus placerat, accumsan nisi ut, malesuada ex. Suspendisse aliquet, tellus eget elementum mollis, orci urna semper ex, eu viverra est libero quis elit. Donec ut tellus quis libero posuere bibendum. Pellentesque semper maximus sagittis. Donec elementum, arcu et pulvinar hendrerit, ex lectus pulvinar turpis, non posuere orci purus et mauris. Proin maximus ex vel rhoncus viverra. Nullam nec ligula porta, venenatis leo id, dapibus nisi";

// const codedTest = codeMessage(test);
