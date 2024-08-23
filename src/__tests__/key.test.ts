import { mockTabData } from './fixtures';
import { getUniqueNotes, getPossibleKeys } from '../key';
import { KEY_MAP } from '../key';
describe('getUniqueNotes', () => {
  it('returns unique notes for tab data', () => {
    expect(getUniqueNotes(mockTabData)).toStrictEqual([
      'a',
      'b',
      'c',
      'e',
      'f',
      'g',
    ]);
  });
});

describe('keyMap', () => {
  it('maps keys to note values', () => {
    expect(KEY_MAP['a min']).toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
  });

  it('matches snapshot', () => {
    expect(KEY_MAP).toMatchSnapshot();
  });
});

describe('getPossibleKeys', () => {
  it('gets keys that contain all the notes in the tab data', () => {
    expect(getPossibleKeys(mockTabData)).toStrictEqual([
      'chromatic',
      'a min',
      'c maj',
    ]);
  });

  it('handles variadic input', () => {
    expect(
      getPossibleKeys(
        {
          ...mockTabData,
          tuning: ['a', 'c', 'c', 'b'],
        },
        {
          ...mockTabData,
          tuning: ['g', 'c', 'c', 'b'],
        }
      )
    ).toStrictEqual(['chromatic', 'c melMin']);
  });
});
