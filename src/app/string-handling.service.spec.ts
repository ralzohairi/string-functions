import { TestBed } from '@angular/core/testing';

import { StringHandlingService } from './string-handling.service';

// Declarations
let stringHandlingService: StringHandlingService;

describe('StringHandlingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});

    // To Access Service
    stringHandlingService = TestBed.get(StringHandlingService);
  });

  it('should be created', () => {
    const service: StringHandlingService = TestBed.get(StringHandlingService);
    expect(service).toBeTruthy();
  });

  // ----------- isWhiteSpaceOnly Unit Tests -----------

  it('should return false when passing a string that is not white space only & checking if its white space only', () => {
    expect(stringHandlingService.isWhiteSpaceOnly('hello everybody!')).toBe(false);
  });

  it('should return true when passing a string that is white space only & checking if its white space only', () => {
    expect(stringHandlingService.isWhiteSpaceOnly('       ')).toBe(true);
  });

  // ----------- getFirstWord() Unit Tests -----------

  it('should return first word of string when requesting first word and passing a non-empty string', () => {
    expect(stringHandlingService.getFirstWord('   Ahmed    Saleh Algamdi')).toBe('Ahmed');
  });

  it('should return empty string when requesting first word but passing an empty string', () => {
    expect(stringHandlingService.getFirstWord('   ')).toBe('');
  });

  // ----------- concatListAndSeparateByCommas() Unit Tests -----------

  it('should return passed string list in the format \'string1, string2, ..., stringn\'', () => {
    const listOfCars = ['Toyota', 'GMC', 'BMW'];
    expect(stringHandlingService.concatListAndSeparateByCommas(listOfCars)).toEqual('Toyota, GMC, BMW');
  });

  // ----------- escapeRegExp() Unit Tests -----------
  it('should escape the regular expression \'.*+?^${}()\\ \\\\ \' and return \'\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\\\ \\\\\\\\\'', () => {
    expect(stringHandlingService.escapeSpecialCharactersOfRegExpInAString('.*+?^${}()\\ \\\\ \'')).toEqual('\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\\\ \\\\\\\\ \'');
  });

  // ----------- includes() Unit Tests -----------

  it('should return true when checking if [\'cat\'] is included in the string list [\'cat\', \'dog\']', () => {

    const animals = ['cat', 'dog'];

    expect(stringHandlingService.includes(animals, 'cat')).toBe(true);
  });

  it('should return false when checking if [\'bird\'] is included in the string list [\'cat\', \'dog\']', () => {

    const animals = ['cat', 'dog'];

    expect(stringHandlingService.includes(animals, 'bird')).toBe(false);
  });

  // ----------- getFirstAndLastWord() Unit Tests -----------
  it('should return first and last of string when requesting first word and last word and passing a non-empty string', () => {
    expect(stringHandlingService.getFirstAndLastWord('   Ahmed    Saleh Aymen Raed Algamdi')).toBe('Ahmed Algamdi');
  });

  it('should return empty string when requesting first word and last word but passing an empty string', () => {
    expect(stringHandlingService.getFirstAndLastWord('   ')).toBe('');
  });

  // ----------- escapeNonEscapedSymbols() Unit Tests -----------

  it("should return \"The ocean's blue < & > \" when passing '&quot; The ocean&apos;s blue &lt; &amp; &gt; &quot;'", () => {
    expect(stringHandlingService.replaceEscapedXMLCharactersWithNonEscapedCharacters("&quot; The ocean&apos;s blue &lt; &amp; &gt; &quot;")).toBe("\" The ocean's blue < & > \"");
  });

  it("should return the same string if a string of whitespace only is passed to replaceEscapedXMLCharactersWithNonEscapedCharacters()", () => {
    expect(stringHandlingService.replaceEscapedXMLCharactersWithNonEscapedCharacters("      ")).toBe("      ");
  });

  // ----------- removeFileNameExtension() Unit Tests -----------

  it("should return '\"file.name-file.name\"' when passing '\"file.name-file.name.png\"' to the removeFileNameExtension from filename", () => {
    expect(stringHandlingService.removeFileNameExtension("file.name-file.name.png")).toBe("file.name-file.name");
  });

  it("should return the passed string when passing a filename without extension to the removeFileNameExtension from filename", () => {
    expect(stringHandlingService.removeFileNameExtension("filename-filename")).toBe("filename-filename");
  });

  it("should return an empty string when passing a white space string the removeFileNameExtension from filename", () => {
    expect(stringHandlingService.removeFileNameExtension("    ")).toBe("");
  });

  // ----------- isPrefix() Unit Tests -----------

  it("should return true when passing the text '\"image/png\"' with a possible prefix as '\"image/\"' to the isPrefix function", () => {
    expect(stringHandlingService.isPrefix("image/png", "image/")).toBe(true);
  });

  it("should return false when passing the text '\"document/image/png\"' with a possible prefix as '\"image/\"' to the isPrefix function", () => {
    expect(stringHandlingService.isPrefix("document/image/png", "image/")).toBe(false);
  });

  it("should return true when passing the text '\"https\\x\\x\"' with a possible prefix as '\"https/\"' to the isPrefix function", () => {
    expect(stringHandlingService.isPrefix("https\\x\\x", "https")).toBe(true);
  });

  it("should return false when passing the text '\"http\\x\\x\"' with a possible prefix as '\"https/\"' to the isPrefix function", () => {
    expect(stringHandlingService.isPrefix("  http\\x\\x", "https")).toBe(false);
  });

  // ----------- extractPathFromURL() Unit Tests -----------

  it("should return '/pathname/p1/p2/p3' when passing 'https://hostname.com/pathname/p1/p2/p3?q1=1&q2=2' to the extractPathFromURL function", () => {
    expect(stringHandlingService.extractPathFromURL("https://hostname.com/pathname/p1/p2/p3?q1=1&q2=2")).toBe("/pathname/p1/p2/p3");
  });

  it("should return '/pathname/p1/p2/p3' when passing 'https://hostname.com:portname/pathname/p1/p2/p3?q1=1&q2=2' to the extractPathFromURL function", () => {
    expect(stringHandlingService.extractPathFromURL("https://hostname.com:portname/pathname/p1/p2/p3?q1=1&q2=2")).toBe("/pathname/p1/p2/p3");
  });

  it("should return '/pathname/p1/p2/p3' when passing 'hostname.com:portname/pathname/p1/p2/p3?q1=1&q2=2' to the extractPathFromURL function", () => {
    expect(stringHandlingService.extractPathFromURL("hostname.com:portname/pathname/p1/p2/p3?q1=1&q2=2")).toBe("/pathname/p1/p2/p3");
  });

  it("should return '/pathname/p1/p2/p3' when passing 'https://hostname.com:portname/pathname/p1/p2/p3?' to the extractPathFromURL function", () => {
    expect(stringHandlingService.extractPathFromURL("https://hostname.com:portname/pathname/p1/p2/p3?")).toBe("/pathname/p1/p2/p3");
  });

  it("should return '/pathname/p1/p2/p3' when passing 'https://hostname.com:portname/pathname/p1/p2/p3' to the extractPathFromURL function", () => {
    expect(stringHandlingService.extractPathFromURL("https://hostname.com:portname/pathname/p1/p2/p3")).toBe("/pathname/p1/p2/p3");
  });
  // no path name case
  it("should return '' when passing 'https://hostname.com:portname/' to the extractPathFromURL function", () => {
    expect(stringHandlingService.extractPathFromURL("https://hostname.com:portname/")).toBe("");
  });
  it("should return '' when passing 'https://hostname.com:portname' to the extractPathFromURL function", () => {
    expect(stringHandlingService.extractPathFromURL("https://hostname.com:portname")).toBe("");
  });
  it("should return '' when passing 'hostname.com:portname/' to the extractPathFromURL function", () => {
    expect(stringHandlingService.extractPathFromURL("hostname.com:portname/")).toBe("");
  });
  it("should return '' when passing 'hostname.com:portname' to the extractPathFromURL function", () => {
    expect(stringHandlingService.extractPathFromURL("hostname.com:portname")).toBe("");
  });

  it("should return an empty string when passing a string of whitespace to the extractPathFromURL function", () => {
    expect(stringHandlingService.extractPathFromURL("    ")).toBe("");
  });

  // ----------- getHttpsVersionOfURL() Unit Tests -----------
  it("should return 'http://github.com/' when passing 'https://github.com/' to the getHttpsVersionOfURL function", () => {
    expect(stringHandlingService.getHttpsVersionOfURL("http://github.com/")).toBe("https://github.com/");
  });

  it("should return 'https://github.com/' when passing 'https://github.com/' to the getHttpsVersionOfURL function", () => {
    expect(stringHandlingService.getHttpsVersionOfURL("https://github.com/")).toBe("https://github.com/");
  });

  it("should return 'github.com/' when passing 'github.com/' to the getHttpsVersionOfURL function (no protocol case)", () => {
    expect(stringHandlingService.getHttpsVersionOfURL("github.com/")).toBe("github.com/");
  });

  it("should return an empty string when passing only whitespace to the getHttpsVersionOfURL function", () => {
    expect(stringHandlingService.getHttpsVersionOfURL("     ")).toBe("");
  });

});
