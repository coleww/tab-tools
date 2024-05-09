import { ALL_NOTES, FLATS_TO_SHARPS, type TabData } from "./constants";

export function getNote(rootNote: string, fret: string) {
	if (!(/\d+/.exec(fret))) {
		return '';
	}

	const targetFret = ~~fret % 12;

  const rootNoteLowerCased = rootNote.toLowerCase();
  const rootNoteWithoutFlats = FLATS_TO_SHARPS[rootNoteLowerCased] || rootNoteLowerCased

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
  return tabData.tuning.length && tabData.data.length && 
    tabData.tuning.length === tabData.data.length && 
    allArraysAreSameLength(tabData.data);
}

function allArraysAreSameLength(arrays: any[][]) {
  if (arrays.length === 1) return true;

  const firstArrayLength = arrays[0].length;
  const hasNonMatchingArrayLength = arrays.slice(1).some(a => a.length !== firstArrayLength)
  return !hasNonMatchingArrayLength;
}