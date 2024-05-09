tab-tools
------------

Utilities for working with guitar tabs

## API

### getNote(rootNote: string, fret: string)

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

