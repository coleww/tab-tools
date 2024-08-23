## tab-tools

Utilities for working with guitar tabs.

## Types

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
    ['2', '', '0', ''],
    ['3', '', '2', ''],
    ['3', '', '2', ''],
    ['1', '', '0', ''],
  ],
}
```

## API

### Parse

#### parseTab(tabStrings: string[]): TabData

Takes an array of guitar tab strings representing a single "riff" and attempts to parse it into `TabData`s

```js
parseTab(['bass', 'G|-2-0-|', 'D|-3-2-| x2', 'A|-3-2-|', 'E|-1-0-|']);
// [{
//   tuning: ['g', 'd', 'a', 'e'],
//   data: [
//     ['2', '', '0', ''],
//     ['3', '', '2', ''],
//     ['3', '', '2', ''],
//     ['1', '', '0', ''],
//   ],
// }]
```

### Analysis

#### validataTabData(tabData: TabData): boolean

Checks that `tuning` and `data` are both present, that `tuning` has the same length as `data`, and that all string arrays in `data` have the same length

#### getUniqueNotes(tabData: TabData): string[]

Returns a sorted array of all the notes in the tabData.

```js
getUniqueNotes({
  tuning: ['g', 'd', 'a', 'e'],
  data: [
    ['2', '', '0', ''],
    ['3', '', '2', ''],
    ['3', '', '2', ''],
    ['1', '', '0', ''],
  ],
});
// ['a', 'b', 'c', 'e', 'f', 'g']
```

#### getPossibleKeys(tabData: TabData): string[]

Returns a list of keys that contain all the notes in the tabData.

```js
getPossibleKeys({
  tuning: ['g', 'd', 'a', 'e'],
  data: [
    ['2', '', '0', ''],
    ['3', '', '2', ''],
    ['3', '', '2', ''],
    ['1', '', '0', ''],
  ],
});
// ['chromatic', 'a min', 'c maj']
```

#### getTabChords(tabData: TabData): string[]

Iterates over tab data and detects possible chords on each "beat"

```js
getTabChords({
  tuning: ['g', 'd', 'a', 'e'],
  data: [
    ['2', '', '0', ''],
    ['3', '', '2', ''],
    ['3', '', '2', ''],
    ['1', '', '0', ''],
  ],
});
// [[{root: 'f', type: 'maj'}], [], [{root: 'e', type: 'min'}], []]
```

#### getNote(rootNote: string, fret: string): string

For a given `rootNote` (i.e, 'a', 'c', 'g#') of a string and a `fret` (i.e, '0', '5', '12'), returns the note at that fret.

Note: Will return values using lowercased sharps (`#`) even if input uses upper case and flats (`b`).

```js
getNote('a', '3');
// 'c'
getNote('e', '13');
// 'f'
getNote('Gb', '0');
// 'f#'
```

#### getChords(notes: string[]): {root: string, type: string}[]

For a given array of `notes`, searches for potential matching `Chord`s

```js
getChords(['c', 'g', 'e']);
// [{root: 'c', type: 'maj}]
```
