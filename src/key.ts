import { ALL_KEYS, KEY_MAP, type TabData } from './constants';
import { getNote } from './note';



export function getPossibleKeys(tabData: TabData) {
  const tabNotes = getUniqueNotes(tabData);
  return ALL_KEYS.filter(key => {
    return tabNotes.every(note => KEY_MAP[key]?.includes(note));
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
