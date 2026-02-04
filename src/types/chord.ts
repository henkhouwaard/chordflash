export interface Chord {
  root: string;
  type: ChordType;
  name: string;
  notes: string[];
}

export type ChordType = 'major7' | 'minor7' | 'dominant7' | 'halfDiminished';

export interface ChordFormula {
  [key: string]: {
    name: string;
    intervals: number[];
  };
}

export interface AppSettings {
  timerDuration: number; // in seconds
  selectedKeys: string[];
  selectedChordTypes: ChordType[];
}