import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { getSongs, createSong, deleteSong, DbSong } from '../lib/supabase';
import { progressions } from '../data/progressions';
import { DISPLAY_KEYS } from '../lib/chordUtils';
import type { MusicalKey } from '../types';

export function MySongs() {
  const { user, loading: authLoading } = useAuth();
  const [songs, setSongs] = useState<DbSong[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [key, setKey] = useState<MusicalKey>('C');
  const [progressionId, setProgressionId] = useState(progressions[0].id);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      loadSongs();
    }
  }, [user]);

  const loadSongs = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await getSongs(user.id);
      setSongs(data);
    } catch (err) {
      setError('Failed to load songs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim()) return;

    try {
      setSaving(true);
      const newSong = await createSong({
        user_id: user.id,
        title: title.trim(),
        key,
        progression_id: progressionId,
        notes: notes.trim(),
      });
      setSongs((prev) => [newSong, ...prev]);
      setTitle('');
      setKey('C');
      setProgressionId(progressions[0].id);
      setNotes('');
      setShowForm(false);
    } catch (err) {
      setError('Failed to save song');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this song?')) return;

    try {
      await deleteSong(id);
      setSongs((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setError('Failed to delete song');
      console.error(err);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const getProgressionName = (id: string) => {
    return progressions.find((p) => p.id === id)?.name || id;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            My Songs
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Save and organize your song ideas.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
        >
          {showForm ? 'Cancel' : 'New Song'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* New Song Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Create New Song
          </h2>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="My awesome song"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="key"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Key
              </label>
              <select
                id="key"
                value={key}
                onChange={(e) => setKey(e.target.value as MusicalKey)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {DISPLAY_KEYS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="progression"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Progression
              </label>
              <select
                id="progression"
                value={progressionId}
                onChange={(e) => setProgressionId(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {progressions.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Lyrics, ideas, inspiration..."
            />
          </div>

          <button
            type="submit"
            disabled={saving || !title.trim()}
            className="px-6 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Song'}
          </button>
        </form>
      )}

      {/* Songs List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      ) : songs.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            You haven't saved any songs yet.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            Create your first song
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {songs.map((song) => (
            <div
              key={song.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {song.title}
                  </h3>
                  <div className="flex gap-3 mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <span>Key: {song.key}</span>
                    <span>Progression: {getProgressionName(song.progression_id)}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(song.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete song"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {song.notes && (
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                  {song.notes}
                </p>
              )}
              <div className="mt-4 text-xs text-gray-400 dark:text-gray-500">
                Created {new Date(song.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
