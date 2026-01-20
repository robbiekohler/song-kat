import { useRef, useEffect, useState } from 'react';
import * as Tone from 'tone';

interface PianoKeyboardProps {
  className?: string;
  startOctave?: number;
  octaves?: number;
}

// Note definitions
const WHITE_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const BLACK_KEYS = ['C#', 'D#', null, 'F#', 'G#', 'A#', null]; // null = no black key after E and B

export function PianoKeyboard({
  className = '',
  startOctave = 3,
  octaves = 2
}: PianoKeyboardProps) {
  const synthRef = useRef<Tone.Synth | null>(null);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
      }
    };
  }, []);

  const initSynth = async () => {
    if (isInitialized) return;

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
  };

  const playNote = async (note: string) => {
    await initSynth();
    if (synthRef.current) {
      synthRef.current.triggerAttackRelease(note, '8n');
      setActiveNote(note);
      setTimeout(() => setActiveNote(null), 200);
    }
  };

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

  return (
    <div className={`bg-gray-100 dark:bg-gray-900 rounded-lg p-3 sm:p-4 ${className}`}>
      <div className="flex items-center justify-center gap-2 mb-3">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Keyboard
        </label>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          (tap to hear notes)
        </span>
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
          {whiteKeys.map((key) => (
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
              <span className="text-xs text-gray-500 dark:text-gray-600 font-medium">
                {key.note.replace(/\d/, '')}
              </span>
            </button>
          ))}

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
