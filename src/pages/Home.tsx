import { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeySelector } from '../components/KeySelector';
import { ChordDisplay } from '../components/ChordDisplay';
import { ProgressionCard } from '../components/ProgressionCard';
import { getProgressionsByKeyType } from '../data/progressions';
import type { MusicalKey, Mode } from '../types';

export function Home() {
  const [selectedKey, setSelectedKey] = useState<MusicalKey>('C');
  const [selectedMode, setSelectedMode] = useState<Mode>('major');

  const featuredProgressions = getProgressionsByKeyType(selectedMode).slice(0, 4);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Learn Songwriting with Chord Progressions
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore common chord progressions, discover famous songs that use them,
          and build your songwriting skills.
        </p>
      </section>

      {/* Key Selector */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Select Your Key
        </h2>
        <KeySelector
          selectedKey={selectedKey}
          selectedMode={selectedMode}
          onKeyChange={setSelectedKey}
          onModeChange={setSelectedMode}
        />
        <div className="mt-8">
          <ChordDisplay selectedKey={selectedKey} selectedMode={selectedMode} />
        </div>
      </section>

      {/* Featured Progressions */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Popular Progressions
          </h2>
          <Link
            to="/progressions"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            View all
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredProgressions.map((progression) => (
            <ProgressionCard
              key={progression.id}
              progression={progression}
              selectedKey={selectedKey}
              selectedMode={selectedMode}
            />
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="grid md:grid-cols-3 gap-6">
        <Link
          to="/progressions"
          className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
        >
          <h3 className="text-xl font-bold mb-2">Browse Progressions</h3>
          <p className="text-primary-100">
            Explore 15+ common chord progressions with mood filters
          </p>
        </Link>
        <Link
          to="/songs"
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg"
        >
          <h3 className="text-xl font-bold mb-2">Famous Songs</h3>
          <p className="text-purple-100">
            Search 50+ songs and learn what progressions they use
          </p>
        </Link>
        <Link
          to="/theory"
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
        >
          <h3 className="text-xl font-bold mb-2">Music Theory</h3>
          <p className="text-green-100">
            Learn the basics of chord functions and progressions
          </p>
        </Link>
      </section>
    </div>
  );
}
