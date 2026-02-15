import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SessionTimer } from '../components/SessionTimer';
import { StrummingPattern } from '../components/StrummingPattern';
import { sessionBlocks, strummingPatterns, buildDefaultSession } from '../data/sessionData';
import type { ActiveSession, ActiveBlock } from '../types';

type SessionView = 'setup' | 'playing' | 'complete' | 'patterns';

export function Session() {
  const [view, setView] = useState<SessionView>('setup');
  const [session, setSession] = useState<ActiveSession>(buildDefaultSession(60));
  const [totalMinutes, setTotalMinutes] = useState(60);
  const [patternFilter, setPatternFilter] = useState<string>('all');
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);

  // Setup: adjust block durations
  const updateBlockMinutes = (index: number, minutes: number) => {
    setSession(prev => {
      const newBlocks = [...prev.blocks];
      newBlocks[index] = { ...newBlocks[index], minutes: Math.max(1, minutes) };
      return {
        ...prev,
        blocks: newBlocks,
        totalMinutes: newBlocks.reduce((sum, b) => sum + b.minutes, 0),
      };
    });
  };

  const toggleBlock = (index: number) => {
    setSession(prev => {
      const newBlocks = prev.blocks.filter((_, i) => i !== index);
      return {
        ...prev,
        blocks: newBlocks,
        totalMinutes: newBlocks.reduce((sum, b) => sum + b.minutes, 0),
      };
    });
  };

  const addBlock = (blockId: string) => {
    const blockInfo = sessionBlocks.find(b => b.id === blockId);
    if (!blockInfo) return;
    setSession(prev => {
      const newBlock: ActiveBlock = {
        blockId,
        name: blockInfo.name,
        minutes: blockInfo.defaultMinutes,
        completed: false,
        notes: '',
      };
      const newBlocks = [...prev.blocks, newBlock];
      return {
        ...prev,
        blocks: newBlocks,
        totalMinutes: newBlocks.reduce((sum, b) => sum + b.minutes, 0),
      };
    });
  };

  const resetToDefault = () => {
    setSession(buildDefaultSession(totalMinutes));
  };

  const startSession = () => {
    setSessionStartTime(Date.now());
    setSession(prev => ({ ...prev, startedAt: Date.now(), currentBlockIndex: 0 }));
    setView('playing');
  };

  const handleBlockComplete = useCallback((index: number) => {
    setSession(prev => {
      const newBlocks = [...prev.blocks];
      newBlocks[index] = { ...newBlocks[index], completed: true };
      return { ...prev, blocks: newBlocks };
    });
  }, []);

  const handleNextBlock = useCallback(() => {
    setSession(prev => ({
      ...prev,
      currentBlockIndex: Math.min(prev.currentBlockIndex + 1, prev.blocks.length - 1),
    }));
  }, []);

  const handleSessionComplete = useCallback(() => {
    setView('complete');
  }, []);

  const handleUpdateNotes = useCallback((index: number, notes: string) => {
    setSession(prev => {
      const newBlocks = [...prev.blocks];
      newBlocks[index] = { ...newBlocks[index], notes };
      return { ...prev, blocks: newBlocks };
    });
  }, []);

  const filteredPatterns = patternFilter === 'all'
    ? strummingPatterns
    : strummingPatterns.filter(p => p.difficulty === patternFilter);

  const availableBlocks = sessionBlocks.filter(
    sb => !session.blocks.some(b => b.blockId === sb.id)
  );

  const formatDuration = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    return mins < 1 ? 'less than a minute' : `${mins} minute${mins !== 1 ? 's' : ''}`;
  };

  // SETUP VIEW
  if (view === 'setup') {
    return (
      <div className="space-y-8">
        <section className="text-center py-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Guitar Practice Session
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Structure your practice time into focused blocks. Customize the plan below, then hit start.
          </p>
        </section>

        {/* Quick duration picker */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Session Duration</h2>
          <div className="flex flex-wrap gap-3">
            {[15, 30, 45, 60, 90].map(mins => (
              <button
                key={mins}
                onClick={() => {
                  setTotalMinutes(mins);
                  setSession(buildDefaultSession(mins));
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  totalMinutes === mins
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {mins} min
              </button>
            ))}
          </div>
        </div>

        {/* Session blocks */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Practice Blocks
              <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                ({session.blocks.reduce((sum, b) => sum + b.minutes, 0)} min total)
              </span>
            </h2>
            <button
              onClick={resetToDefault}
              className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
            >
              Reset to default
            </button>
          </div>

          <div className="space-y-3">
            {session.blocks.map((block, i) => {
              const info = sessionBlocks.find(b => b.id === block.blockId);
              return (
                <div
                  key={block.blockId + i}
                  className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-100">{block.name}</div>
                    {info && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">{info.description}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateBlockMinutes(i, block.minutes - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-mono font-bold text-gray-900 dark:text-gray-100">
                      {block.minutes}m
                    </span>
                    <button
                      onClick={() => updateBlockMinutes(i, block.minutes + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
                    >
                      +
                    </button>
                    <button
                      onClick={() => toggleBlock(i)}
                      className="ml-2 w-8 h-8 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900 flex items-center justify-center"
                      title="Remove block"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add block */}
          {availableBlocks.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Add a block:</p>
              <div className="flex flex-wrap gap-2">
                {availableBlocks.map(block => (
                  <button
                    key={block.id}
                    onClick={() => addBlock(block.id)}
                    className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  >
                    + {block.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-4">
          <button
            onClick={startSession}
            disabled={session.blocks.length === 0}
            className="flex-1 py-4 rounded-xl font-bold text-lg text-white bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
          >
            Start Session ({session.blocks.reduce((sum, b) => sum + b.minutes, 0)} min)
          </button>
          <button
            onClick={() => setView('patterns')}
            className="px-6 py-4 rounded-xl font-bold text-lg text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
          >
            Strumming Patterns
          </button>
        </div>
      </div>
    );
  }

  // PLAYING VIEW
  if (view === 'playing') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Practice Session
          </h1>
          <button
            onClick={() => {
              setView('complete');
            }}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            End Early
          </button>
        </div>

        <SessionTimer
          blocks={session.blocks}
          currentBlockIndex={session.currentBlockIndex}
          onBlockComplete={handleBlockComplete}
          onNextBlock={handleNextBlock}
          onSessionComplete={handleSessionComplete}
          onUpdateNotes={handleUpdateNotes}
        />
      </div>
    );
  }

  // COMPLETE VIEW
  if (view === 'complete') {
    const completedCount = session.blocks.filter(b => b.completed).length;
    const elapsedMs = sessionStartTime ? Date.now() - sessionStartTime : 0;

    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <section className="text-center py-8">
          <div className="text-5xl mb-4">&#127928;</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Session Complete!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            You completed {completedCount} of {session.blocks.length} blocks
            {elapsedMs > 0 && ` in ${formatDuration(elapsedMs)}`}.
          </p>
        </section>

        {/* Session summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Session Summary</h2>
          {session.blocks.map((block, i) => (
            <div
              key={block.blockId + i}
              className={`p-4 rounded-lg border ${
                block.completed
                  ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={block.completed ? 'text-green-500' : 'text-gray-400'}>
                  {block.completed ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{block.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">({block.minutes} min)</span>
              </div>
              {block.notes && (
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-7">{block.notes}</p>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => {
              setSession(buildDefaultSession(totalMinutes));
              setSessionStartTime(null);
              setView('setup');
            }}
            className="flex-1 py-3 rounded-xl font-medium text-white bg-primary-500 hover:bg-primary-600 transition-colors"
          >
            New Session
          </button>
          <Link
            to="/progressions"
            className="px-6 py-3 rounded-xl font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors text-center"
          >
            Browse Progressions
          </Link>
        </div>
      </div>
    );
  }

  // PATTERNS VIEW
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Strumming Patterns
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Learn common acoustic guitar strumming patterns for different styles and skill levels.
          </p>
        </div>
        <button
          onClick={() => setView('setup')}
          className="px-4 py-2 rounded-lg text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
        >
          Back to Session
        </button>
      </div>

      {/* Difficulty filter */}
      <div className="flex gap-2">
        {['all', 'beginner', 'intermediate', 'advanced'].map(level => (
          <button
            key={level}
            onClick={() => setPatternFilter(level)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              patternFilter === level
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Patterns grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredPatterns.map(pattern => (
          <StrummingPattern key={pattern.id} pattern={pattern} />
        ))}
      </div>
    </div>
  );
}
