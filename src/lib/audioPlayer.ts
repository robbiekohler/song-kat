import * as Tone from 'tone';

// ============ DRUM MACHINE ============

export type DrumPattern = 'none' | 'rock' | 'pop' | 'ballad' | 'shuffle' | 'metronome';

export const DRUM_PATTERN_INFO: Record<DrumPattern, { name: string; description: string }> = {
  none: { name: 'No Drums', description: 'Chords only' },
  rock: { name: 'Rock', description: 'Classic kick-snare pattern' },
  pop: { name: 'Pop', description: 'Four on the floor with hi-hats' },
  ballad: { name: 'Ballad', description: 'Soft, half-time feel' },
  shuffle: { name: 'Shuffle', description: 'Swing triplet feel' },
  metronome: { name: 'Click', description: 'Simple metronome click' },
};

// Drum hit patterns - 16 steps per bar (16th notes)
// K = kick, S = snare, H = hi-hat closed, O = hi-hat open, . = rest
const DRUM_PATTERNS: Record<Exclude<DrumPattern, 'none'>, { kick: string; snare: string; hihat: string }> = {
  rock: {
    kick:  'x...x...x...x...',
    snare: '....x.......x...',
    hihat: 'x.x.x.x.x.x.x.x.',
  },
  pop: {
    kick:  'x...x...x...x...',
    snare: '....x.......x...',
    hihat: 'xxxxxxxxxxxxxxxx',
  },
  ballad: {
    kick:  'x.......x.......',
    snare: '........x.......',
    hihat: 'x...x...x...x...',
  },
  shuffle: {
    kick:  'x..x..x..x..x..x',
    snare: '...x.....x.....x',
    hihat: 'x.xx.xx.xx.xx.x.',
  },
  metronome: {
    kick:  'x...x...x...x...',
    snare: '................',
    hihat: '................',
  },
};

class DrumMachine {
  private kick: Tone.MembraneSynth | null = null;
  private snare: Tone.NoiseSynth | null = null;
  private hihat: Tone.MetalSynth | null = null;
  private sequence: Tone.Sequence | null = null;
  private pattern: DrumPattern = 'none';
  private isInitialized = false;

  async init() {
    if (this.isInitialized) return;

    // Kick drum - deep, punchy
    this.kick = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 6,
      oscillator: { type: 'sine' },
      envelope: {
        attack: 0.001,
        decay: 0.4,
        sustain: 0.01,
        release: 0.4,
      },
    }).toDestination();
    this.kick.volume.value = -6;

    // Snare - noise-based with some tone
    this.snare = new Tone.NoiseSynth({
      noise: { type: 'white' },
      envelope: {
        attack: 0.001,
        decay: 0.2,
        sustain: 0,
        release: 0.1,
      },
    }).toDestination();
    this.snare.volume.value = -10;

    // Hi-hat - metallic
    this.hihat = new Tone.MetalSynth({
      envelope: {
        attack: 0.001,
        decay: 0.05,
        release: 0.01,
      },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5,
    }).toDestination();
    this.hihat.volume.value = -18;

    this.isInitialized = true;
  }

  setPattern(pattern: DrumPattern) {
    this.pattern = pattern;
  }

  start(beatsPerChord: number = 4) {
    if (this.pattern === 'none' || !this.isInitialized) return;

    this.stop();

    const patternData = DRUM_PATTERNS[this.pattern];
    const steps = 16; // 16th notes per bar

    // Create a sequence that plays through the pattern
    this.sequence = new Tone.Sequence(
      (time, step) => {
        const idx = step % steps;

        if (patternData.kick[idx] === 'x') {
          this.kick?.triggerAttackRelease('C1', '8n', time);
        }
        if (patternData.snare[idx] === 'x') {
          this.snare?.triggerAttackRelease('8n', time);
        }
        if (patternData.hihat[idx] === 'x') {
          this.hihat?.triggerAttackRelease('C6', '32n', time);
        }
      },
      Array.from({ length: steps * beatsPerChord }, (_, i) => i),
      '16n'
    );

    this.sequence.loop = true;
    this.sequence.start(0);
  }

  stop() {
    if (this.sequence) {
      this.sequence.stop();
      this.sequence.dispose();
      this.sequence = null;
    }
  }

  dispose() {
    this.stop();
    this.kick?.dispose();
    this.snare?.dispose();
    this.hihat?.dispose();
    this.kick = null;
    this.snare = null;
    this.hihat = null;
    this.isInitialized = false;
  }
}

// Singleton drum machine
let drumMachineInstance: DrumMachine | null = null;

export function getDrumMachine(): DrumMachine {
  if (!drumMachineInstance) {
    drumMachineInstance = new DrumMachine();
  }
  return drumMachineInstance;
}

// ============ VOICING STYLES ============

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
// Instrument types
export type InstrumentType =
  | 'piano'
  | 'electric_piano'
  | 'acoustic_guitar'
  | 'clean_guitar'
  | 'organ'
  | 'synth_pad'
  | 'strings'
  | 'bell';

export const INSTRUMENT_INFO: Record<InstrumentType, { name: string; description: string }> = {
  piano: { name: 'Piano', description: 'Warm acoustic piano sound' },
  electric_piano: { name: 'Electric Piano', description: 'Rhodes-style electric piano' },
  acoustic_guitar: { name: 'Acoustic Guitar', description: 'Nylon string guitar feel' },
  clean_guitar: { name: 'Clean Electric', description: 'Clean electric guitar tone' },
  organ: { name: 'Organ', description: 'Classic rock organ sound' },
  synth_pad: { name: 'Synth Pad', description: 'Lush synthesizer pad' },
  strings: { name: 'Strings', description: 'Orchestral string ensemble' },
  bell: { name: 'Bell/Chime', description: 'Bright bell-like tones' },
};

