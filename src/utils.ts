export const mapForbiddenChars = (char: string) => {
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

export const indexNotFound = (index: number) => index === -1;

export const shuffleArray = (arr: string[], n: number) => {
  const length = arr.length;
  const normalizedN = n % length;

  if (normalizedN === 0) {
    return arr; // No need to move if n is 0 or a multiple of array length
  }

  const movedItems = arr.slice(length - normalizedN);
  const remainingItems = arr.slice(0, length - normalizedN);

  return movedItems.concat(remainingItems);
};
