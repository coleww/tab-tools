import {
  ALL_NOTES,
  FLATS_TO_SHARPS,
  KEY_INTERVALS,
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
    (keyMap, note) => {
      Object.entries(KEY_INTERVALS).forEach(([keyType, intervals]) => {
        const keyName = `${note} ${keyType}`;
        const keyNotes = [note];
        let nextInterval = 0;
        intervals.forEach(interval => {
          nextInterval += interval;
          keyNotes.push(getNote(note, `${nextInterval}`));
        });
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
