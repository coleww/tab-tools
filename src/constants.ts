export type TabData = {
  tuning: string[];
  data: string[][];
}

export type IntervalList = number[];
export type IntervalMap = Record<string, IntervalList>;

export const KEY_INTERVALS: IntervalMap = {
	maj: [2, 2, 1, 2, 2, 2],
	min: [2, 1, 2, 2, 1, 2],
	harmMin: [2, 1, 2, 2, 1, 3],
	melMin: [2, 1, 2, 2, 2, 2],
  wholeTone: [2, 2, 2, 2, 2],
  pentMaj: [2, 2, 3, 2],
  pentMin: [3, 2, 2, 3],
  oct1: [1, 2, 1, 2, 1, 2],
  oct2: [2, 1, 2, 1, 2, 1, 2]
};

export const CHORD_INTERVALS: IntervalMap = {	maj: [4, 7],
	min2: [3],
	maj2: [4],
	min: [3, 7],
	maj7: [4, 7, 11],
	min7: [3, 7, 10],
	p5: [7],
	sus2: [3, 7],
	sus4: [5, 7],
};

export const ALL_NOTES = [
	'a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#',
];

// make this enforce note literal?
export type Note = typeof ALL_NOTES[number];

export const FLATS_TO_SHARPS: Record<string, Note> = {
  bb: 'a#',
  db: 'c#',
  eb: 'e#',
  gb: 'f#',
  ab: 'g#',
}