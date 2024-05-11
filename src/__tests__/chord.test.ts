import { getInterval, getChords, getTabChords } from '../chord';
import { mockTabData } from './fixtures';

describe('getInterval', () => {
  it('gets interval between notes', () => {
    expect(getInterval('g', 'a')).toBe(2);
  });

  it('gets unison', () => {
    expect(getInterval('g', 'g')).toBe(0);
  });
});

describe('getChords', () => {
  it('matches min chord out of order', () => {
    expect(getChords(['c', 'a', 'e'])).toStrictEqual([
      { root: 'a', type: 'min' },
    ]);
  });

  it('detects multiple possibly chords', () => {
    expect(getChords(['c#', 'f#', 'g#'])).toStrictEqual([
      { root: 'c#', type: 'sus4' },
      { root: 'f#', type: 'sus2' },
    ]);
  });
});

describe('getTabChords', () => {
  it('detects chords for each beat', () => {
    expect(getTabChords(mockTabData)).toStrictEqual([
      [
        {
          root: 'f',
          type: 'maj',
        },
      ],
      [],
      [
        {
          root: 'e',
          type: 'min',
        },
      ],
      [],
    ]);
  });
});
