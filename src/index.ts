import {
  ALL_NOTES,
  CHORD_INTERVALS,
  FLATS_TO_SHARPS,
  KEY_INTERVALS,
  type Chord,
  type TabData,
} from './constants';

export function getNote(rootNote: string, fret: string) {
  if (!/\d+/.exec(fret)) {
    return '';
  }

  const targetFret = ~~fret % 12;

  const rootNoteLowerCased = rootNote.toLowerCase();
  const rootNoteWithoutFlats =
    FLATS_TO_SHARPS[rootNoteLowerCased] || rootNoteLowerCased;

  const rootIndex = ALL_NOTES.indexOf(rootNoteWithoutFlats);

  if (rootIndex === -1) {
    return '';
  }

  if (rootIndex + targetFret >= ALL_NOTES.length) {
    const remainder = ALL_NOTES.length - rootIndex;
    return ALL_NOTES[targetFret - remainder];
  }

  return ALL_NOTES[rootIndex + targetFret];
}

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

export function getChords(notes: string[]) {
  if (notes.length <= 1) {
    return [];
  }
  return notes
    .sort()
    .filter((x, i, a) => a.indexOf(x) === i)
    .map((note, i, arr) => {
      const noteOrder = [...arr.slice(i), ...arr.slice(0, i)];
      const root = noteOrder[0];
      const intervalsString = noteOrder
        .slice(1)
        .map(note => getInterval(root, note))
        .toString();
      const chordMatch = Object.keys(CHORD_INTERVALS).find(
        chordType => intervalsString === CHORD_INTERVALS[chordType].toString()
      );
      if (chordMatch) return { root, type: chordMatch };
    })
    .filter((x): x is Chord => !!x);
}

export function getTabChords(tabData: TabData) {
  const { tuning, data } = tabData;
  return data[0]
    .map((_, fretIdx) =>
      data
        .map((string, stringIdx) => getNote(tuning[stringIdx], string[fretIdx]))
        .filter(x => x)
    )
    .map(getChords);
}

export function validateTabData(tabData: TabData) {
  return (
    tabData.tuning.length &&
    tabData.data.length &&
    tabData.tuning.length === tabData.data.length &&
    allArraysAreSameLength(tabData.data)
  );
}

function allArraysAreSameLength(arrays: string[][]) {
  if (arrays.length === 1) return true;

  const firstArrayLength = arrays[0].length;
  const hasNonMatchingArrayLength = arrays
    .slice(1)
    .some(a => a.length !== firstArrayLength);
  return !hasNonMatchingArrayLength;
}

export function getUniqueNotes(tabData: TabData): string[] {
  return tabData.data
    .reduce<string[]>((bigAcc, string, i) => {
      const rootNote = tabData.tuning[i];
      return bigAcc.concat(
        string.reduce<string[]>((lilAcc, fret) => {
          if (fret) {
            const note = getNote(rootNote, fret);
            if (note) {
              lilAcc.push(note);
            }
          }

          return lilAcc;
        }, [])
      );
    }, [])
    .filter((note, i, arr) => arr.indexOf(note) === i)
    .sort();
}

// 'a min': ['a', 'b', 'c', 'd', 'e', 'f', 'g']
function buildKeyMap(): Record<string, string[]> {
  return ALL_NOTES.reduce<Record<string, string[]>>(
    (keyMap, rootNote) => {
      Object.entries(KEY_INTERVALS).forEach(([keyType, intervals]) => {
        const keyName = `${rootNote} ${keyType}`;
        const keyNotes = intervals.reduce(
          (acc, interval) => {
            acc.push(getNote(rootNote, `${interval}`));
            return acc;
          },
          [rootNote]
        );

        keyMap[keyName] = keyNotes;
      });
      return keyMap;
    },
    { chromatic: ALL_NOTES }
  );
}

// 'abcdefg': ['a min', 'c maj']
function buildReverseKeyLookup(
  keyMap: Record<string, string[]>
): Record<string, string[]> {
  return Object.entries(keyMap).reduce<Record<string, string[]>>(
    (reverseMap, [key, notes]) => {
      const reverseLookupKey = notes.sort().join('');
      reverseMap[reverseLookupKey] = reverseMap[reverseLookupKey] || [];
      reverseMap[reverseLookupKey].push(key);
      return reverseMap;
    },
    {}
  );
}

export const keyMap = buildKeyMap();
export const keyLookup = buildReverseKeyLookup(keyMap);

export function getPossibleKeys(tabData: TabData) {
  const tabNotes = getUniqueNotes(tabData);
  return Object.keys(keyMap).filter(key => {
    return tabNotes.every(note => keyMap[key].includes(note));
  });
}
