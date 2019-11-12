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

  // ----------- getFirstWord() Unit Tests -----------

  it('should return first word of string when requesting first word and passing a non-empty string', () => {
    expect(stringHandlingService.getFirstWord('   Ahmed    Saleh Algamdi')).toBe('Ahmed');
  });

  it('should return empty string when requesting first word but passing an empty string', () => {
    expect(stringHandlingService.getFirstWord('   ')).toBe('');
  });

  // ----------- getFirstAndLastWord() Unit Tests -----------
  it('should return first and last of string when requesting first word and last word and passing a non-empty string', () => {
    expect(stringHandlingService.getFirstAndLastWord('   Ahmed    Saleh Aymen Raed Algamdi')).toBe('Ahmed Algamdi');
  });

  it('should return empty string when requesting first word and last word but passing an empty string', () => {
    expect(stringHandlingService.getFirstAndLastWord('   ')).toBe('');
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

  // ----------- includes() Unit Tests -----------

  it('should return true when checking if [\'cat\'] is included in the string list [\'cat\', \'dog\']', () => {

    const animals = ['cat', 'dog'];

    expect(stringHandlingService.includes(animals, 'cat')).toBe(true);
  });

  it('should return false when checking if [\'bird\'] is included in the string list [\'cat\', \'dog\']', () => {

    const animals = ['cat', 'dog'];

    expect(stringHandlingService.includes(animals, 'bird')).toBe(false);
  });


  // ----------- hasAnArabicCharacter() Unit Tests -----------
  it("should return true when passing text that has at least one Arabic character to the hasAnArabicCharacter function", () => {
    // Arabic letters
    expect(stringHandlingService.hasAnArabicCharacter("أ")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("آ")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ا")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("إ")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ب")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ت")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ث")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ج")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ح")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("خ")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("د")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ذ")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ر")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ذ")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("س")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ش")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ص")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ض")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ط")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ظ")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ع")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("غ")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ف")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ق")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ك")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ل")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("م")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ن")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ه")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("و")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ي")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ى")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ئ")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ء")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ة")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ؤ")).toBe(true);
    // Arabic symbols
    expect(stringHandlingService.hasAnArabicCharacter("ّ")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("َ")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ً")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ِ")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ٍ")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ُ")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ٌ")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("ْ")).toBe(true);
    // Arabic numbers
    expect(stringHandlingService.hasAnArabicCharacter("١")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("٢")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("٣")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("٤")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("٥")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("٦")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("٧")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("٨")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("٩")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("١٠")).toBe(true);
    // Arabic punctuation
    expect(stringHandlingService.hasAnArabicCharacter("؟")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("،")).toBe(true);
    // A string with at least one Arabic character
    expect(stringHandlingService.hasAnArabicCharacter("aأ")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("Zأ")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("0أ")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("9أ")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("9،")).toBe(true);
    expect(stringHandlingService.hasAnArabicCharacter("aZأ")).toBe(true);
  });

  it("should return false when passing text that has no Arabic character to the hasAnArabicCharacter function", () => {
    // Strings with not a single arabic character
    expect(stringHandlingService.hasAnArabicCharacter("a")).toBe(false);
    expect(stringHandlingService.hasAnArabicCharacter("Z")).toBe(false);
    expect(stringHandlingService.hasAnArabicCharacter("0")).toBe(false);
    expect(stringHandlingService.hasAnArabicCharacter("9")).toBe(false);
    expect(stringHandlingService.hasAnArabicCharacter("?")).toBe(false);
    expect(stringHandlingService.hasAnArabicCharacter("!")).toBe(false);
    expect(stringHandlingService.hasAnArabicCharacter(".")).toBe(false);
    expect(stringHandlingService.hasAnArabicCharacter(",")).toBe(false);
  });

  // ----------- getHttpsVersionOfURL() Unit Tests -----------
  it("should return 'https://github.com/' when passing 'http://github.com/' to the getHttpsVersionOfURL function", () => {
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

  // ----------- concatListAndSeparateBySymbol() Unit Tests -----------

  it('should return passed string list in the format \'string1, string2, ..., stringn\'', () => {
    const listOfCars = ['Toyota', 'GMC', 'BMW'];
    expect(stringHandlingService.concatListAndSeparateBySymbol(listOfCars, ", ")).toEqual('Toyota, GMC, BMW');
  });

  // ----------- replaceEscapedXMLCharactersWithNonEscapedCharacters() Unit Tests -----------

  it("should return \"The ocean's blue < & > \" when passing '&quot; The ocean&apos;s blue &lt; &amp; &gt; &quot;'", () => {
    expect(stringHandlingService.replaceEscapedXMLCharactersWithNonEscapedCharacters("&quot; The ocean&apos;s blue &lt; &amp; &gt; &quot;")).toBe("\" The ocean's blue < & > \"");
  });

  it("should return the same string if a string of whitespace only is passed to replaceEscapedXMLCharactersWithNonEscapedCharacters()", () => {
    expect(stringHandlingService.replaceEscapedXMLCharactersWithNonEscapedCharacters("      ")).toBe("      ");
  });

  // ----------- escapeSpecialCharactersOfRegExpInAString() Unit Tests -----------
  it('should escape the regular expression \'.*+?^${}()\\ \\\\ \' and return \'\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\\\ \\\\\\\\\'', () => {
    expect(stringHandlingService.escapeSpecialCharactersOfRegExpInAString('.*+?^${}()\\ \\\\ \'')).toEqual('\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\\\ \\\\\\\\ \'');
  });

  // ----------- replaceSpecialCharactersWithUnderscore() Unit Tests -----------
  it("should replace all special characters '\\s\\n\"'<>&' to undersocre when passing '     \n\n\"'<>&' to replaceSpecialCharactersWithUnderscore", () => {
    expect(stringHandlingService.replaceSpecialCharactersWithUnderscore("     \n\n\"'<>&")).toBe("____________");
  });

  it("should replace all extra forbidden characters to underscore when passing ' \n'\"<>&!@#$%^*|(),?:{}[]' to replaceSpecialCharactersWithUnderscore", () => {
    expect(stringHandlingService.replaceSpecialCharactersWithUnderscore(" \n'\"<>&!@#$%^*|(),?:{}[]")).toBe("________________________");
  });

  it("should replace non valid URL chars & forbidden characters with underscore when passing 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;={}|^' to replaceSpecialCharactersWithUnderscore", () => {
    expect(stringHandlingService.replaceSpecialCharactersWithUnderscore
      ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;={}|^"))
      .toBe("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~_/____________+_;=____");
  });

  it("should return string as is when it has no invalid URL chars and no forbidden characters to replaceSpecialCharactersWithUnderscore", () => {
    expect(stringHandlingService.replaceSpecialCharactersWithUnderscore("ab")).toBe("ab");
    expect(stringHandlingService.replaceSpecialCharactersWithUnderscore("")).toBe("");
  });

  // ----------- replaceNonValidURLCharsWithSymbol() Unit Tests -----------
  it("should replace non valid URL chars with underscore when passing 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;={}|^' to replaceNonValidURLCharsWithSymbol", () => {
    expect(stringHandlingService.replaceNonValidURLCharsWithSymbol("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;={}|^", "_"))
      .toBe("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;=____");
  });
});
