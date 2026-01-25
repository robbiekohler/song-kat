import { useRef, useEffect, useState, useCallback } from 'react';
import * as Tone from 'tone';

interface PianoKeyboardProps {
  className?: string;
  startOctave?: number;
  octaves?: number;
}

// Note definitions
const WHITE_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const BLACK_KEYS = ['C#', 'D#', null, 'F#', 'G#', 'A#', null]; // null = no black key after E and B

// All notes in chromatic order for transposition
const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTE_TO_INDEX: Record<string, number> = {
  'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5,
  'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
};

// Transpose a note by semitones
function transposeNote(note: string, semitones: number): string {
  const match = note.match(/^([A-G][#b]?)(\d+)$/);
  if (!match) return note;

  const [, noteName, octaveStr] = match;
  let noteIndex = NOTE_TO_INDEX[noteName];
  let octave = parseInt(octaveStr);

  noteIndex += semitones;

  // Handle octave wrapping
  while (noteIndex < 0) {
    noteIndex += 12;
    octave--;
  }
  while (noteIndex >= 12) {
    noteIndex -= 12;
    octave++;
  }

  return `${ALL_NOTES[noteIndex]}${octave}`;
}

// Keyboard mapping - bottom row for white keys, top row for black keys
// A=G3, S=A3, D=B3, then continues up through ' = C5
const KEY_TO_NOTE: Record<string, string> = {
  // Bottom row - white keys from G3 to C5
  'a': 'G3', 's': 'A3', 'd': 'B3', 'f': 'C4', 'g': 'D4', 'h': 'E4', 'j': 'F4',
  'k': 'G4', 'l': 'A4', ';': 'B4', "'": 'C5',
  // Top row - black keys (using common flat/sharp notation)
  'w': 'G#3', 'e': 'Bb3', 't': 'C#4', 'y': 'Eb4', 'i': 'F#4', 'o': 'G#4', 'p': 'Bb4',
};

// Reverse mapping: note -> keyboard key
const NOTE_TO_KEY: Record<string, string> = Object.entries(KEY_TO_NOTE).reduce(
  (acc, [key, note]) => ({ ...acc, [note]: key.toUpperCase() }),
  {}
);

export function PianoKeyboard({
  className = '',
  startOctave = 3,
  octaves = 2
}: PianoKeyboardProps) {
  const synthRef = useRef<Tone.Synth | null>(null);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [transpose, setTranspose] = useState(0); // semitones to transpose

  const initSynth = useCallback(async () => {
    if (isInitialized) return true;

    await Tone.start();

    synthRef.current = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: {
        attack: 0.005,
        decay: 0.3,
        sustain: 0.4,
        release: 0.8,
      },
    }).toDestination();
    synthRef.current.volume.value = -6;

    setIsInitialized(true);
    return true;
  }, [isInitialized]);

  const playNote = useCallback(async (note: string) => {
    await initSynth();
    if (synthRef.current) {
      const transposedNote = transposeNote(note, transpose);
      synthRef.current.triggerAttackRelease(transposedNote, '8n');
      setActiveNote(note); // Keep visual highlight on original key
      setTimeout(() => setActiveNote(null), 200);
    }
  }, [initSynth, transpose]);

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toLowerCase();
      const note = KEY_TO_NOTE[key];

      if (note && !e.repeat) {
        e.preventDefault();
        playNote(note);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playNote]);

  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
      }
    };
  }, []);

  // Generate all keys for the specified octaves
  const keys: { note: string; isBlack: boolean; position: number }[] = [];
  let whiteKeyIndex = 0;

  for (let oct = startOctave; oct < startOctave + octaves; oct++) {
    WHITE_KEYS.forEach((note, i) => {
      // Add white key
      keys.push({
        note: `${note}${oct}`,
        isBlack: false,
        position: whiteKeyIndex,
      });

      // Add black key if exists
      const blackKey = BLACK_KEYS[i];
      if (blackKey) {
        keys.push({
          note: `${blackKey}${oct}`,
          isBlack: true,
          position: whiteKeyIndex,
        });
      }

      whiteKeyIndex++;
    });
  }

  // Add one more C at the end for a complete feel
  keys.push({
    note: `C${startOctave + octaves}`,
    isBlack: false,
    position: whiteKeyIndex,
  });

  const whiteKeys = keys.filter(k => !k.isBlack);
  const blackKeys = keys.filter(k => k.isBlack);
  const totalWhiteKeys = whiteKeys.length;

  // Get tuning label based on transpose value
  const getTuningLabel = (semitones: number): string => {
    if (semitones === 0) return 'Standard';
    if (semitones === -1) return 'Half step down (Eb)';
    if (semitones === -2) return 'Full step down (D)';
    if (semitones === -3) return 'Drop C#';
    if (semitones === -4) return 'Drop C';
    if (semitones === -5) return 'Drop B';
    if (semitones > 0) return `+${semitones} half steps`;
    return `${semitones} half steps`;
  };

  return (
    <div className={`bg-gray-100 dark:bg-gray-900 rounded-lg p-3 sm:p-4 ${className}`}>
      <div className="flex items-center justify-center gap-2 mb-3">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Keyboard
        </label>
        <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
          (use A-K keys or tap)
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">
          (tap to play)
        </span>
      </div>

      {/* Transpose controls */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <button
          onClick={() => setTranspose(t => Math.max(t - 1, -12))}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[32px]"
          title="Lower pitch by half step"
        >
          −
        </button>
        <div className="text-center min-w-[140px]">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {getTuningLabel(transpose)}
          </span>
        </div>
        <button
          onClick={() => setTranspose(t => Math.min(t + 1, 12))}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[32px]"
          title="Raise pitch by half step"
        >
          +
        </button>
        {transpose !== 0 && (
          <button
            onClick={() => setTranspose(0)}
            className="px-2 py-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 rounded text-xs text-gray-600 dark:text-gray-300"
            title="Reset to standard tuning"
          >
            Reset
          </button>
        )}
      </div>

      <div className="relative mx-auto overflow-x-auto">
        <div
          className="relative flex"
          style={{
            width: `${totalWhiteKeys * 36}px`,
            minWidth: `${totalWhiteKeys * 36}px`,
          }}
        >
          {/* White keys */}
          {whiteKeys.map((key) => {
            const shortcut = NOTE_TO_KEY[key.note];
            return (
              <button
                key={key.note}
                onClick={() => playNote(key.note)}
                className={`
                  relative flex flex-col items-center justify-end pb-1
                  w-9 h-28 sm:h-32
                  border border-gray-300 dark:border-gray-600
                  rounded-b-md
                  transition-colors duration-75
                  ${activeNote === key.note
                    ? 'bg-primary-200 dark:bg-primary-800'
                    : 'bg-white dark:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-100'
                  }
                `}
                style={{ zIndex: 1 }}
              >
                {shortcut && (
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 mb-1 hidden sm:block">
                    {shortcut}
                  </span>
                )}
                <span className="text-xs text-gray-500 dark:text-gray-600 font-medium">
                  {key.note.replace(/\d/, '')}
                </span>
              </button>
            );
          })}

          {/* Black keys - positioned absolutely */}
          {blackKeys.map((key) => (
            <button
              key={key.note}
              onClick={() => playNote(key.note)}
              className={`
                absolute top-0
                w-6 h-16 sm:h-20
                rounded-b-md
                transition-colors duration-75
                ${activeNote === key.note
                  ? 'bg-primary-600'
                  : 'bg-gray-800 dark:bg-gray-900 hover:bg-gray-700'
                }
              `}
              style={{
                left: `${(key.position + 1) * 36 - 12}px`,
                zIndex: 2,
              }}
            />
          ))}
        </div>
      </div>

      <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-3">
        Use this to find melody notes while the backing track plays
      </p>
    </div>
  );
}
