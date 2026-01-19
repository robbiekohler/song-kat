import * as Tone from 'tone';

// Voicing styles inspired by different guitar techniques
export type VoicingStyle =
  | 'standard'    // Full chord voicings
  | 'power'       // Root + 5th (punk/rock)
  | 'octave'      // Root + octave (Billy Corgan/Smashing Pumpkins)
  | 'sus2'        // Suspended 2nd (dreamy, ambiguous)
  | 'sus4'        // Suspended 4th (tension, U2 style)
  | 'fifth_octave' // Root + 5th + octave (thick rock sound)
  | 'open'        // Open/jangly with added notes

export const VOICING_INFO: Record<VoicingStyle, { name: string; description: string; artists: string }> = {
  standard: {
    name: 'Standard',
    description: 'Full chord voicings with 3rd included',
    artists: 'Most pop/rock songs',
  },
  power: {
    name: 'Power Chord',
    description: 'Root + 5th only. No major/minor quality - fits anywhere',
    artists: 'Green Day, Nirvana, punk rock',
  },
  octave: {
    name: 'Octave',
    description: 'Root + octave. Clean, cutting, melodic. Billy Corgan signature',
    artists: 'Smashing Pumpkins, Weezer',
  },
  sus2: {
    name: 'Sus2',
    description: 'Replace 3rd with 2nd. Dreamy, open, ambiguous feel',
    artists: 'The Police, Smashing Pumpkins, post-rock',
  },
  sus4: {
    name: 'Sus4',
    description: 'Replace 3rd with 4th. Tension that wants to resolve',
    artists: 'The Who, U2, Tom Petty',
  },
  fifth_octave: {
    name: '5th + Octave',
    description: 'Root + 5th + octave. Thick, powerful rock sound',
    artists: 'Foo Fighters, Queens of the Stone Age',
  },
  open: {
    name: 'Open/Add9',
    description: 'Chord with added 9th for jangly, open sound',
    artists: 'R.E.M., The Smiths, indie rock',
  },
};

// Note mappings for all 12 roots
const ROOT_NOTES: Record<string, number> = {
  'C': 0, 'C#': 1, 'Db': 1,
  'D': 2, 'D#': 3, 'Eb': 3,
  'E': 4,
  'F': 5, 'F#': 6, 'Gb': 6,
  'G': 7, 'G#': 8, 'Ab': 8,
  'A': 9, 'A#': 10, 'Bb': 10,
  'B': 11,
};

// Intervals for different chord types (in semitones from root)
const CHORD_INTERVALS: Record<string, number[]> = {
  '': [0, 4, 7],           // Major
  'm': [0, 3, 7],          // Minor
  'dim': [0, 3, 6],        // Diminished
  'aug': [0, 4, 8],        // Augmented
  '7': [0, 4, 7, 10],      // Dominant 7
  'maj7': [0, 4, 7, 11],   // Major 7
  'm7': [0, 3, 7, 10],     // Minor 7
  'dim7': [0, 3, 6, 9],    // Diminished 7
  'sus2': [0, 2, 7],       // Suspended 2
  'sus4': [0, 5, 7],       // Suspended 4
  'add9': [0, 4, 7, 14],   // Add 9
  '6': [0, 4, 7, 9],       // Major 6
  'm6': [0, 3, 7, 9],      // Minor 6
};

// Alternative voicing intervals based on style
const VOICING_INTERVALS: Record<VoicingStyle, (quality: string) => number[]> = {
  standard: (quality) => CHORD_INTERVALS[quality] || CHORD_INTERVALS[''],
  power: () => [0, 7],                    // Root + 5th
  octave: () => [0, 12],                  // Root + octave
  sus2: () => [0, 2, 7],                  // Root + 2nd + 5th
  sus4: () => [0, 5, 7],                  // Root + 4th + 5th
  fifth_octave: () => [0, 7, 12],         // Root + 5th + octave
  open: (quality) => {
    // Add 9 to the chord
    const base = quality === 'm' ? [0, 3, 7] : [0, 4, 7];
    return [...base, 14]; // Add 9th
  },
};

// Convert semitone offset to note name
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function midiToNoteName(midi: number): string {
  const octave = Math.floor(midi / 12) - 1;
  const noteIndex = midi % 12;
  return `${NOTES[noteIndex]}${octave}`;
}

