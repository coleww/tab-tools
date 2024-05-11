import { FLATS_TO_SHARPS, ALL_NOTES } from './constants';

export function getNote(
  rootNote: string | undefined,
  fret: string | undefined
) {
  if (!rootNote || !fret || !/\d+/.exec(fret)) {
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
    return ALL_NOTES[targetFret - remainder] || '';
  }

  return ALL_NOTES[rootIndex + targetFret] || '';
}
