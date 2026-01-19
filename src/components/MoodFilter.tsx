interface MoodFilterProps {
  moods: string[];
  selectedMoods: string[];
  onMoodToggle: (mood: string) => void;
}

const moodColors: Record<string, string> = {
  happy: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700',
  sad: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700',
  epic: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700',
  chill: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700',
  dramatic: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700',
  uplifting: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-700',
  melancholic: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-900 dark:text-indigo-200 dark:border-indigo-700',
  energetic: 'bg-pink-100 text-pink-800 border-pink-300 dark:bg-pink-900 dark:text-pink-200 dark:border-pink-700',
  romantic: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-900 dark:text-rose-200 dark:border-rose-700',
  jazz: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900 dark:text-amber-200 dark:border-amber-700',
  rock: 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600',
  classic: 'bg-stone-100 text-stone-800 border-stone-300 dark:bg-stone-700 dark:text-stone-200 dark:border-stone-600',
  pop: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300 dark:bg-fuchsia-900 dark:text-fuchsia-200 dark:border-fuchsia-700',
};

const defaultStyle = 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600';

export function MoodFilter({ moods, selectedMoods, onMoodToggle }: MoodFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Filter by mood/style
      </label>
      <div className="flex flex-wrap gap-2">
        {moods.map((mood) => {
          const isSelected = selectedMoods.includes(mood);
          const colorClass = moodColors[mood.toLowerCase()] || defaultStyle;

          return (
            <button
              key={mood}
              onClick={() => onMoodToggle(mood)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${
                isSelected
                  ? `${colorClass} ring-2 ring-offset-2 ring-primary-500 dark:ring-offset-gray-900`
                  : `${colorClass} opacity-60 hover:opacity-100`
              }`}
            >
              {mood}
            </button>
          );
        })}
      </div>
      {selectedMoods.length > 0 && (
        <button
          onClick={() => selectedMoods.forEach(onMoodToggle)}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
