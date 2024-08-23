import { getNote } from './note';
import { ALL_NOTES, CHORD_INTERVALS, Chord, TabData } from './constants';

export function getInterval(rootNote: string, intervalNote: string) {
  const rootIndex = ALL_NOTES.indexOf(rootNote);
  const allNotesStartingWithRoot = [
    ...ALL_NOTES.slice(rootIndex),
    ...ALL_NOTES.slice(0, rootIndex),
  ];
  const interval = allNotesStartingWithRoot.indexOf(intervalNote);
  if (rootIndex === -1 || interval === -1) {
    return 0;
  }

  return interval;
}

export function getChords(notes: string[]): Chord[] {
  if (notes.length < 1) {
    return [];
  }
  if (notes.length === 1) {
    return [{ root: notes[0], type: '' }];
  }
  return notes
    .sort()
    .filter((x, i, a) => a.indexOf(x) === i)
    .map((_, i, arr) => {
      const noteOrder = [...arr.slice(i), ...arr.slice(0, i)];
      const root = noteOrder[0];
      if (!root) return '';
      const intervalsString = noteOrder
        .slice(1)
        .map(note => getInterval(root, note))
        .toString();
      const chordMatch = Object.keys(CHORD_INTERVALS).find(
        chordType => intervalsString === CHORD_INTERVALS[chordType]?.toString()
      );
      return chordMatch && { root, type: chordMatch };
    })
    .filter((x): x is Chord => !!x);
}

export function getTabChords(tabData: TabData) {
  const { tuning, data } = tabData;
  return data[0]
    ?.map((_, fretIdx) =>
      data
        .map((string, stringIdx) => getNote(tuning[stringIdx], string[fretIdx]))
        .filter(x => x)
    )
    .map(getChords);
}
