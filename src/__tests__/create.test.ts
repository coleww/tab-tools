import { createTab, generateTuningStrings } from '../create';
import { whatsMyParsed, smellsLikeParsed } from './fixtures';

describe('generateTuningStrings', () => {
  it('formats strings for tuning', () => {
    expect(generateTuningStrings(['g', 'd', 'a', 'e'])).toStrictEqual([
      'g|',
      'd|',
      'a|',
      'e|',
    ]);
  });

  it('handles 2 character tuning strings', () => {
    expect(generateTuningStrings(['g#', 'd', 'a', 'e'])).toStrictEqual([
      'g#|',
      'd-|',
      'a-|',
      'e-|',
    ]);
  });
});

describe('createTab', () => {
  it('creates tab with 2-char notes', () => {
    expect(createTab(whatsMyParsed)).toStrictEqual([
      'e|-----------',
      'B|------11---',
      'G|---11----11',
      'D|-9---------',
      'A|-----------',
      'D|-----------',
    ]);
  });

  it('creates tab with 2-char tuning', () => {
    expect(createTab(smellsLikeParsed)).toStrictEqual([
      'e-|----------------',
      'Bb|----------------',
      'G#|----------------',
      'D-|-3---3-3---x-x-x',
      'A-|-3---3-3---x-x-x',
      'E-|-1---1-1---x-x-x',
    ]);
  });
});
