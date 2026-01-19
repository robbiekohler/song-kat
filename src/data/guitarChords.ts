// Guitar chord fingerings
// Frets: -1 = muted (x), 0 = open, 1-12 = fret number
// Fingers: 0 = open/muted, 1 = index, 2 = middle, 3 = ring, 4 = pinky, 5 = thumb

export interface ChordFingering {
  name: string;
  frets: number[];      // [E, A, D, G, B, e] low to high
  fingers: number[];    // finger numbers for each string
  barres?: { fret: number; fromString: number; toString: number }[];
  baseFret: number;     // starting fret (1 for open chords)
  label?: string;       // optional label like "Easy", "Partial", etc.
}

export const guitarChords: Record<string, ChordFingering> = {
  // Major chords
  'C': { name: 'C', frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0], baseFret: 1 },
  'D': { name: 'D', frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2], baseFret: 1 },
  'E': { name: 'E', frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0], baseFret: 1 },
  'F': { name: 'F', frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 1, fromString: 0, toString: 5 }], baseFret: 1 },
  'G': { name: 'G', frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3], baseFret: 1 },
  'A': { name: 'A', frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0], baseFret: 1 },
  'B': { name: 'B', frets: [-1, 2, 4, 4, 4, 2], fingers: [0, 1, 2, 3, 4, 1], barres: [{ fret: 2, fromString: 1, toString: 5 }], baseFret: 1 },

  // Minor chords
  'Cm': { name: 'Cm', frets: [-1, 3, 5, 5, 4, 3], fingers: [0, 1, 3, 4, 2, 1], barres: [{ fret: 3, fromString: 1, toString: 5 }], baseFret: 1 },
  'Dm': { name: 'Dm', frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1], baseFret: 1 },
  'Em': { name: 'Em', frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0], baseFret: 1 },
  'Fm': { name: 'Fm', frets: [1, 3, 3, 1, 1, 1], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 1, fromString: 0, toString: 5 }], baseFret: 1 },
  'Gm': { name: 'Gm', frets: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 3, fromString: 0, toString: 5 }], baseFret: 1 },
  'Am': { name: 'Am', frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0], baseFret: 1 },
  'Bm': { name: 'Bm', frets: [-1, 2, 4, 4, 3, 2], fingers: [0, 1, 3, 4, 2, 1], barres: [{ fret: 2, fromString: 1, toString: 5 }], baseFret: 1 },

  // 7th chords
  'C7': { name: 'C7', frets: [-1, 3, 2, 3, 1, 0], fingers: [0, 3, 2, 4, 1, 0], baseFret: 1 },
  'D7': { name: 'D7', frets: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 2, 1, 3], baseFret: 1 },
  'E7': { name: 'E7', frets: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0], baseFret: 1 },
  'F7': { name: 'F7', frets: [1, 3, 1, 2, 1, 1], fingers: [1, 3, 1, 2, 1, 1], barres: [{ fret: 1, fromString: 0, toString: 5 }], baseFret: 1 },
  'G7': { name: 'G7', frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1], baseFret: 1 },
  'A7': { name: 'A7', frets: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 1, 0, 2, 0], baseFret: 1 },
  'B7': { name: 'B7', frets: [-1, 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4], baseFret: 1 },

  // Minor 7th chords
  'Cm7': { name: 'Cm7', frets: [-1, 3, 5, 3, 4, 3], fingers: [0, 1, 3, 1, 2, 1], barres: [{ fret: 3, fromString: 1, toString: 5 }], baseFret: 1 },
  'Dm7': { name: 'Dm7', frets: [-1, -1, 0, 2, 1, 1], fingers: [0, 0, 0, 2, 1, 1], baseFret: 1 },
  'Em7': { name: 'Em7', frets: [0, 2, 0, 0, 0, 0], fingers: [0, 2, 0, 0, 0, 0], baseFret: 1 },
  'Fm7': { name: 'Fm7', frets: [1, 3, 1, 1, 1, 1], fingers: [1, 3, 1, 1, 1, 1], barres: [{ fret: 1, fromString: 0, toString: 5 }], baseFret: 1 },
  'Gm7': { name: 'Gm7', frets: [3, 5, 3, 3, 3, 3], fingers: [1, 3, 1, 1, 1, 1], barres: [{ fret: 3, fromString: 0, toString: 5 }], baseFret: 1 },
  'Am7': { name: 'Am7', frets: [-1, 0, 2, 0, 1, 0], fingers: [0, 0, 2, 0, 1, 0], baseFret: 1 },
  'Bm7': { name: 'Bm7', frets: [-1, 2, 4, 2, 3, 2], fingers: [0, 1, 3, 1, 2, 1], barres: [{ fret: 2, fromString: 1, toString: 5 }], baseFret: 1 },

  // Major 7th chords
  'Cmaj7': { name: 'Cmaj7', frets: [-1, 3, 2, 0, 0, 0], fingers: [0, 3, 2, 0, 0, 0], baseFret: 1 },
  'Dmaj7': { name: 'Dmaj7', frets: [-1, -1, 0, 2, 2, 2], fingers: [0, 0, 0, 1, 2, 3], baseFret: 1 },
  'Emaj7': { name: 'Emaj7', frets: [0, 2, 1, 1, 0, 0], fingers: [0, 3, 1, 2, 0, 0], baseFret: 1 },
  'Fmaj7': { name: 'Fmaj7', frets: [1, -1, 2, 2, 1, 0], fingers: [1, 0, 3, 2, 1, 0], baseFret: 1 },
  'Gmaj7': { name: 'Gmaj7', frets: [3, 2, 0, 0, 0, 2], fingers: [2, 1, 0, 0, 0, 3], baseFret: 1 },
  'Amaj7': { name: 'Amaj7', frets: [-1, 0, 2, 1, 2, 0], fingers: [0, 0, 2, 1, 3, 0], baseFret: 1 },
  'Bmaj7': { name: 'Bmaj7', frets: [-1, 2, 4, 3, 4, 2], fingers: [0, 1, 3, 2, 4, 1], barres: [{ fret: 2, fromString: 1, toString: 5 }], baseFret: 1 },

  // Diminished chords
  'Cdim': { name: 'Cdim', frets: [-1, 3, 4, 2, 4, 2], fingers: [0, 2, 3, 1, 4, 1], baseFret: 1 },
  'Ddim': { name: 'Ddim', frets: [-1, -1, 0, 1, 3, 1], fingers: [0, 0, 0, 1, 3, 2], baseFret: 1 },
  'Edim': { name: 'Edim', frets: [0, 1, 2, 0, 2, 0], fingers: [0, 1, 2, 0, 3, 0], baseFret: 1 },
  'Fdim': { name: 'Fdim', frets: [-1, -1, 3, 4, 3, 4], fingers: [0, 0, 1, 2, 1, 3], baseFret: 1 },
  'Gdim': { name: 'Gdim', frets: [-1, -1, 5, 6, 5, 6], fingers: [0, 0, 1, 2, 1, 3], baseFret: 1 },
  'Adim': { name: 'Adim', frets: [-1, 0, 1, 2, 1, 2], fingers: [0, 0, 1, 3, 2, 4], baseFret: 1 },
  'Bdim': { name: 'Bdim', frets: [-1, 2, 3, 4, 3, -1], fingers: [0, 1, 2, 4, 3, 0], baseFret: 1 },

  // Sus chords
  'Csus4': { name: 'Csus4', frets: [-1, 3, 3, 0, 1, 1], fingers: [0, 3, 4, 0, 1, 1], baseFret: 1 },
  'Dsus4': { name: 'Dsus4', frets: [-1, -1, 0, 2, 3, 3], fingers: [0, 0, 0, 1, 2, 3], baseFret: 1 },
  'Esus4': { name: 'Esus4', frets: [0, 2, 2, 2, 0, 0], fingers: [0, 1, 2, 3, 0, 0], baseFret: 1 },
  'Fsus4': { name: 'Fsus4', frets: [1, 3, 3, 3, 1, 1], fingers: [1, 2, 3, 4, 1, 1], barres: [{ fret: 1, fromString: 0, toString: 5 }], baseFret: 1 },
  'Gsus4': { name: 'Gsus4', frets: [3, 3, 0, 0, 1, 3], fingers: [2, 3, 0, 0, 1, 4], baseFret: 1 },
  'Asus4': { name: 'Asus4', frets: [-1, 0, 2, 2, 3, 0], fingers: [0, 0, 1, 2, 3, 0], baseFret: 1 },
  'Bsus4': { name: 'Bsus4', frets: [-1, 2, 4, 4, 5, 2], fingers: [0, 1, 2, 3, 4, 1], barres: [{ fret: 2, fromString: 1, toString: 5 }], baseFret: 1 },

  'Csus2': { name: 'Csus2', frets: [-1, 3, 0, 0, 1, 0], fingers: [0, 3, 0, 0, 1, 0], baseFret: 1 },
  'Dsus2': { name: 'Dsus2', frets: [-1, -1, 0, 2, 3, 0], fingers: [0, 0, 0, 1, 2, 0], baseFret: 1 },
  'Esus2': { name: 'Esus2', frets: [0, 2, 4, 4, 0, 0], fingers: [0, 1, 3, 4, 0, 0], baseFret: 1 },
  'Gsus2': { name: 'Gsus2', frets: [3, 0, 0, 0, 3, 3], fingers: [1, 0, 0, 0, 3, 4], baseFret: 1 },
  'Asus2': { name: 'Asus2', frets: [-1, 0, 2, 2, 0, 0], fingers: [0, 0, 1, 2, 0, 0], baseFret: 1 },
  'Fsus2': { name: 'Fsus2', frets: [-1, -1, 3, 0, 1, 1], fingers: [0, 0, 3, 0, 1, 1], baseFret: 1 },
  'Bsus2': { name: 'Bsus2', frets: [-1, 2, 4, 4, 2, 2], fingers: [0, 1, 3, 4, 1, 1], barres: [{ fret: 2, fromString: 1, toString: 5 }], baseFret: 1 },

  // Power chords (5 chords) - Root + 5th, no 3rd
  'C5': { name: 'C5', frets: [-1, 3, 5, 5, -1, -1], fingers: [0, 1, 3, 4, 0, 0], baseFret: 1 },
  'D5': { name: 'D5', frets: [-1, -1, 0, 2, 3, -1], fingers: [0, 0, 0, 1, 2, 0], baseFret: 1 },
  'E5': { name: 'E5', frets: [0, 2, 2, -1, -1, -1], fingers: [0, 1, 2, 0, 0, 0], baseFret: 1 },
  'F5': { name: 'F5', frets: [1, 3, 3, -1, -1, -1], fingers: [1, 3, 4, 0, 0, 0], baseFret: 1 },
  'G5': { name: 'G5', frets: [3, 5, 5, -1, -1, -1], fingers: [1, 3, 4, 0, 0, 0], baseFret: 1 },
  'A5': { name: 'A5', frets: [-1, 0, 2, 2, -1, -1], fingers: [0, 0, 1, 2, 0, 0], baseFret: 1 },
  'B5': { name: 'B5', frets: [-1, 2, 4, 4, -1, -1], fingers: [0, 1, 3, 4, 0, 0], baseFret: 1 },
  'C#5': { name: 'C#5', frets: [-1, 4, 6, 6, -1, -1], fingers: [0, 1, 3, 4, 0, 0], baseFret: 1 },
  'Db5': { name: 'Db5', frets: [-1, 4, 6, 6, -1, -1], fingers: [0, 1, 3, 4, 0, 0], baseFret: 1 },
  'D#5': { name: 'D#5', frets: [-1, 6, 8, 8, -1, -1], fingers: [0, 1, 3, 4, 0, 0], baseFret: 1 },
  'Eb5': { name: 'Eb5', frets: [-1, 6, 8, 8, -1, -1], fingers: [0, 1, 3, 4, 0, 0], baseFret: 1 },
  'F#5': { name: 'F#5', frets: [2, 4, 4, -1, -1, -1], fingers: [1, 3, 4, 0, 0, 0], baseFret: 1 },
  'Gb5': { name: 'Gb5', frets: [2, 4, 4, -1, -1, -1], fingers: [1, 3, 4, 0, 0, 0], baseFret: 1 },
  'G#5': { name: 'G#5', frets: [4, 6, 6, -1, -1, -1], fingers: [1, 3, 4, 0, 0, 0], baseFret: 1 },
  'Ab5': { name: 'Ab5', frets: [4, 6, 6, -1, -1, -1], fingers: [1, 3, 4, 0, 0, 0], baseFret: 1 },
  'A#5': { name: 'A#5', frets: [-1, 1, 3, 3, -1, -1], fingers: [0, 1, 3, 4, 0, 0], baseFret: 1 },
  'Bb5': { name: 'Bb5', frets: [-1, 1, 3, 3, -1, -1], fingers: [0, 1, 3, 4, 0, 0], baseFret: 1 },

  // Sharp/Flat variants (using barre chord shapes)
  'C#': { name: 'C#', frets: [-1, 4, 6, 6, 6, 4], fingers: [0, 1, 3, 3, 3, 1], barres: [{ fret: 4, fromString: 1, toString: 5 }], baseFret: 1 },
  'C#m': { name: 'C#m', frets: [-1, 4, 6, 6, 5, 4], fingers: [0, 1, 3, 4, 2, 1], barres: [{ fret: 4, fromString: 1, toString: 5 }], baseFret: 1 },
  'D#': { name: 'D#', frets: [-1, 6, 8, 8, 8, 6], fingers: [0, 1, 3, 3, 3, 1], barres: [{ fret: 6, fromString: 1, toString: 5 }], baseFret: 1 },
  'D#m': { name: 'D#m', frets: [-1, 6, 8, 8, 7, 6], fingers: [0, 1, 3, 4, 2, 1], barres: [{ fret: 6, fromString: 1, toString: 5 }], baseFret: 1 },
  'F#': { name: 'F#', frets: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 2, fromString: 0, toString: 5 }], baseFret: 1 },
  'F#m': { name: 'F#m', frets: [2, 4, 4, 2, 2, 2], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 2, fromString: 0, toString: 5 }], baseFret: 1 },
  'G#': { name: 'G#', frets: [4, 6, 6, 5, 4, 4], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 4, fromString: 0, toString: 5 }], baseFret: 1 },
  'G#m': { name: 'G#m', frets: [4, 6, 6, 4, 4, 4], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 4, fromString: 0, toString: 5 }], baseFret: 1 },
  'A#': { name: 'A#', frets: [-1, 1, 3, 3, 3, 1], fingers: [0, 1, 2, 3, 4, 1], barres: [{ fret: 1, fromString: 1, toString: 5 }], baseFret: 1 },
  'A#m': { name: 'A#m', frets: [-1, 1, 3, 3, 2, 1], fingers: [0, 1, 3, 4, 2, 1], barres: [{ fret: 1, fromString: 1, toString: 5 }], baseFret: 1 },

  // Enharmonic equivalents (aliases)
  'Db': { name: 'Db', frets: [-1, 4, 6, 6, 6, 4], fingers: [0, 1, 3, 3, 3, 1], barres: [{ fret: 4, fromString: 1, toString: 5 }], baseFret: 1 },
  'Dbm': { name: 'Dbm', frets: [-1, 4, 6, 6, 5, 4], fingers: [0, 1, 3, 4, 2, 1], barres: [{ fret: 4, fromString: 1, toString: 5 }], baseFret: 1 },
  'Eb': { name: 'Eb', frets: [-1, 6, 8, 8, 8, 6], fingers: [0, 1, 3, 3, 3, 1], barres: [{ fret: 6, fromString: 1, toString: 5 }], baseFret: 1 },
  'Ebm': { name: 'Ebm', frets: [-1, 6, 8, 8, 7, 6], fingers: [0, 1, 3, 4, 2, 1], barres: [{ fret: 6, fromString: 1, toString: 5 }], baseFret: 1 },
  'Gb': { name: 'Gb', frets: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 2, fromString: 0, toString: 5 }], baseFret: 1 },
  'Gbm': { name: 'Gbm', frets: [2, 4, 4, 2, 2, 2], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 2, fromString: 0, toString: 5 }], baseFret: 1 },
  'Ab': { name: 'Ab', frets: [4, 6, 6, 5, 4, 4], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 4, fromString: 0, toString: 5 }], baseFret: 1 },
  'Abm': { name: 'Abm', frets: [4, 6, 6, 4, 4, 4], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 4, fromString: 0, toString: 5 }], baseFret: 1 },
  'Bb': { name: 'Bb', frets: [-1, 1, 3, 3, 3, 1], fingers: [0, 1, 2, 3, 4, 1], barres: [{ fret: 1, fromString: 1, toString: 5 }], baseFret: 1 },
  'Bbm': { name: 'Bbm', frets: [-1, 1, 3, 3, 2, 1], fingers: [0, 1, 3, 4, 2, 1], barres: [{ fret: 1, fromString: 1, toString: 5 }], baseFret: 1 },
};

