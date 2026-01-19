import type { FamousSong } from '../types';
import { progressions } from '../data/progressions';

interface SongCardProps {
  song: FamousSong;
  onProgressionClick?: (progressionId: string) => void;
}

export function SongCard({ song, onProgressionClick }: SongCardProps) {
  const progression = progressions.find((p) => p.id === song.progressionId);

  const genreColors: Record<string, string> = {
    pop: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-200',
    rock: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    jazz: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    folk: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    blues: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    country: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'r&b': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    soul: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    indie: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
    classical: 'bg-stone-100 text-stone-800 dark:bg-stone-700 dark:text-stone-200',
    reggae: 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200',
    surf: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    'doo-wop': 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  };

  const getDecade = (year: number): string => {
    const decade = Math.floor(year / 10) * 10;
    return decade < 1900 ? 'Classical' : `${decade}s`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {song.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{song.artist}</p>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-500">
          {song.year}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span
          className={`px-2 py-0.5 rounded text-xs font-medium ${
            genreColors[song.genre.toLowerCase()] ||
            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
          }`}
        >
          {song.genre}
        </span>
        <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
          {getDecade(song.year)}
        </span>
        <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
          Key: {song.key}
        </span>
      </div>

      {progression && (
        <button
          onClick={() => onProgressionClick?.(song.progressionId)}
          className="w-full text-left p-2 bg-primary-50 dark:bg-primary-900/30 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
        >
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Progression
          </div>
          <div className="font-medium text-primary-700 dark:text-primary-300">
            {progression.name}
          </div>
        </button>
      )}

      <div className="flex flex-wrap gap-1 mt-3">
        {song.mood.map((m) => (
          <span
            key={m}
            className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
