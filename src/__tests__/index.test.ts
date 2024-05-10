import { getNote, getUniqueNotes, validateTabData } from '../';

describe('getNote', () => {
  it('gets open string', () => {
    expect(getNote('a', '0')).toBe('a');
  });
  it('gets note', () => {
    expect(getNote('a', '11')).toBe('g#');
  });
  it('handles octave', () => {
    expect(getNote('a', '12')).toBe('a');
  });

  it('handles frets above 12', () => {
    expect(getNote('a', '13')).toBe('a#');
  });

  it('wraps around notes array', () => {
    expect(getNote('g#', '1')).toBe('a');
  });

  it('translates flats to sharps', () => {
    expect(getNote('ab', '0')).toBe('g#');
  });

  it('handles casing', () => {
    expect(getNote('C#', '0')).toBe('c#');
  });

  it('ignores non-note tab chars', () => {
    expect(getNote('g#', 'h')).toBe('');
  });

  it('ignores bad root notes', () => {
    expect(getNote('z', '0')).toBe('');
  });
});

describe('validateTabData', () => {
  const mockTabData = {
    tuning: ['g', 'd', 'a', 'e'],
    data: [
      ['2', '', '1', ''],
      ['3', '', '2', ''],
      ['3', '', '2', ''],
      ['1', '', '0', ''],
    ],
  };

  it('returns true for valid data', () => {
    expect(validateTabData(mockTabData)).toBe(true);
  });

  it('returns true for single string input', () => {
    expect(
      validateTabData({
        tuning: ['e'],
        data: [['1', '3', '5']],
      })
    ).toBe(true);
  });

  it('detects tuning mismatch', () => {
    expect(
      validateTabData({
        ...mockTabData,
        tuning: ['b', 'f', 'd'],
      })
    ).toBe(false);
  });

  it('detects string length mismatch', () => {
    expect(
      validateTabData({
        ...mockTabData,
        data: [...mockTabData.data.slice(1), ['', '', '', '', '']],
      })
    ).toBe(false);
  });
});

describe('getUniqueNotes', () => {
  const mockTabData = {
    tuning: ['g', 'd', 'a', 'e'],
    data: [
      ['2', '', '1', ''],
      ['3', '', '2', ''],
      ['3', '', '2', ''],
      ['1', '', '0', ''],
    ],
  };

  it('returns unique notes for tab data', () => {
    expect(getUniqueNotes(mockTabData)).toStrictEqual(['a', 'b', 'c', 'e', 'f', 'g#']);
  });
});