// Alternate voicings for difficult chords
// These provide easier alternatives to barre chords
export const chordAlternates: Record<string, ChordFingering[]> = {
  // F Major alternatives
  'F': [
    { name: 'F', label: 'Full Barre', frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 1, fromString: 0, toString: 5 }], baseFret: 1 },
    { name: 'F', label: 'Easy (Fmaj7)', frets: [-1, -1, 3, 2, 1, 0], fingers: [0, 0, 3, 2, 1, 0], baseFret: 1 },
    { name: 'F', label: 'Mini Barre', frets: [-1, -1, 3, 2, 1, 1], fingers: [0, 0, 3, 2, 1, 1], baseFret: 1 },
    { name: 'F', label: 'Thumb Wrap', frets: [1, 3, 3, 2, 1, 1], fingers: [5, 3, 4, 2, 1, 1], baseFret: 1 },
  ],

  // F Minor alternatives
  'Fm': [
    { name: 'Fm', label: 'Full Barre', frets: [1, 3, 3, 1, 1, 1], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 1, fromString: 0, toString: 5 }], baseFret: 1 },
    { name: 'Fm', label: 'Partial', frets: [-1, -1, 3, 1, 1, 1], fingers: [0, 0, 3, 1, 1, 1], barres: [{ fret: 1, fromString: 3, toString: 5 }], baseFret: 1 },
  ],

  // B Major alternatives
  'B': [
    { name: 'B', label: 'Full Barre', frets: [-1, 2, 4, 4, 4, 2], fingers: [0, 1, 2, 3, 4, 1], barres: [{ fret: 2, fromString: 1, toString: 5 }], baseFret: 1 },
    { name: 'B', label: 'Easy (B7)', frets: [-1, 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4], baseFret: 1 },
    { name: 'B', label: 'Partial', frets: [-1, 2, 4, 4, 4, -1], fingers: [0, 1, 2, 3, 4, 0], baseFret: 1 },
  ],

  // B Minor alternatives
  'Bm': [
    { name: 'Bm', label: 'Full Barre', frets: [-1, 2, 4, 4, 3, 2], fingers: [0, 1, 3, 4, 2, 1], barres: [{ fret: 2, fromString: 1, toString: 5 }], baseFret: 1 },
    { name: 'Bm', label: 'Easy (Bm7)', frets: [-1, 2, 0, 2, 0, 2], fingers: [0, 1, 0, 2, 0, 3], baseFret: 1 },
    { name: 'Bm', label: 'Partial', frets: [-1, 2, 4, 4, 3, -1], fingers: [0, 1, 3, 4, 2, 0], baseFret: 1 },
    { name: 'Bm', label: '3-Finger', frets: [-1, -1, 4, 4, 3, 2], fingers: [0, 0, 3, 4, 2, 1], baseFret: 1 },
  ],

  // Bb/A# Major alternatives
  'Bb': [
    { name: 'Bb', label: 'Full Barre', frets: [-1, 1, 3, 3, 3, 1], fingers: [0, 1, 2, 3, 4, 1], barres: [{ fret: 1, fromString: 1, toString: 5 }], baseFret: 1 },
    { name: 'Bb', label: 'Easy', frets: [-1, 1, 3, 3, 3, -1], fingers: [0, 1, 2, 3, 4, 0], baseFret: 1 },
    { name: 'Bb', label: 'High Position', frets: [6, 8, 8, 7, 6, 6], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 6, fromString: 0, toString: 5 }], baseFret: 1 },
  ],
  'A#': [
    { name: 'A#', label: 'Full Barre', frets: [-1, 1, 3, 3, 3, 1], fingers: [0, 1, 2, 3, 4, 1], barres: [{ fret: 1, fromString: 1, toString: 5 }], baseFret: 1 },
    { name: 'A#', label: 'Easy', frets: [-1, 1, 3, 3, 3, -1], fingers: [0, 1, 2, 3, 4, 0], baseFret: 1 },
  ],

  // Bb/A# Minor alternatives
  'Bbm': [
    { name: 'Bbm', label: 'Full Barre', frets: [-1, 1, 3, 3, 2, 1], fingers: [0, 1, 3, 4, 2, 1], barres: [{ fret: 1, fromString: 1, toString: 5 }], baseFret: 1 },
    { name: 'Bbm', label: 'Partial', frets: [-1, 1, 3, 3, 2, -1], fingers: [0, 1, 3, 4, 2, 0], baseFret: 1 },
  ],
  'A#m': [
    { name: 'A#m', label: 'Full Barre', frets: [-1, 1, 3, 3, 2, 1], fingers: [0, 1, 3, 4, 2, 1], barres: [{ fret: 1, fromString: 1, toString: 5 }], baseFret: 1 },
    { name: 'A#m', label: 'Partial', frets: [-1, 1, 3, 3, 2, -1], fingers: [0, 1, 3, 4, 2, 0], baseFret: 1 },
  ],

  // C# / Db Major alternatives
  'C#': [
    { name: 'C#', label: 'Full Barre', frets: [-1, 4, 6, 6, 6, 4], fingers: [0, 1, 3, 3, 3, 1], barres: [{ fret: 4, fromString: 1, toString: 5 }], baseFret: 1 },
    { name: 'C#', label: 'Capo 1 + C', frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0], baseFret: 1 },
  ],
  'Db': [
    { name: 'Db', label: 'Full Barre', frets: [-1, 4, 6, 6, 6, 4], fingers: [0, 1, 3, 3, 3, 1], barres: [{ fret: 4, fromString: 1, toString: 5 }], baseFret: 1 },
    { name: 'Db', label: 'Capo 1 + C', frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0], baseFret: 1 },
  ],

  // C#m / Dbm alternatives
  'C#m': [
    { name: 'C#m', label: 'Full Barre', frets: [-1, 4, 6, 6, 5, 4], fingers: [0, 1, 3, 4, 2, 1], barres: [{ fret: 4, fromString: 1, toString: 5 }], baseFret: 1 },
    { name: 'C#m', label: 'Easy', frets: [-1, -1, 6, 6, 5, 4], fingers: [0, 0, 3, 4, 2, 1], baseFret: 1 },
    { name: 'C#m', label: 'Capo 4 + Am', frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0], baseFret: 1 },
  ],
  'Dbm': [
    { name: 'Dbm', label: 'Full Barre', frets: [-1, 4, 6, 6, 5, 4], fingers: [0, 1, 3, 4, 2, 1], barres: [{ fret: 4, fromString: 1, toString: 5 }], baseFret: 1 },
    { name: 'Dbm', label: 'Easy', frets: [-1, -1, 6, 6, 5, 4], fingers: [0, 0, 3, 4, 2, 1], baseFret: 1 },
  ],

  // F# / Gb alternatives
  'F#': [
    { name: 'F#', label: 'Full Barre', frets: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 2, fromString: 0, toString: 5 }], baseFret: 1 },
    { name: 'F#', label: 'Partial', frets: [-1, -1, 4, 3, 2, 2], fingers: [0, 0, 4, 3, 1, 1], baseFret: 1 },
  ],
  'Gb': [
    { name: 'Gb', label: 'Full Barre', frets: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 2, fromString: 0, toString: 5 }], baseFret: 1 },
    { name: 'Gb', label: 'Partial', frets: [-1, -1, 4, 3, 2, 2], fingers: [0, 0, 4, 3, 1, 1], baseFret: 1 },
  ],

  // F#m / Gbm alternatives
  'F#m': [
    { name: 'F#m', label: 'Full Barre', frets: [2, 4, 4, 2, 2, 2], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 2, fromString: 0, toString: 5 }], baseFret: 1 },
    { name: 'F#m', label: 'Easy', frets: [-1, -1, 4, 2, 2, 2], fingers: [0, 0, 4, 1, 1, 1], baseFret: 1 },
    { name: 'F#m', label: 'Capo 2 + Em', frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0], baseFret: 1 },
  ],
  'Gbm': [
    { name: 'Gbm', label: 'Full Barre', frets: [2, 4, 4, 2, 2, 2], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 2, fromString: 0, toString: 5 }], baseFret: 1 },
    { name: 'Gbm', label: 'Easy', frets: [-1, -1, 4, 2, 2, 2], fingers: [0, 0, 4, 1, 1, 1], baseFret: 1 },
  ],

  // G# / Ab alternatives
  'G#': [
    { name: 'G#', label: 'Full Barre', frets: [4, 6, 6, 5, 4, 4], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 4, fromString: 0, toString: 5 }], baseFret: 1 },
    { name: 'G#', label: 'Partial', frets: [-1, -1, 6, 5, 4, 4], fingers: [0, 0, 4, 3, 1, 1], baseFret: 1 },
  ],
  'Ab': [
    { name: 'Ab', label: 'Full Barre', frets: [4, 6, 6, 5, 4, 4], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 4, fromString: 0, toString: 5 }], baseFret: 1 },
    { name: 'Ab', label: 'Partial', frets: [-1, -1, 6, 5, 4, 4], fingers: [0, 0, 4, 3, 1, 1], baseFret: 1 },
  ],

  // G#m / Abm alternatives
  'G#m': [
    { name: 'G#m', label: 'Full Barre', frets: [4, 6, 6, 4, 4, 4], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 4, fromString: 0, toString: 5 }], baseFret: 1 },
    { name: 'G#m', label: 'Easy', frets: [-1, -1, 6, 4, 4, 4], fingers: [0, 0, 4, 1, 1, 1], baseFret: 1 },
  ],
  'Abm': [
    { name: 'Abm', label: 'Full Barre', frets: [4, 6, 6, 4, 4, 4], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 4, fromString: 0, toString: 5 }], baseFret: 1 },
    { name: 'Abm', label: 'Easy', frets: [-1, -1, 6, 4, 4, 4], fingers: [0, 0, 4, 1, 1, 1], baseFret: 1 },
  ],

  // Cm alternatives
  'Cm': [
    { name: 'Cm', label: 'Full Barre', frets: [-1, 3, 5, 5, 4, 3], fingers: [0, 1, 3, 4, 2, 1], barres: [{ fret: 3, fromString: 1, toString: 5 }], baseFret: 1 },
    { name: 'Cm', label: 'Easy', frets: [-1, 3, 5, 5, 4, -1], fingers: [0, 1, 3, 4, 2, 0], baseFret: 1 },
    { name: 'Cm', label: 'Capo 3 + Am', frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0], baseFret: 1 },
  ],

  // Gm alternatives
  'Gm': [
    { name: 'Gm', label: 'Full Barre', frets: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1], barres: [{ fret: 3, fromString: 0, toString: 5 }], baseFret: 1 },
    { name: 'Gm', label: 'Easy', frets: [-1, -1, 5, 3, 3, 3], fingers: [0, 0, 4, 1, 1, 1], baseFret: 1 },
    { name: 'Gm', label: '3-String', frets: [-1, -1, -1, 3, 3, 3], fingers: [0, 0, 0, 1, 2, 3], baseFret: 1 },
  ],

  // Eb / D# alternatives
  'Eb': [
    { name: 'Eb', label: 'Full Barre', frets: [-1, 6, 8, 8, 8, 6], fingers: [0, 1, 3, 3, 3, 1], barres: [{ fret: 6, fromString: 1, toString: 5 }], baseFret: 1 },
    { name: 'Eb', label: 'Easy (x43121)', frets: [-1, -1, 5, 3, 4, 3], fingers: [0, 0, 4, 1, 3, 2], baseFret: 1 },
  ],
  'D#': [
    { name: 'D#', label: 'Full Barre', frets: [-1, 6, 8, 8, 8, 6], fingers: [0, 1, 3, 3, 3, 1], barres: [{ fret: 6, fromString: 1, toString: 5 }], baseFret: 1 },
    { name: 'D#', label: 'Easy', frets: [-1, -1, 5, 3, 4, 3], fingers: [0, 0, 4, 1, 3, 2], baseFret: 1 },
  ],

  // Ebm / D#m alternatives
  'Ebm': [
    { name: 'Ebm', label: 'Full Barre', frets: [-1, 6, 8, 8, 7, 6], fingers: [0, 1, 3, 4, 2, 1], barres: [{ fret: 6, fromString: 1, toString: 5 }], baseFret: 1 },
    { name: 'Ebm', label: 'Partial', frets: [-1, -1, 8, 8, 7, 6], fingers: [0, 0, 3, 4, 2, 1], baseFret: 1 },
  ],
  'D#m': [
    { name: 'D#m', label: 'Full Barre', frets: [-1, 6, 8, 8, 7, 6], fingers: [0, 1, 3, 4, 2, 1], barres: [{ fret: 6, fromString: 1, toString: 5 }], baseFret: 1 },
    { name: 'D#m', label: 'Partial', frets: [-1, -1, 8, 8, 7, 6], fingers: [0, 0, 3, 4, 2, 1], baseFret: 1 },
  ],
};