// Parse chord name into root and quality
function parseChord(chordName: string): { root: string; quality: string } | null {
  // Match root note (with optional sharp/flat) and quality
  const match = chordName.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return null;

  const root = match[1];
  let quality = match[2];

  // Normalize quality
  if (quality === 'M' || quality === 'maj') quality = '';
  if (quality === 'min' || quality === 'minor') quality = 'm';

  return { root, quality };
}

// Get MIDI notes for a chord with optional voicing style
export function getChordNotes(
  chordName: string,
  octave: number = 3,
  voicing: VoicingStyle = 'standard'
): number[] {
  const parsed = parseChord(chordName);
  if (!parsed) return [];

  const { root, quality } = parsed;
  const rootMidi = ROOT_NOTES[root];
  if (rootMidi === undefined) return [];

  // Get intervals based on voicing style
  const intervals = VOICING_INTERVALS[voicing](quality);
  const baseMidi = 12 * (octave + 1) + rootMidi; // MIDI note number

  return intervals.map(interval => baseMidi + interval);
}

// Get note names for a chord (for Tone.js)
export function getChordNoteNames(
  chordName: string,
  octave: number = 3,
  voicing: VoicingStyle = 'standard'
): string[] {
  const midiNotes = getChordNotes(chordName, octave, voicing);
  return midiNotes.map(midiToNoteName);
}

// Chord Player class
export class ChordProgressionPlayer {
  private synth: Tone.PolySynth | null = null;
  private sequence: Tone.Sequence | null = null;
  private isPlaying: boolean = false;
  private currentChordIndex: number = 0;
  private onChordChange?: (index: number) => void;

  constructor() {
    // Synth will be created on first play (due to audio context restrictions)
  }

  private initSynth() {
    if (this.synth) return;

    this.synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: 'triangle',
      },
      envelope: {
        attack: 0.02,
        decay: 0.3,
        sustain: 0.4,
        release: 0.8,
      },
    }).toDestination();

    this.synth.volume.value = -6; // Reduce volume a bit
  }

  async play(
    chords: string[],
    bpm: number = 120,
    beatsPerChord: number = 4,
    onChordChange?: (index: number) => void,
    voicing: VoicingStyle = 'standard'
  ): Promise<void> {
    // Initialize audio context (must be triggered by user action)
    await Tone.start();

    this.initSynth();
    if (!this.synth) return;

    this.onChordChange = onChordChange;

    // Stop any existing playback
    this.stop();

    // Set tempo
    Tone.getTransport().bpm.value = bpm;

    // Create sequence with the selected voicing
    const chordNotes = chords.map(chord => getChordNoteNames(chord, 3, voicing));

    this.sequence = new Tone.Sequence(
      (time, index) => {
        // Release previous notes
        this.synth?.releaseAll(time);

        // Play new chord
        const notes = chordNotes[index as number];
        if (notes.length > 0) {
          this.synth?.triggerAttack(notes, time);
        }

        // Update current chord index
        this.currentChordIndex = index as number;

        // Callback for UI update (schedule slightly after to ensure state updates)
        if (this.onChordChange) {
          Tone.getDraw().schedule(() => {
            this.onChordChange?.(index as number);
          }, time);
        }
      },
      Array.from({ length: chords.length }, (_, i) => i),
      `${beatsPerChord}n`
    );

    this.sequence.loop = true;
    this.sequence.start(0);

    Tone.getTransport().start();
    this.isPlaying = true;
  }

  stop(): void {
    if (this.sequence) {
      this.sequence.stop();
      this.sequence.dispose();
      this.sequence = null;
    }

    this.synth?.releaseAll();
    Tone.getTransport().stop();
    Tone.getTransport().position = 0;

    this.isPlaying = false;
    this.currentChordIndex = 0;
  }

  pause(): void {
    if (this.isPlaying) {
      Tone.getTransport().pause();
      this.synth?.releaseAll();
      this.isPlaying = false;
    }
  }

  resume(): void {
    if (!this.isPlaying && this.sequence) {
      Tone.getTransport().start();
      this.isPlaying = true;
    }
  }

  setTempo(bpm: number): void {
    Tone.getTransport().bpm.value = bpm;
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  getCurrentChordIndex(): number {
    return this.currentChordIndex;
  }

  dispose(): void {
    this.stop();
    if (this.synth) {
      this.synth.dispose();
      this.synth = null;
    }
  }
}

// Singleton instance for app-wide use
let playerInstance: ChordProgressionPlayer | null = null;

export function getPlayer(): ChordProgressionPlayer {
  if (!playerInstance) {
    playerInstance = new ChordProgressionPlayer();
  }
  return playerInstance;
}
