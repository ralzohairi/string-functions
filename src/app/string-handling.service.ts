import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringHandlingService {

  constructor() { }

  /** Determines if string contains white space only
   * @param {String} text - string to test
   * @returns {Boolean} true if passed string contains white space only, returns false otherwise
   */
  isWhiteSpaceOnly(text: string): boolean {

    const noWhiteSpaceInput = text.replace(/\s/g, ""); // replace all white space with empty string
    // Note: g is for global match (to not stop at first match)

    if (noWhiteSpaceInput === "") {
      return true;
    } else {
      return false;
    }
  }

  /** Returns the first word of a string
   * @param {String} text - string to test
   * @returns {String} the first word of the string, if string is not white space
   *  only. Otherwise, returns an empty string.
   */
  getFirstWord(text: string): string {

    if (!this.isWhiteSpaceOnly(text)) {
      // create a list of all words in text where the white space is ignored
      const stringBrokenIntoArray = text.match(/\S+/g); /* '\S: matching anything except a whitespace
      (newline, tab, space) - "\S" is the negation of \s*/

      // extract first word in text
      return stringBrokenIntoArray[0];
    } else {
      return "";
    }
  }

  /** Returns a concatenated string, of the passed list of strings, separated by a comma then space
   * @param {Array} listOfStrings - a list of strings to concat
   * @returns {String} a string of all strings in the list concatinated and seperated by a comma then space
   * in the format "string 1, string 2, ..., string n". If list is empty, an empty string is returned.
   */
  concatListAndSeparateByCommas(listOfStrings: string[]): string {
    const commaThenSpace = ", ";
    let concatinatedString = "";

    // process all string in list and concatinate them
    for (let i = 0; i < listOfStrings.length; i++) {
      // if its the beginning, do not add the comma
      if (i === 0) {
        concatinatedString = concatinatedString.concat(listOfStrings[i]);
      } else { // if its not the first string, prefix it with ", "
        concatinatedString = concatinatedString.concat(commaThenSpace.concat(listOfStrings[i]));
      }
    }

    return concatinatedString;
  }

  /** Escapes all of the special characters, used in regular expression logic,
   * that exist in the passed string so when the string is used in a regular
   * expression, those characters will be treated as a part of the string rather
   * than a special character for the regEx logic
   * @param {String} regExpString - the regular expression as string
   * @returns {String} the passed string where all of the special characters
   *  of regular expressions are escaped, if any.
   */
  escapeSpecialCharactersOfRegExpInAString(regExpString: string): string {
    /*
    []: matches any one of the characters in the brackets
    |: OR
    */
    return regExpString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  }

  /** Replaces the escaped XML characters in a string, if any,
   * with the corresponding non-escaped characters
   * @param {String} text - the text to proccess
   * @returns {String} the string where all escaped XML characters are replaced
   * by the corresponding non-escaped character.
   */
  replaceEscapedXMLCharactersWithNonEscapedCharacters(text: string) {
    text = text
      .replace(/&quot;/g, "\"") // g for global match (to not stop at first match)
      .replace(/&apos;/g, "\'") // g for global match (to not stop at first match)
      .replace(/&lt;/g, "<") // g for global match (to not stop at first match)
      .replace(/&amp;/g, "&") // g for global match (to not stop at first match)
      .replace(/&gt;/g, ">"); // g for global match (to not stop at first match)

    return text;
  }

  /** Determines whether a list of string contain a particular string
   * @param {Array} list - the list to search in
   * @param {String} value - the value to search for in list
   * @returns {Boolean} true if the passed list contains the string value and false otherwise
   */
  includes(list: string[], value: string): boolean {
    // Note: cannot use built in function "includes" as its not supported by IE

    // traverse all list items
    for (let i = 0; i < list.length; i++) {
      // if any element matches the passed value, return true
      if (list[i] === value) {
        return true;
      }
    }
    // if no element matches the passed value, return false
    return false;
  }

  /** Returns the first and last word in a string
   * @param {String} text - string to test
   * @returns {String} the first and last word of the string, if string is not white space only.
   *  Otherwise, returns an empty string. However, If the string has only one word,
   * the output will be the first word only.
   */
  getFirstAndLastWord(text: string): string {
    if (!this.isWhiteSpaceOnly(text)) {
      // create a list of all words in text,
      const stringBrokenIntoArray = text.match(/\S+/g); /* '\S: matching anything except a whitespace 
      (newline, tab, space) - is the negation of \s*/

      let stringToReturn = stringBrokenIntoArray[0];

      // if string contains more than word, add the last one
      if (stringBrokenIntoArray.length > 1) {
        stringToReturn = stringToReturn + " " + stringBrokenIntoArray[stringBrokenIntoArray.length - 1];
      }

      // extract first and last word only
      return stringToReturn;
    } else {
      return "";
    }
  }

  /** Returns the passed file name without the file's extension
   * @param {String} filename - the text to proccess
   * @returns {String} the passed string, that represents the file name,
   * without the extension, if the string is not whitespace only.
   * Otherwise, returns an empty string. If the file name has no extension,
   * the output is the file name as is.
   */
  removeFileNameExtension(filename: string): string {
    if (!this.isWhiteSpaceOnly(filename)) {

      const fileNameAsAnArray = filename.split("."); // i.e. [filename, extension]

      // If filename has no extention, return it as is
      if (fileNameAsAnArray.length === 1) {
        return fileNameAsAnArray[0];
      }

      const fileNameWithoutExtension = fileNameAsAnArray.slice(0, -1).join("."); // -1 being the last element,
      // therefore, remove the last element but join everything else (in the case of filename.x.js)
      return fileNameWithoutExtension;
    } else {
      return "";
    }
  }

  /** Determines if the passed string contains the second passed string as a prefix
   * @param {String} text - the string to check if prefix is in it
   * @param {String} possiblePrefix - the possible prefix of text
   * @returns {Boolean} true if the passed string contains the second passed
   * string as a prefix and false otherwise.
   */
  isPrefix(text: string, possiblePrefix: string): boolean {
    if (text.length < possiblePrefix.length) {
      return false;
    }

    return text.includes(possiblePrefix) && text.substring(0, possiblePrefix.length) === possiblePrefix;
  }

  /** Extracts the path from the passed URL & returns it
   * @param {String} url - the URL to extract the path from
   * @returns {String} the path of the passed URL, whether or not it contains a protocol,
   *  a port and/or query parameters. An empty string is returned if the URL contains no path
   *  or if it contains whitespace only.
   */
  extractPathFromURL(url: string): string {

    if (!this.isWhiteSpaceOnly(url)) {

      let path: string;

      // 1. Remove protocol [http, ftp, etc.] (if any) & remove hostname
      // 1.1. Split url to array by /
      const urlBrokenDownIntoListByBackslash = url.split("/");
      const numberOfEntriesBeforePathInList =
        (url.indexOf("//") > -1) ? // if protocol exist
          3 // as the list is ["https", "", "hostname", "path", ...]
          : // if it doesn't exist
          1; // as the list is ["hostname", "path", ...]

      // 1.2. Remove everything in the array before the path name
      urlBrokenDownIntoListByBackslash.splice(0, numberOfEntriesBeforePathInList);

      // 2. Recreate url with path only and possible query parameters
      // 2.1. Join the list
      path = urlBrokenDownIntoListByBackslash.join("/"); // if list is empty, it will return empty string
      // and if list contains one element, it will return a string of that element

      // 2.2. Remove query params (so ? and beyond) if any
      path = path.split("?")[0]; // If separator is not found or is omitted,
      // the array contains one element consisting of the entire string so [0]
      // will always work

      if (path === "") {
        return path;
      } else {
        return "/" + path;
      }
    } else {
      return "";
    }
  }

  /** Returns the HTTPS version of the URL
   * @param {String} url - the URL to process
   * @returns {String} the HTTPS version of a URL if the string is not whitespace only.
   *  Otherwise, an empty string is returned. If the URL doesn't contain a protocol
   * or contains a different protocol than HTTP/HTTPS, the URL is returned as is.
   */
  getHttpsVersionOfURL(url: string): string {
    if (!this.isWhiteSpaceOnly(url)) {
      // CASE 1: If the url doesn't have a protocol or have a different protocol than HTTP/HTTPS
      if (!url.includes("http")) { // TODO: replace includes with a custom function as it's not supported in IE
        return url;
      }
      // CASE 2: If the protocol contains an HTTP/HTTPS protocol
      return this.isPrefix(url, "https") ? url : url.replace("http", "https"); // replace replace first occurance only
    } else {
      return "";
    }
  }

}
