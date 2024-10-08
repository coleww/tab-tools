import type { TabData } from './constants';

export function parseTab(strings: string[]): TabData[] {
  let isRiff = false;
  const riffs = strings.reduce(
    (arr, string) => {
      // TODO: research tabs, does this suffice to detect strings vs. notes?
      if (string.includes('--')) {
        isRiff = true;
        arr[arr.length - 1].push(string.trim());
      } else {
        // TODO: handle top/bottom notes
        if (isRiff) {
          isRiff = false;
          arr.push([]);
        }
      }

      return arr;
    },
    <string[][]>[[]]
  );

  return riffs.filter(riff => riff.length).map(riff => parseRiff(riff));
}

export function parseRiff(strings: string[]): TabData {
  // TODO: collect side notes at end of strings
  const len = Math.min(...strings.map(string => string.length));

  let tuning: string[] | undefined;
  const data: string[][] = strings.map(() => []);

  let i = 0;
  while (i < len) {
    // block scope `i` so typescript is happy...
    const [currentI, nextI] = [i, i + 1];

    // Always look 1 step ahead, frets can be 1 or 2 digits
    const currentStrings = strings.map(
      string => `${string[currentI]}${string[nextI]}`
    );

    // Assume the tuning is within the first 3 chars
    if (!tuning && i < 3) {
      tuning = getTuning(currentStrings);
      if (tuning) {
        i += 2;
        continue;
      }
    }

    if (allStringsAreDoubleBlank(currentStrings)) {
      data.forEach(s => s.push(''));
      i += 2;
    } else if (anyStringStartsWithNonBlank(currentStrings)) {
      // TODO: anyStringIsDoubleDigit could be more like "maxCellLength"
      const increment = anyStringIsDoubleDigit(currentStrings) ? 2 : 1;
      currentStrings.forEach((string, si) => {
        const parsedString = removeBlankSpaces(string.slice(0, increment));

        // TODO: make sure all number OR is diacriticals
        // There could be a double digit with something like `9b`?
        data[si]?.push(parsedString);
      });
      i += increment;
    } else {
      // Skip single blanks
      i++;
    }
  }

  // If we didn't find a tuning, assume standard
  if (!tuning) {
    tuning = ['e', 'B', 'G', 'D', 'A', 'E'];
  }

  return { tuning, data };
}

export function getTuning(strings: string[]): string[] | undefined {
  const notes = strings.map(getNote).filter((item): item is string => !!item);

  if (notes.length === strings.length) {
    return notes;
  }

  return undefined;
}

export function getNote(string: string): string | undefined {
  return (/^[abcdefgABCDEFG][b#]?/.exec(string) || [])[0];
}

export function removeBlankSpaces(string: string): string {
  return string.replace(/(-|\|)/g, '');
}

export function allStringsAreDoubleBlank(strings: string[]): boolean {
  return strings.every(s => /^--$/.exec(s));
}

export function anyStringStartsWithNonBlank(strings: string[]): boolean {
  return strings.some(s => /^[^|-]/.exec(s));
}

export function anyStringIsDoubleDigit(strings: string[]): boolean {
  return strings.some(s => /\d\d/.exec(s));
}
