tab-tools
------------

Utilities for working with guitar tabs

## API

### TabData

Combination of `tuning` for the root note of each strings, and a 2-dimensional `data` array representing the fretted notes in the tab.

```
type TabData = {
  tuning: string[];
  data: string[][];
};
```

```
{
  tuning: ['g', 'd', 'a', 'e'],
  data: [
    ['2', '', '1', ''],
    ['3', '', '2', ''],
    ['3', '', '2', ''],
    ['1', '', '0', ''],
  ],
}
```

### getNote(rootNote: string, fret: string): string

For a given `rootNote` (i.e, 'a', 'c', 'g#') for a string and a `fret` (i.e, '0', '5', '12'), returns the note at that fret.

Note: Will return values using lowercased sharps (`#`) even if input uses upper case and flats (`b`).

```
getNote('a', 3)
// 'c'
getNote('e', 13)
// 'f'
getNote('Gb', 0)
// 'f#'
```

### validataTabData(tabData: TabData): boolean

Checks that `tuning` and `data` are both present, that `tuning` has the same length as `data`, and that all string arrays in `data` have the same length 

### getUniqueNotes(tabData: TabData): string[]

Returns a sorted array of all the notes in a given tabData

