import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SongCard } from '../components/SongCard';
import { famousSongs } from '../data/famousSongs';

export function SongsDatabase() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedDecade, setSelectedDecade] = useState<string>('');
  const [selectedMood, setSelectedMood] = useState<string>('');

  // Extract unique values for filters
  const genres = useMemo(() => {
    const genreSet = new Set(famousSongs.map((s) => s.genre));
    return Array.from(genreSet).sort();
  }, []);

  const decades = useMemo(() => {
    const decadeSet = new Set<number>();
    famousSongs.forEach((s) => {
      const decade = Math.floor(s.year / 10) * 10;
      if (decade >= 1950) decadeSet.add(decade);
    });
    return Array.from(decadeSet).sort((a, b) => b - a);
  }, []);

  const moods = useMemo(() => {
    const moodSet = new Set<string>();
    famousSongs.forEach((s) => s.mood.forEach((m) => moodSet.add(m)));
    return Array.from(moodSet).sort();
  }, []);

  // Filter songs
  const filteredSongs = useMemo(() => {
    return famousSongs.filter((song) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = song.title.toLowerCase().includes(query);
        const matchesArtist = song.artist.toLowerCase().includes(query);
        if (!matchesTitle && !matchesArtist) return false;
      }

      // Genre filter
      if (selectedGenre && song.genre !== selectedGenre) return false;

      // Decade filter
      if (selectedDecade) {
        const decade = parseInt(selectedDecade);
        if (song.year < decade || song.year >= decade + 10) return false;
      }

      // Mood filter
      if (selectedMood && !song.mood.includes(selectedMood)) return false;

      return true;
    });
  }, [searchQuery, selectedGenre, selectedDecade, selectedMood]);

  const handleProgressionClick = (progressionId: string) => {
    navigate(`/progressions?progression=${progressionId}`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenre('');
    setSelectedDecade('');
    setSelectedMood('');
  };

  const hasActiveFilters = searchQuery || selectedGenre || selectedDecade || selectedMood;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Famous Songs Database
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover which chord progressions your favorite songs use.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <label
              htmlFor="search"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by title or artist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="genre"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >
              Genre
            </label>
            <select
              id="genre"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="decade"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >
              Decade
            </label>
            <select
              id="decade"
              value={selectedDecade}
              onChange={(e) => setSelectedDecade(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All decades</option>
              {decades.map((decade) => (
                <option key={decade} value={decade}>
                  {decade}s
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="mood"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >
              Mood
            </label>
            <select
              id="mood"
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All moods</option>
              {moods.map((mood) => (
                <option key={mood} value={mood}>
                  {mood.charAt(0).toUpperCase() + mood.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t dark:border-gray-700">
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Showing {filteredSongs.length} of {famousSongs.length} songs
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onProgressionClick={handleProgressionClick}
            />
          ))}
        </div>

        {filteredSongs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No songs match your filters.
            </p>
            <button
              onClick={clearFilters}
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
