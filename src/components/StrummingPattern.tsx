import type { StrummingPattern as StrummingPatternType } from '../types';

interface StrummingPatternProps {
  pattern: StrummingPatternType;
}

export function StrummingPattern({ pattern }: StrummingPatternProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStrokeDisplay = (stroke: string, index: number) => {
    const isDownbeat = index % 2 === 0;
    const beatNumber = Math.floor(index / 2) + 1;

    return (
      <div key={index} className="flex flex-col items-center">
        {/* Arrow / symbol */}
        <div className={`w-10 h-12 flex items-center justify-center text-lg font-bold rounded-lg ${
          stroke === 'D'
            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
            : stroke === 'U'
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
            : stroke === 'x'
            ? 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600'
        }`}>
          {stroke === 'D' && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          )}
          {stroke === 'U' && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          )}
          {stroke === 'x' && <span className="text-xl">x</span>}
          {stroke === '-' && <span className="text-xl">-</span>}
        </div>

        {/* Beat label */}
        <span className={`text-xs mt-1 ${
          isDownbeat
            ? 'font-bold text-gray-700 dark:text-gray-300'
            : 'text-gray-400 dark:text-gray-600'
        }`}>
          {isDownbeat ? beatNumber : '&'}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {pattern.name}
        </h3>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(pattern.difficulty)}`}>
          {pattern.difficulty}
        </span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {pattern.description}
      </p>

      {/* Visual pattern */}
      <div className="flex justify-center gap-1 mb-4">
        {pattern.pattern.map((stroke, i) => getStrokeDisplay(stroke, i))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded bg-primary-100 dark:bg-primary-900" /> Down
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded bg-blue-100 dark:bg-blue-900" /> Up
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded bg-orange-100 dark:bg-orange-900" /> Mute
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded bg-gray-100 dark:bg-gray-800" /> Rest
        </span>
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
          {pattern.bpmRange[0]}-{pattern.bpmRange[1]} BPM
        </span>
        {pattern.genres.map(genre => (
          <span key={genre} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
}
