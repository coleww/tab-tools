import { getNote } from '../note';

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

  it('ignores undefined root', () => {
    expect(getNote(undefined, '0')).toBe('');
  });

  it('ignores undefined fret', () => {
    expect(getNote('a', undefined)).toBe('');
  });
});
