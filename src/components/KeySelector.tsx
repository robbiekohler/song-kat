import { MusicalKey, Mode } from '../types';
import { DISPLAY_KEYS } from '../lib/chordUtils';

interface KeySelectorProps {
  selectedKey: MusicalKey;
  selectedMode: Mode;
  onKeyChange: (key: MusicalKey) => void;
  onModeChange: (mode: Mode) => void;
}

export function KeySelector({
  selectedKey,
  selectedMode,
  onKeyChange,
  onModeChange,
}: KeySelectorProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="key-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Key
        </label>
        <select
          id="key-select"
          value={selectedKey}
          onChange={(e) => onKeyChange(e.target.value as MusicalKey)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {DISPLAY_KEYS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Mode
        </label>
        <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          <button
            onClick={() => onModeChange('major')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedMode === 'major'
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Major
          </button>
          <button
            onClick={() => onModeChange('minor')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-300 dark:border-gray-600 ${
              selectedMode === 'minor'
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Minor
          </button>
        </div>
      </div>
    </div>
  );
}
