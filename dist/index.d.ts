export declare const codesArray: string[];
type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type OneTimeKey = `${Digit}${Digit}${Digit}`;
export declare class EncryptionMachine {
    private codesArray;
    private encodedArray;
    constructor(privateArrCodes: string[], publicArrayCodes?: string[]);
    private getShuffles;
    encodeMessage(oneTimeKey: OneTimeKey, message: string): string;
    decodeMessage(oneTimeKey: OneTimeKey, message: string): string;
}
export default EncryptionMachine;
