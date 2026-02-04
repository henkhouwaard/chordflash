import type { ChordType, ChordFormula } from '../types/chord';

// Musical notes for the settings panel
export const NOTES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// Chord formulas with intervals (semitones from root)
export const CHORD_FORMULAS: ChordFormula = {
  major7: {
    name: 'Major 7th',
    intervals: [0, 4, 7, 11],
  },
  minor7: {
    name: 'Minor 7th',
    intervals: [0, 3, 7, 10],
  },
  dominant7: {
    name: 'Dominant 7th',
    intervals: [0, 4, 7, 10],
  },
  halfDiminished: {
    name: 'Half Diminished 7th',
    intervals: [0, 3, 6, 10],
  },
};

// Explicit chord spellings for each root and type
const CHORD_SPELLINGS: { [key: string]: { [key in ChordType]: string[] } } = {
  'C': {
    major7: ['C', 'E', 'G', 'B'],
    minor7: ['C', 'Eb', 'G', 'Bb'],
    dominant7: ['C', 'E', 'G', 'Bb'],
    halfDiminished: ['C', 'Eb', 'Gb', 'Bb'],
  },
  'Db': {
    major7: ['Db', 'F', 'Ab', 'C'],
    minor7: ['Db', 'Fb', 'Ab', 'Cb'],
    dominant7: ['Db', 'F', 'Ab', 'Cb'],
    halfDiminished: ['Db', 'Fb', 'Abb', 'Cb'],
  },
  'D': {
    major7: ['D', 'F#', 'A', 'C#'],
    minor7: ['D', 'F', 'A', 'C'],
    dominant7: ['D', 'F#', 'A', 'C'],
    halfDiminished: ['D', 'F', 'Ab', 'C'],
  },
  'Eb': {
    major7: ['Eb', 'G', 'Bb', 'D'],
    minor7: ['Eb', 'Gb', 'Bb', 'Db'],
    dominant7: ['Eb', 'G', 'Bb', 'Db'],
    halfDiminished: ['Eb', 'Gb', 'Bbb', 'Db'],
  },
  'E': {
    major7: ['E', 'G#', 'B', 'D#'],
    minor7: ['E', 'G', 'B', 'D'],
    dominant7: ['E', 'G#', 'B', 'D'],
    halfDiminished: ['E', 'G', 'Bb', 'D'],
  },
  'F': {
    major7: ['F', 'A', 'C', 'E'],
    minor7: ['F', 'Ab', 'C', 'Eb'],
    dominant7: ['F', 'A', 'C', 'Eb'],
    halfDiminished: ['F', 'Ab', 'Cb', 'Eb'],
  },
  'Gb': {
    major7: ['Gb', 'Bb', 'Db', 'F'],
    minor7: ['Gb', 'Bbb', 'Db', 'Fb'],
    dominant7: ['Gb', 'Bb', 'Db', 'Fb'],
    halfDiminished: ['Gb', 'Bbb', 'Dbb', 'Fb'],
  },
  'G': {
    major7: ['G', 'B', 'D', 'F#'],
    minor7: ['G', 'Bb', 'D', 'F'],
    dominant7: ['G', 'B', 'D', 'F'],
    halfDiminished: ['G', 'Bb', 'Db', 'F'],
  },
  'Ab': {
    major7: ['Ab', 'C', 'Eb', 'G'],
    minor7: ['Ab', 'Cb', 'Eb', 'Gb'],
    dominant7: ['Ab', 'C', 'Eb', 'Gb'],
    halfDiminished: ['Ab', 'Cb', 'Ebb', 'Gb'],
  },
  'A': {
    major7: ['A', 'C#', 'E', 'G#'],
    minor7: ['A', 'C', 'E', 'G'],
    dominant7: ['A', 'C#', 'E', 'G'],
    halfDiminished: ['A', 'C', 'Eb', 'G'],
  },
  'Bb': {
    major7: ['Bb', 'D', 'F', 'A'],
    minor7: ['Bb', 'Db', 'F', 'Ab'],
    dominant7: ['Bb', 'D', 'F', 'Ab'],
    halfDiminished: ['Bb', 'Db', 'Fb', 'Ab'],
  },
  'B': {
    major7: ['B', 'D#', 'F#', 'A#'],
    minor7: ['B', 'D', 'F#', 'A'],
    dominant7: ['B', 'D#', 'F#', 'A'],
    halfDiminished: ['B', 'D', 'F', 'A'],
  },
};

// Function to calculate chord notes based on root and type
export function getChordNotes(root: string, type: ChordType): string[] {
  if (CHORD_SPELLINGS[root] && CHORD_SPELLINGS[root][type]) {
    return CHORD_SPELLINGS[root][type];
  }
  throw new Error(`No spelling defined for ${root}${type}`);
}

// Function to get chord symbol
export function getChordSymbol(root: string, type: ChordType): string {
  const symbols = {
    major7: 'maj7',
    minor7: 'm7',
    dominant7: '7',
    halfDiminished: 'ø7',
  };

  return `${root}${symbols[type]}`;
}

// Function to get full chord name
export function getChordName(root: string, type: ChordType): string {
  return `${root} ${CHORD_FORMULAS[type].name}`;
}