import { getNote } from './note';

export type TabData = {
  tuning: string[];
  data: string[][];
};

export type IntervalList = number[];
export type IntervalMap = Record<string, IntervalList>;

export const KEY_INTERVALS: IntervalMap = {
  maj: [2, 4, 5, 7, 9, 11],
  min: [2, 3, 5, 7, 8, 10],
  harmMin: [2, 3, 5, 7, 8, 11],
  melMin: [2, 3, 5, 7, 9, 11],
  wholeTone: [2, 4, 6, 8, 10],
  pentMaj: [2, 4, 7, 9],
  pentMin: [3, 5, 7, 10],
  oct1: [1, 3, 4, 6, 7, 9],
  oct2: [2, 3, 5, 6, 8, 9, 11],
};

export const CHORD_INTERVALS: IntervalMap = {
  M3: [4],
  m3: [3],
  maj: [4, 7],
  min: [3, 7],
  maj2: [2, 4, 7],
  min2: [2, 3, 7],
  maj7: [4, 7, 11],
  min7: [3, 7, 10],
  p5: [7],
  sus2: [2, 7],
  sus4: [5, 7],
};

export const ALL_NOTES = [
  'a',
  'a#',
  'b',
  'c',
  'c#',
  'd',
  'd#',
  'e',
  'f',
  'f#',
  'g',
  'g#',
];

// make this enforce note literal?
export type Note = (typeof ALL_NOTES)[number];
export type ChordType = keyof typeof CHORD_INTERVALS;

export const FLATS_TO_SHARPS: Record<string, Note> = {
  bb: 'a#',
  db: 'c#',
  eb: 'e#',
  gb: 'f#',
  ab: 'g#',
};

export type Chord = {
  root: Note;
  type: ChordType;
};
