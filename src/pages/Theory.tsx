import { useState } from 'react';
import { theoryTips, scalePatterns } from '../data/musicTheory';

export function Theory() {
  const [expandedTip, setExpandedTip] = useState<string | null>(theoryTips[0].id);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Music Theory Tips
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Essential concepts to help you understand chord progressions.
        </p>
      </div>

      {/* Theory Tips Accordion */}
      <div className="space-y-3">
        {theoryTips.map((tip) => (
          <div
            key={tip.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden"
          >
            <button
              onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {tip.title}
              </h3>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  expandedTip === tip.id ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {expandedTip === tip.id && (
              <div className="px-6 pb-6">
                <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
                  {tip.content.split('\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <h4 key={idx} className="font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">
                          {paragraph.replace(/\*\*/g, '')}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith('- ')) {
                      return (
                        <li key={idx} className="ml-4">
                          {paragraph.slice(2)}
                        </li>
                      );
                    }
                    if (paragraph.trim()) {
                      return (
                        <p key={idx} className="mb-2">
                          {paragraph}
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Scale Patterns Reference */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Common Scale Patterns
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(scalePatterns).map(([name, scale]) => (
            <div
              key={name}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 capitalize mb-2">
                {name.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <div className="text-sm font-mono text-primary-600 dark:text-primary-400 mb-2">
                {scale.pattern}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {scale.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <p>W = Whole step (2 semitones), H = Half step (1 semitone), m3 = Minor 3rd (3 semitones), A = Augmented 2nd (3 semitones)</p>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Quick Reference</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Roman Numeral Notation</h3>
            <ul className="text-sm text-primary-100 space-y-1">
              <li>Uppercase (I, IV, V) = Major chords</li>
              <li>Lowercase (ii, iii, vi) = Minor chords</li>
              <li>° symbol (vii°) = Diminished chord</li>
              <li>b prefix (bVII) = Flatted chord</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Common Chord Extensions</h3>
            <ul className="text-sm text-primary-100 space-y-1">
              <li>7 = Add the 7th (G7, Cmaj7, Am7)</li>
              <li>sus4 = Replace 3rd with 4th</li>
              <li>sus2 = Replace 3rd with 2nd</li>
              <li>add9 = Add 9th without 7th</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
