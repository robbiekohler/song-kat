import { useState } from 'react';
import { MusicalKey, Mode } from '../types';
import { getChordsInKey } from '../lib/chordUtils';
import { GuitarChord } from './GuitarChord';

interface ChordDisplayProps {
  selectedKey: MusicalKey;
  selectedMode: Mode;
}

export function ChordDisplay({ selectedKey, selectedMode }: ChordDisplayProps) {
  const [showGuitar, setShowGuitar] = useState(false);
  const chords = getChordsInKey(selectedKey, selectedMode);

  const getFunctionColor = (func: string) => {
    switch (func) {
      case 'Tonic':
        return 'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700';
      case 'Dominant':
        return 'bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700';
      case 'Subdominant':
        return 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700';
      default:
        return 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Chords in {selectedKey} {selectedMode === 'major' ? 'Major' : 'Minor'}
        </h3>
        <button
          onClick={() => setShowGuitar(!showGuitar)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            showGuitar
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            <ellipse cx="12" cy="12" rx="3" ry="5" />
            <line x1="12" y1="7" x2="12" y2="17" />
            <line x1="9" y1="9" x2="15" y2="9" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
          {showGuitar ? 'Hide Guitar' : 'Show Guitar'}
        </button>
      </div>

      <div className={`grid gap-3 ${showGuitar ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7' : 'grid-cols-2 sm:grid-cols-4 md:grid-cols-7'}`}>
        {chords.map((chord) => (
          <div
            key={chord.numeral}
            className={`p-4 rounded-lg border-2 ${getFunctionColor(chord.function)} transition-transform hover:scale-105`}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {chord.note}{chord.quality}
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">
                {chord.numeral}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {chord.function}
              </div>
              {showGuitar && (
                <div className="mt-3 flex justify-center">
                  <GuitarChord
                    chord={`${chord.note}${chord.quality}`}
                    size="sm"
                    showName={false}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700"></div>
          <span className="text-gray-600 dark:text-gray-400">Tonic (home)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700"></div>
          <span className="text-gray-600 dark:text-gray-400">Subdominant (builds)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700"></div>
          <span className="text-gray-600 dark:text-gray-400">Dominant (tension)</span>
        </div>
      </div>
    </div>
  );
}
