var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod ||
        (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, 'default', { value: mod, enumerable: true })
      : target,
    mod
  )
);

// dist/index.js
var require_dist = __commonJS({
  'dist/index.js'(exports, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if ((from && typeof from === 'object') || typeof from === 'function') {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, {
              get: () => from[key],
              enumerable:
                !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable,
            });
      }
      return to;
    };
    var __toCommonJS = mod =>
      __copyProps2(__defProp2({}, '__esModule', { value: true }), mod);
    var src_exports = {};
    __export(src_exports, {
      ALL_NOTES: () => ALL_NOTES,
      CHORD_INTERVALS: () => CHORD_INTERVALS,
      KEY_INTERVALS: () => KEY_INTERVALS,
      createTab: () => createTab2,
      getChords: () => getChords,
      getInterval: () => getInterval,
      getNote: () => getNote,
      getPossibleKeys: () => getPossibleKeys2,
      getTabChords: () => getTabChords2,
      getUniqueNotes: () => getUniqueNotes,
      parseTab: () => parseTab2,
      validateTabData: () => validateTabData,
    });
    module2.exports = __toCommonJS(src_exports);
    function validateTabData(tabData) {
      return (
        tabData.tuning.length &&
        tabData.data.length &&
        tabData.tuning.length === tabData.data.length &&
        allArraysAreSameLength(tabData.data)
      );
    }
    function allArraysAreSameLength(arrays) {
      var _a;
      if (arrays.length === 1) return true;
      const firstArrayLength = (_a = arrays[0]) == null ? void 0 : _a.length;
      const hasNonMatchingArrayLength = arrays
        .slice(1)
        .some(a => a.length !== firstArrayLength);
      return !hasNonMatchingArrayLength;
    }
    var KEY_INTERVALS = {
      maj: [2, 4, 5, 7, 9, 11],
      min: [2, 3, 5, 7, 8, 10],
      harmMin: [2, 3, 5, 7, 8, 11],
      melMin: [2, 3, 5, 7, 9, 11],
      wholeTone: [2, 4, 6, 8, 10],
      pentMaj: [2, 4, 7, 9],
      pentMin: [3, 5, 7, 10],
      oct1: [1, 3, 4, 6, 7, 9],
      oct2: [2, 3, 5, 6, 8, 9, 11],
    };
    var CHORD_INTERVALS = {
      M3: [4],
      m3: [3],
      maj: [4, 7],
      min: [3, 7],
      maj2: [2, 4, 7],
      min2: [2, 3, 7],
      maj7: [4, 7, 11],
      min7: [3, 7, 10],
      p5: [7],
      sus2: [2, 7],
      sus4: [5, 7],
    };
    var ALL_NOTES = [
      'a',
      'a#',
      'b',
      'c',
      'c#',
      'd',
      'd#',
      'e',
      'f',
      'f#',
      'g',
      'g#',
    ];
    var FLATS_TO_SHARPS = {
      bb: 'a#',
      db: 'c#',
      eb: 'e#',
      gb: 'f#',
      ab: 'g#',
    };
    function getNote(rootNote, fret) {
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
    function parseTab2(strings) {
      const cleanedStrings = strings
        .map(string => string.trim())
        .filter(x => !!x);
      const len = Math.min(...cleanedStrings.map(string => string.length));
      let tuning;
      const data = cleanedStrings.map(() => []);
      let i = 0;
      while (i < len) {
        const [currentI, nextI] = [i, i + 1];
        const currentStrings = cleanedStrings.map(
          string => `${string[currentI]}${string[nextI]}`
        );
        if (!tuning && i < 5) {
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
          const increment = anyStringIsDoubleDigit(currentStrings) ? 2 : 1;
          currentStrings.forEach((string, si) => {
            var _a;
            const parsedString = removeBlankSpaces(string.slice(0, increment));
            (_a = data[si]) == null ? void 0 : _a.push(parsedString);
          });
          i += increment;
        } else {
          i++;
        }
      }
      if (!tuning) {
        tuning = ['e', 'B', 'G', 'D', 'A', 'E'];
      }
      return { tuning, data };
    }
    function getTuning(strings) {
      const notes = strings.map(getNote2).filter(item => !!item);
      if (notes.length === strings.length) {
        return notes;
      }
      return void 0;
    }
    function getNote2(string) {
      return (/^[abcdefgABCDEFG][b#]?/.exec(string) || [])[0];
    }
    function removeBlankSpaces(string) {
      return string.replace(/-/g, '');
    }
    function allStringsAreDoubleBlank(strings) {
      return strings.every(s => /^--$/.exec(s));
    }
    function anyStringStartsWithNonBlank(strings) {
      return strings.some(s => /^[^|-]/.exec(s));
    }
    function anyStringIsDoubleDigit(strings) {
      return strings.some(s => /\d\d/.exec(s));
    }
    function buildKeyMap() {
      return ALL_NOTES.reduce(
        (keyMap2, rootNote) => {
          Object.entries(KEY_INTERVALS).forEach(([keyType, intervals]) => {
            const keyName = `${rootNote} ${keyType}`;
            const keyNotes = intervals.reduce(
              (acc, interval) => {
                acc.push(getNote(rootNote, `${interval}`));
                return acc;
              },
              [rootNote]
            );
            keyMap2[keyName] = keyNotes;
          });
          return keyMap2;
        },
        { chromatic: ALL_NOTES }
      );
    }
    var keyMap = buildKeyMap();
    function getPossibleKeys2(tabData) {
      const tabNotes = getUniqueNotes(tabData);
      return Object.keys(keyMap).filter(key => {
        return tabNotes.every(note => {
          var _a;
          return (_a = keyMap[key]) == null ? void 0 : _a.includes(note);
        });
      });
    }
    function getUniqueNotes(tabData) {
      return tabData.data
        .reduce((bigAcc, string, i) => {
          const rootNote = tabData.tuning[i];
          return bigAcc.concat(
            string.reduce((lilAcc, fret) => {
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
    function createTab2(tabData) {
      if (!validateTabData(tabData)) {
        return [];
      }
      const { tuning, data } = tabData;
      return (data[0] || []).reduce((res, _, beatIdx) => {
        const columnHasDouble = data.some(stringData => {
          const colContent = stringData[beatIdx];
          return (
            (colContent == null ? void 0 : colContent.length) &&
            (colContent == null ? void 0 : colContent.length) > 1
          );
        });
        return res.map((stringRes, stringIdx) => {
          const stringData = data[stringIdx];
          const beatData = stringData == null ? void 0 : stringData.at(beatIdx);
          return (stringRes +=
            '-' + handleDouble(beatData || '-', columnHasDouble));
        });
      }, generateTuningStrings(tuning));
    }
    function generateTuningStrings(tuning) {
      const hasDouble = tuning.some(note => note.length > 1);
      return tuning.map(note => `${handleDouble(note, hasDouble)}|`);
    }
    function handleDouble(data, hasDouble) {
      return hasDouble ? `${data}-`.slice(0, 2) : data;
    }
    function getInterval(rootNote, intervalNote) {
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
    function getChords(notes) {
      if (notes.length <= 1) {
        return [];
      }
      return notes
        .sort()
        .filter((x, i, a) => a.indexOf(x) === i)
        .map((_, i, arr) => {
          const noteOrder = [...arr.slice(i), ...arr.slice(0, i)];
          const root = noteOrder[0];
          if (!root) return '';
          const intervalsString = noteOrder
            .slice(1)
            .map(note => getInterval(root, note))
            .toString();
          const chordMatch = Object.keys(CHORD_INTERVALS).find(chordType => {
            var _a;
            return (
              intervalsString ===
              ((_a = CHORD_INTERVALS[chordType]) == null
                ? void 0
                : _a.toString())
            );
          });
          return chordMatch && { root, type: chordMatch };
        })
        .filter(x => !!x);
    }
    function getTabChords2(tabData) {
      var _a;
      const { tuning, data } = tabData;
      return (_a = data[0]) == null
        ? void 0
        : _a
            .map((_, fretIdx) =>
              data
                .map((string, stringIdx) =>
                  getNote(tuning[stringIdx], string[fretIdx])
                )
                .filter(x => x)
            )
            .map(getChords);
    }
  },
});

// node_modules/json-nice/index.js
var require_json_nice = __commonJS({
  'node_modules/json-nice/index.js'(exports, module2) {
    function render(key, value, options, indent) {
      var text = '',
        i;
      indent = indent || 0;
      if (Array.isArray(value)) {
        for (i = 0; i < indent; i++) {
          text += options.indent;
        }
        if (key !== null) {
          text += '"' + key + '": ';
        }
        text += '[\n';
        for (var i = 0; i < value.length; i++) {
          text += render(null, value[i], options, indent + 1);
          if (i < value.length - 1) {
            text += ',';
          }
          text += '\n';
        }
        for (i = 0; i < indent; i++) {
          text += options.indent;
        }
        text += ']';
      } else if (
        value !== null &&
        typeof value === 'object' &&
        value.toString() === '[object Object]'
      ) {
        for (i = 0; i < indent; i++) {
          text += options.indent;
        }
        if (key !== null) {
          text += '"' + key + '": ';
        }
        text += '{\n';
        var keys = Object.keys(value);
        for (var i = 0; i < keys.length; i++) {
          text += render(keys[i], value[keys[i]], options, indent + 1);
          if (i < keys.length - 1) {
            text += ',';
          }
          text += '\n';
        }
        for (i = 0; i < indent; i++) {
          text += options.indent;
        }
        text += '}';
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        for (i = 0; i < indent; i++) {
          text += options.indent;
        }
        if (key !== null) {
          text += '"' + key + '": ';
        }
        if (typeof value === 'number') {
          text += Number(value);
        } else {
          text += value ? 'true' : 'false';
        }
        text += '';
      } else {
        for (i = 0; i < indent; i++) {
          text += options.indent;
        }
        if (key !== null) {
          key = key.replace(/\"/g, '\\"');
          text += '"' + key + '": ';
        }
        if (value === null) {
          text += 'null';
        } else if (value === void 0) {
          text += 'undefined';
        } else {
          value = value.replace(/\"/g, '\\"');
          text += '"' + value + '"';
        }
        text += '';
      }
      return text;
    }
    function format2(obj, opt) {
      var options = { indent: '  ' };
      if (typeof obj === 'object') {
        if (typeof opt === 'object') {
          for (var i in opt) {
            options[i] = opt[i];
          }
        }
        return render(null, obj, options);
      }
    }
    module2.exports = exports = format2;
  },
});

// public/index.ts
var import_dist = __toESM(require_dist());
var import_json_nice = __toESM(require_json_nice());
document.body.addEventListener('paste', function (e) {
  var _a, _b;
  const output = document.getElementById('main');
  if (!output) {
    console.log('wha');
    return;
  }
  try {
    const data =
      ((_b =
        (_a = e.clipboardData) == null ? void 0 : _a.getData('text/plain')) ==
      null
        ? void 0
        : _b.split('\n')) || [];
    const tabData = (0, import_dist.parseTab)(data);
    const fmtTab = (0, import_dist.createTab)(tabData);
    const key = `Possibly keys: ${(0, import_dist.getPossibleKeys)(tabData)}`;
    const fmtJson =
      (0, import_json_nice.default)(tabData, { indent: ' ' })
        .split('\n   ')
        .join(' ') || '';
    const result = [...fmtTab, key, fmtJson].join('\n');
    console.log;
    output.textContent = result;
  } catch (e2) {
    output.textContent = e2;
  }
});
