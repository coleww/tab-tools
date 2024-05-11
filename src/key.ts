import { ALL_NOTES, KEY_INTERVALS, TabData } from './constants';
import { getNote } from './note';

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

export const keyMap = buildKeyMap();

export function getPossibleKeys(tabData: TabData) {
  const tabNotes = getUniqueNotes(tabData);
  return Object.keys(keyMap).filter(key => {
    return tabNotes.every(note => keyMap[key]?.includes(note));
  });
}

export function getUniqueNotes(tabData: TabData): string[] {
  return tabData.data
    .reduce<string[]>((bigAcc, string, i) => {
      const rootNote = tabData.tuning[i];
      return bigAcc.concat(
        string.reduce<string[]>((lilAcc, fret) => {
          if (fret && rootNote) {
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