// Instrument configurations
function createInstrumentSynth(type: InstrumentType): Tone.PolySynth {
  switch (type) {
    case 'piano':
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'triangle8' },
        envelope: {
          attack: 0.005,
          decay: 0.4,
          sustain: 0.2,
          release: 1.2,
        },
      });

    case 'electric_piano':
      return new Tone.PolySynth(Tone.FMSynth, {
        harmonicity: 3.01,
        modulationIndex: 14,
        oscillator: { type: 'sine' },
        envelope: {
          attack: 0.002,
          decay: 0.5,
          sustain: 0.1,
          release: 1.0,
        },
        modulation: { type: 'square' },
        modulationEnvelope: {
          attack: 0.002,
          decay: 0.2,
          sustain: 0,
          release: 0.2,
        },
      });

    case 'acoustic_guitar':
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'fmtriangle', modulationType: 'sine', modulationIndex: 2, harmonicity: 1.5 },
        envelope: {
          attack: 0.01,
          decay: 0.3,
          sustain: 0.1,
          release: 0.8,
        },
      });

    case 'clean_guitar':
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'fatsawtooth', count: 2, spread: 10 },
        envelope: {
          attack: 0.01,
          decay: 0.2,
          sustain: 0.3,
          release: 0.6,
        },
      });

    case 'organ':
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sine4' },  // Organ-like with harmonics
        envelope: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0.9,
          release: 0.3,
        },
      });

    case 'synth_pad':
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'fatsawtooth', count: 3, spread: 30 },
        envelope: {
          attack: 0.4,
          decay: 0.3,
          sustain: 0.8,
          release: 2.0,
        },
      });

    case 'strings':
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'fatsawtooth', count: 4, spread: 20 },
        envelope: {
          attack: 0.3,
          decay: 0.2,
          sustain: 0.7,
          release: 1.5,
        },
      });

    case 'bell':
      return new Tone.PolySynth(Tone.FMSynth, {
        harmonicity: 5.1,
        modulationIndex: 3,
        oscillator: { type: 'sine' },
        envelope: {
          attack: 0.001,
          decay: 1.5,
          sustain: 0,
          release: 2.0,
        },
        modulation: { type: 'sine' },
        modulationEnvelope: {
          attack: 0.001,
          decay: 0.5,
          sustain: 0,
          release: 0.5,
        },
      });

    default:
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'triangle' },
        envelope: {
          attack: 0.02,
          decay: 0.3,
          sustain: 0.4,
          release: 0.8,
        },
      });
  }
}

export class ChordProgressionPlayer {
  private synth: Tone.PolySynth | null = null;
  private sequence: Tone.Sequence | null = null;
  private reverb: Tone.Reverb | null = null;
  private chorus: Tone.Chorus | null = null;
  private isPlaying: boolean = false;
  private currentChordIndex: number = 0;
  private onChordChange?: (index: number) => void;
  private currentInstrument: InstrumentType = 'piano';
  private drumMachine: DrumMachine;

  constructor() {
    // Synth will be created on first play (due to audio context restrictions)
    this.drumMachine = getDrumMachine();
  }

  private async initSynth(instrument: InstrumentType) {
    // Dispose existing synth if changing instruments
    if (this.synth && this.currentInstrument !== instrument) {
      this.synth.dispose();
      this.synth = null;
    }

    if (this.synth) return;

    // Create effects chain
    if (!this.reverb) {
      this.reverb = new Tone.Reverb({
        decay: 2.5,
        wet: 0.3,
      });
      await this.reverb.generate();
    }

    if (!this.chorus) {
      this.chorus = new Tone.Chorus({
        frequency: 1.5,
        delayTime: 3.5,
        depth: 0.7,
        wet: 0.3,
      }).start();
    }

    // Create synth based on instrument type
    this.synth = createInstrumentSynth(instrument);
    this.currentInstrument = instrument;

    // Set up effects chain based on instrument
    if (instrument === 'synth_pad' || instrument === 'strings') {
      this.reverb.wet.value = 0.5;
      this.chorus.wet.value = 0.4;
      this.synth.chain(this.chorus, this.reverb, Tone.getDestination());
    } else if (instrument === 'electric_piano' || instrument === 'organ') {
      this.reverb.wet.value = 0.25;
      this.chorus.wet.value = 0.3;
      this.synth.chain(this.chorus, this.reverb, Tone.getDestination());
    } else if (instrument === 'bell') {
      this.reverb.wet.value = 0.6;
      this.synth.connect(this.reverb);
      this.reverb.toDestination();
    } else {
      this.reverb.wet.value = 0.2;
      this.synth.connect(this.reverb);
      this.reverb.toDestination();
    }

    // Set volume
    this.synth.volume.value = -8;
  }

  async play(
    chords: string[],
    bpm: number = 120,
    beatsPerChord: number = 4,
    onChordChange?: (index: number) => void,
    voicing: VoicingStyle = 'standard',
    instrument: InstrumentType = 'piano',
    drumPattern: DrumPattern = 'none'
  ): Promise<void> {
    // Initialize audio context (must be triggered by user action)
    await Tone.start();

    await this.initSynth(instrument);
    if (!this.synth) return;

    // Initialize drum machine
    await this.drumMachine.init();
    this.drumMachine.setPattern(drumPattern);

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

    // Start drums (will only play if pattern is not 'none')
    this.drumMachine.start(beatsPerChord);

    Tone.getTransport().start();
    this.isPlaying = true;
  }

  stop(): void {
    // Stop drums
    this.drumMachine.stop();

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
