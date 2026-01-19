import { useState, useMemo } from 'react';
import { KeySelector } from '../components/KeySelector';
import { ProgressionCard } from '../components/ProgressionCard';
import { MoodFilter } from '../components/MoodFilter';
import { getProgressionsByKeyType } from '../data/progressions';
import type { MusicalKey, Mode } from '../types';

export function Progressions() {
  const [selectedKey, setSelectedKey] = useState<MusicalKey>('C');
  const [selectedMode, setSelectedMode] = useState<Mode>('major');
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Get progressions for the selected mode
  const modeProgressions = useMemo(() => {
    return getProgressionsByKeyType(selectedMode);
  }, [selectedMode]);

  // Extract unique moods from mode-filtered progressions
  const allMoods = useMemo(() => {
    const moodSet = new Set<string>();
    modeProgressions.forEach((p) => p.moods.forEach((m) => moodSet.add(m)));
    return Array.from(moodSet).sort();
  }, [modeProgressions]);

  // Filter progressions
  const filteredProgressions = useMemo(() => {
    return modeProgressions.filter((progression) => {
      // Filter by mood
      if (selectedMoods.length > 0) {
        const hasMatchingMood = selectedMoods.some((mood) =>
          progression.moods.some((m) => m.toLowerCase() === mood.toLowerCase())
        );
        if (!hasMatchingMood) return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = progression.name.toLowerCase().includes(query);
        const matchesDescription = progression.description.toLowerCase().includes(query);
        const matchesSong = progression.famousSongs.some((s) =>
          s.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesDescription && !matchesSong) return false;
      }

      return true;
    });
  }, [modeProgressions, selectedMoods, searchQuery]);

  const handleMoodToggle = (mood: string) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Chord Progressions
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore common chord progressions and see which famous songs use them.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <KeySelector
            selectedKey={selectedKey}
            selectedMode={selectedMode}
            onKeyChange={setSelectedKey}
            onModeChange={setSelectedMode}
          />
          <div className="flex-1">
            <label
              htmlFor="search"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search progressions or songs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <MoodFilter
          moods={allMoods}
          selectedMoods={selectedMoods}
          onMoodToggle={handleMoodToggle}
        />
      </div>

      {/* Results */}
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Showing {filteredProgressions.length} of {modeProgressions.length} {selectedMode} progressions
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProgressions.map((progression) => (
            <ProgressionCard
              key={progression.id}
              progression={progression}
              selectedKey={selectedKey}
              selectedMode={selectedMode}
            />
          ))}
        </div>

        {filteredProgressions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No progressions match your filters.
            </p>
            <button
              onClick={() => {
                setSelectedMoods([]);
                setSearchQuery('');
              }}
              className="mt-2 text-primary-600 dark:text-primary-400 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
