import { useState } from 'react';
import { ChordProgression, MusicalKey, Mode } from '../types';
import { translateProgressionToKey } from '../lib/chordUtils';
import { GuitarChord } from './GuitarChord';
import { ChordPlayer } from './ChordPlayer';
import { VoicingStyle } from '../lib/audioPlayer';

interface ProgressionCardProps {
  progression: ChordProgression;
  selectedKey: MusicalKey;
  selectedMode: Mode;
  onSave?: () => void;
  showSaveButton?: boolean;
}

// Transform chord names based on voicing style
function applyVoicingToChord(chord: string, voicing: VoicingStyle): string {
  // Extract root note
  const match = chord.match(/^([A-G][#b]?)(.*)?$/);
  if (!match) return chord;

  const root = match[1];

  // For standard and open voicings, keep the original chord
  if (voicing === 'standard' || voicing === 'open') {
    return chord;
  }

  // For power chords, just show the root (power chords have no major/minor quality)
  if (voicing === 'power' || voicing === 'octave' || voicing === 'fifth_octave') {
    return `${root}5`; // Power chord notation
  }

  // For sus2 and sus4, replace the quality
  if (voicing === 'sus2') {
    return `${root}sus2`;
  }
  if (voicing === 'sus4') {
    return `${root}sus4`;
  }

  return chord;
}

export function ProgressionCard({
  progression,
  selectedKey,
  selectedMode,
  onSave,
  showSaveButton = false,
}: ProgressionCardProps) {
  const [showGuitar, setShowGuitar] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showAllSongs, setShowAllSongs] = useState(false);
  const [voicing, setVoicing] = useState<VoicingStyle>('standard');

  const translatedChords = translateProgressionToKey(
    progression.numerals,
    selectedKey,
    selectedMode
  );

  // Get chord names for guitar diagrams based on voicing
  const guitarChordNames = translatedChords.map(chord => applyVoicingToChord(chord, voicing));

  const moodColors: Record<string, string> = {
    happy: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    sad: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    epic: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    chill: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    dramatic: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    uplifting: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    melancholic: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    energetic: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    romantic: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {progression.name}
        </h3>
        <div className="flex items-center gap-2">
          {/* Play button */}
          <button
            onClick={() => setShowPlayer(!showPlayer)}
            className={`p-1.5 rounded-lg transition-colors ${
              showPlayer
                ? 'bg-green-500 text-white'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title={showPlayer ? 'Hide player' : 'Play progression'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </button>
          {/* Guitar button */}
          <button
            onClick={() => setShowGuitar(!showGuitar)}
            className={`p-1.5 rounded-lg transition-colors ${
              showGuitar
                ? 'bg-primary-500 text-white'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title={showGuitar ? 'Hide guitar chords' : 'Show guitar chords'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <ellipse cx="12" cy="12" rx="3" ry="5" />
              <line x1="12" y1="7" x2="12" y2="17" />
            </svg>
          </button>
          {showSaveButton && onSave && (
            <button
              onClick={onSave}
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              title="Save to my songs"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {translatedChords.map((chord, index) => (
            <span
              key={index}
              className="inline-flex items-center justify-center px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-lg font-semibold text-lg"
            >
              {chord}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          In {selectedKey} {selectedMode}
        </div>
      </div>

      {/* Audio Player */}
      {showPlayer && (
        <ChordPlayer
          chords={translatedChords}
          voicing={voicing}
          onVoicingChange={setVoicing}
          className="mb-4"
        />
      )}

      {/* Guitar chord diagrams */}
      {showGuitar && (
        <div className="mb-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          {voicing !== 'standard' && (
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-3">
              Showing {voicing === 'power' || voicing === 'octave' || voicing === 'fifth_octave' ? 'power chord' : voicing} shapes
            </p>
          )}
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center overflow-x-auto">
            {guitarChordNames.map((chord, index) => (
              <GuitarChord key={`${chord}-${index}-${voicing}`} chord={chord} size="sm" />
            ))}
          </div>
          <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-2 sm:hidden">
            Tap chord name for alternate voicings
          </p>
        </div>
      )}

      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
        {progression.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {progression.moods.slice(0, 4).map((mood) => (
          <span
            key={mood}
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              moodColors[mood.toLowerCase()] || moodColors.default
            }`}
          >
            {mood}
          </span>
        ))}
      </div>

      {progression.famousSongs.length > 0 && (
        <div className="border-t dark:border-gray-700 pt-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Famous Songs
          </h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            {(showAllSongs ? progression.famousSongs : progression.famousSongs.slice(0, 3)).map((song) => (
              <li key={song}>{song}</li>
            ))}
            {progression.famousSongs.length > 3 && (
              <li>
                <button
                  onClick={() => setShowAllSongs(!showAllSongs)}
                  className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 hover:underline"
                >
                  {showAllSongs ? 'Show less' : `+${progression.famousSongs.length - 3} more`}
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
