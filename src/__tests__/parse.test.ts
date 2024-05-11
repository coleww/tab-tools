import {
  allStringsAreDoubleBlank,
  anyStringStartsWithNonBlank,
  anyStringIsDoubleDigit,
  getNote,
  getTuning,
  removeBlankSpaces,
  parseTab,
} from '../parse';

import {
  smellsLikeData,
  smellsLikeParsed,
  standardTuning,
  whatsMyData,
  whatsMyParsed,
} from './fixtures';

describe('tab-parser', () => {
  describe('parseTab', () => {
    it('parses double digit frets', () => {
      expect(parseTab(whatsMyData)).toStrictEqual(whatsMyParsed);
    });

    it('parses diacriticals and inserts blanks', () => {
      expect(parseTab(smellsLikeData)).toStrictEqual(smellsLikeParsed);
    });

    it('ignores blank/empty lines', () => {
      const tabWithBlankAndEmpty = ['', ...smellsLikeData, ' '];
      expect(parseTab(tabWithBlankAndEmpty)).toStrictEqual(smellsLikeParsed);
    });

    it('assumes standard if no tuning found', () => {
      const tabWithoutTuning = whatsMyData.map(s => s.slice(3));
      const { tuning, data } = parseTab(tabWithoutTuning);
      expect(data).toStrictEqual(whatsMyParsed.data);
      expect(tuning).toStrictEqual(standardTuning);
    });

    // TODO: hmmmm...
    // check if line has white space anywhere after trimming?
    // is line filled with `-`?
    xit('ignores random extra text', () => {
      const tabWithBlankAndEmpty = [
        'With the lights out...',
        ...smellsLikeData,
        'x4',
      ];
      expect(parseTab(tabWithBlankAndEmpty)).toStrictEqual(smellsLikeParsed);
    });
  });

  describe('anyStringStartsWithNonBlank', () => {
    it('ignores dashes', () => {
      expect(anyStringStartsWithNonBlank(['-3', '--', '-5', '--'])).toBe(false);
    });

    it('ignores staves', () => {
      expect(anyStringStartsWithNonBlank(['|-', '|1', '|-', '|-'])).toBe(false);
    });

    it('handles frets', () => {
      expect(anyStringStartsWithNonBlank(['|-', '|-', '3-', '|-'])).toBe(true);
    });

    it('handles diacriticals', () => {
      expect(anyStringStartsWithNonBlank(['--', '--', '/-', '--'])).toBe(true);
    });
  });

  describe('getTuning', () => {
    it('gets the tuning', () => {
      expect(getTuning(['G|', 'D|', 'A|', 'D|'])).toStrictEqual([
        'G',
        'D',
        'A',
        'D',
      ]);
    });

    it('handles sharps/flats', () => {
      expect(getTuning(['G-', 'C#', 'Ab', 'C#'])).toStrictEqual([
        'G',
        'C#',
        'Ab',
        'C#',
      ]);
    });

    it('ignores staves', () => {
      expect(getTuning(['|G', '|D', '|A', '|D'])).toBe(undefined);
    });

    it('ignores non-note letters', () => {
      expect(getTuning(['h1', 'h2', 'h3', 'h3'])).toBe(undefined);
    });

    it('ignores single note', () => {
      expect(getTuning(['--', '--', 'b9', '--'])).toBe(undefined);
    });
  });

  describe('getNote', () => {
    it('gets whole note', () => {
      expect(getNote('E|')).toBe('E');
    });

    it('gets sharp note', () => {
      expect(getNote('C#')).toBe('C#');
    });

    it('gets flat note', () => {
      expect(getNote('Db')).toBe('Db');
    });

    it('handles lowercase', () => {
      expect(getNote('e|')).toBe('e');
    });

    it('returns undefined for non-note letter', () => {
      expect(getNote('h-')).toBe(undefined);
    });

    it('returns undefined for non-note staves', () => {
      expect(getNote('|-')).toBe(undefined);
    });
  });

  describe('anyStringIsDoubleDigit', () => {
    it('detects a double digit', () => {
      expect(anyStringIsDoubleDigit(['--', '--', '12', '--'])).toBe(true);
    });

    it('ignores non-doubles', () => {
      expect(anyStringIsDoubleDigit(['3b', '-1', 'p9', '4-'])).toBe(false);
    });
  });

  describe('allStringsAreDoubleBlank', () => {
    it('detects all blanks', () => {
      expect(allStringsAreDoubleBlank(['--', '--', '--', '--'])).toBe(true);
    });

    it('detects frets', () => {
      expect(allStringsAreDoubleBlank(['--', '1-', '--', '--'])).toBe(false);
    });

    it('detects diacriticals', () => {
      expect(allStringsAreDoubleBlank(['--', '-/', '--', '--'])).toBe(false);
    });
  });

  describe('removeBlankSpaces', () => {
    it('remove trailing blank', () => {
      expect(removeBlankSpaces('3-')).toBe('3');
    });
    it('remove preceding blank', () => {
      expect(removeBlankSpaces('-6')).toBe('6');
    });
    it('deletes double blank', () => {
      expect(removeBlankSpaces('--')).toBe('');
    });
  });
});
