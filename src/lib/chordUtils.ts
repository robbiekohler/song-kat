import type { MusicalKey, Mode } from '../types';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const ENHARMONIC_MAP: Record<string, string> = {
  'Db': 'C#',
  'Eb': 'D#',
  'Gb': 'F#',
  'Ab': 'G#',
  'Bb': 'A#',
};

// Intervals from root for major scale (in semitones)
const MAJOR_SCALE_INTERVALS = [0, 2, 4, 5, 7, 9, 11];
// Intervals from root for natural minor scale
const MINOR_SCALE_INTERVALS = [0, 2, 3, 5, 7, 8, 10];

// Chord qualities for each scale degree
const MAJOR_CHORD_QUALITIES = ['', 'm', 'm', '', '', 'm', 'dim'];
const MINOR_CHORD_QUALITIES = ['m', 'dim', '', 'm', 'm', '', ''];

// Roman numerals for scale degrees
const MAJOR_NUMERALS = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
const MINOR_NUMERALS = ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'];

export function normalizeKey(key: string): string {
  return ENHARMONIC_MAP[key] || key;
}

export function getNoteIndex(note: string): number {
  const normalized = normalizeKey(note);
  return NOTES.indexOf(normalized);
}

export function transposeNote(note: string, semitones: number): string {
  const index = getNoteIndex(note);
  if (index === -1) return note;
  const newIndex = (index + semitones + 12) % 12;
  return NOTES[newIndex];
}

export function getScaleNotes(root: MusicalKey, mode: Mode): string[] {
  const intervals = mode === 'major' ? MAJOR_SCALE_INTERVALS : MINOR_SCALE_INTERVALS;
  const rootIndex = getNoteIndex(root);

  return intervals.map(interval => {
    const noteIndex = (rootIndex + interval) % 12;
    return NOTES[noteIndex];
  });
}

export function getChordsInKey(root: MusicalKey, mode: Mode): { note: string; quality: string; numeral: string; function: string }[] {
  const scaleNotes = getScaleNotes(root, mode);
  const qualities = mode === 'major' ? MAJOR_CHORD_QUALITIES : MINOR_CHORD_QUALITIES;
  const numerals = mode === 'major' ? MAJOR_NUMERALS : MINOR_NUMERALS;

  const functions = mode === 'major'
    ? ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Leading Tone']
    : ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Subtonic'];

  return scaleNotes.map((note, index) => ({
    note,
    quality: qualities[index],
    numeral: numerals[index],
    function: functions[index],
  }));
}

export function translateProgressionToKey(
  numerals: string[],
  root: MusicalKey,
  mode: Mode
): string[] {
  const scaleNotes = getScaleNotes(root, mode);

  const numeralMap: Record<string, { index: number; quality: string }> = {
    // Major chords (uppercase)
    'I': { index: 0, quality: '' },
    'II': { index: 1, quality: '' },
    'III': { index: 2, quality: '' },
    'IV': { index: 3, quality: '' },
    'V': { index: 4, quality: '' },
    'VI': { index: 5, quality: '' },
    'VII': { index: 6, quality: '' },
    // Minor chords (lowercase)
    'i': { index: 0, quality: 'm' },
    'ii': { index: 1, quality: 'm' },
    'iii': { index: 2, quality: 'm' },
    'iv': { index: 3, quality: 'm' },
    'v': { index: 4, quality: 'm' },
    'vi': { index: 5, quality: 'm' },
    'vii': { index: 6, quality: 'm' },
    // Diminished chords
    'ii°': { index: 1, quality: 'dim' },
    'vii°': { index: 6, quality: 'dim' },
    // Flat numerals (borrowed chords)
    'bII': { index: 1, quality: '' },
    'bIII': { index: 2, quality: '' },
    'bVI': { index: 5, quality: '' },
    'bVII': { index: 6, quality: '' },
    'biii': { index: 2, quality: 'm' },
    'bvi': { index: 5, quality: 'm' },
    'bvii': { index: 6, quality: 'm' },
  };

  return numerals.map(numeral => {
    // Handle numerals with modifications (like V7, IV/V, etc.)
    const baseNumeral = numeral.replace(/[0-9/]+$/, '');
    const suffix = numeral.slice(baseNumeral.length);

    const mapping = numeralMap[baseNumeral];
    if (!mapping) return numeral;

    let note = scaleNotes[mapping.index];

    // Handle flat numerals - lower the note by a half step
    if (baseNumeral.startsWith('b')) {
      note = transposeNote(note, -1);
    }

    return note + mapping.quality + suffix;
  });
}

export function formatChord(note: string, quality: string): string {
  return `${note}${quality}`;
}

export const ALL_KEYS: MusicalKey[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const DISPLAY_KEYS: { value: MusicalKey; label: string }[] = [
  { value: 'C', label: 'C' },
  { value: 'C#', label: 'C# / Db' },
  { value: 'D', label: 'D' },
  { value: 'D#', label: 'D# / Eb' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
  { value: 'F#', label: 'F# / Gb' },
  { value: 'G', label: 'G' },
  { value: 'G#', label: 'G# / Ab' },
  { value: 'A', label: 'A' },
  { value: 'A#', label: 'A# / Bb' },
  { value: 'B', label: 'B' },
];