// Helper to normalize chord name
function normalizeChordName(chordName: string): string {
  return chordName
    .replace('maj', '')
    .replace('M', '')
    .replace('minor', 'm')
    .replace('min', 'm');
}

// Helper to get chord by name (handles various formats)
export function getChordFingering(chordName: string): ChordFingering | null {
  // Direct lookup
  if (guitarChords[chordName]) {
    return guitarChords[chordName];
  }

  // Try normalizing the chord name
  const normalized = normalizeChordName(chordName);

  if (guitarChords[normalized]) {
    return guitarChords[normalized];
  }

  // Try without any suffix for basic major
  const root = chordName.match(/^[A-G][#b]?/)?.[0];
  if (root && guitarChords[root]) {
    return guitarChords[root];
  }

  return null;
}

// Get all alternate voicings for a chord
export function getChordAlternates(chordName: string): ChordFingering[] {
  // Direct lookup
  if (chordAlternates[chordName]) {
    return chordAlternates[chordName];
  }

  // Try normalized name
  const normalized = normalizeChordName(chordName);
  if (chordAlternates[normalized]) {
    return chordAlternates[normalized];
  }

  // If no alternates, return the default fingering as single item array
  const defaultFingering = getChordFingering(chordName);
  if (defaultFingering) {
    return [{ ...defaultFingering, label: 'Standard' }];
  }

  return [];
}

// Check if a chord has alternate voicings
export function hasAlternates(chordName: string): boolean {
  const normalized = normalizeChordName(chordName);
  return chordName in chordAlternates || normalized in chordAlternates;
}

// Get all available chord names
export function getAvailableChords(): string[] {
  return Object.keys(guitarChords);
}
