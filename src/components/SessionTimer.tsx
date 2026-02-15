import { useState, useEffect, useRef, useCallback } from 'react';
import type { ActiveBlock } from '../types';
import { sessionBlocks } from '../data/sessionData';

interface SessionTimerProps {
  blocks: ActiveBlock[];
  currentBlockIndex: number;
  onBlockComplete: (index: number) => void;
  onNextBlock: () => void;
  onSessionComplete: () => void;
  onUpdateNotes: (index: number, notes: string) => void;
}

export function SessionTimer({
  blocks,
  currentBlockIndex,
  onBlockComplete,
  onNextBlock,
  onSessionComplete,
  onUpdateNotes,
}: SessionTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(blocks[currentBlockIndex].minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<AudioContext | null>(null);

  const currentBlock = blocks[currentBlockIndex];
  const blockInfo = sessionBlocks.find(b => b.id === currentBlock.blockId);

  // Reset timer when block changes
  useEffect(() => {
    setSecondsLeft(blocks[currentBlockIndex].minutes * 60);
    setIsRunning(false);
    setHasStarted(false);
  }, [currentBlockIndex, blocks]);

  // Timer countdown
  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            playChime();
            onBlockComplete(currentBlockIndex);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, secondsLeft, currentBlockIndex, onBlockComplete]);

  const playChime = useCallback(() => {
    try {
      const ctx = audioRef.current || new AudioContext();
      audioRef.current = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.15);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
    } catch {
      // Audio not available
    }
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const totalSeconds = currentBlock.minutes * 60;
  const progress = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;

  const handleStartPause = () => {
    if (!hasStarted) setHasStarted(true);
    setIsRunning(!isRunning);
  };

  const handleSkip = () => {
    setIsRunning(false);
    onBlockComplete(currentBlockIndex);
    if (currentBlockIndex < blocks.length - 1) {
      onNextBlock();
    } else {
      onSessionComplete();
    }
  };

  const handleNext = () => {
    if (currentBlockIndex < blocks.length - 1) {
      onNextBlock();
    } else {
      onSessionComplete();
    }
  };

  const getBlockIcon = (icon: string) => {
    switch (icon) {
      case 'fire': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
      );
      case 'hand': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      );
      case 'rhythm': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      );
      case 'music': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      );
      case 'star': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
      case 'sparkle': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Block progress indicators */}
      <div className="flex gap-2">
        {blocks.map((block, i) => (
          <div
            key={block.blockId + i}
            className={`flex-1 h-2 rounded-full transition-colors ${
              block.completed
                ? 'bg-green-500'
                : i === currentBlockIndex
                ? 'bg-primary-500'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>

      {/* Current block */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-primary-500 dark:text-primary-400">
            {blockInfo && getBlockIcon(blockInfo.icon)}
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Block {currentBlockIndex + 1} of {blocks.length}
          </span>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          {currentBlock.name}
        </h2>
        {blockInfo && (
          <p className="text-gray-600 dark:text-gray-400 mb-6">{blockInfo.description}</p>
        )}

        {/* Timer display */}
        <div className="text-center mb-6">
          <div className={`text-6xl font-mono font-bold mb-4 ${
            secondsLeft === 0
              ? 'text-green-500'
              : secondsLeft <= 30
              ? 'text-red-500'
              : 'text-gray-900 dark:text-gray-100'
          }`}>
            {formatTime(secondsLeft)}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-6">
            <div
              className="bg-primary-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            {secondsLeft > 0 ? (
              <>
                <button
                  onClick={handleStartPause}
                  className="px-8 py-3 rounded-lg font-medium text-white bg-primary-500 hover:bg-primary-600 transition-colors text-lg"
                >
                  {isRunning ? 'Pause' : hasStarted ? 'Resume' : 'Start'}
                </button>
                <button
                  onClick={handleSkip}
                  className="px-6 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Skip
                </button>
              </>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3 rounded-lg font-medium text-white bg-green-500 hover:bg-green-600 transition-colors text-lg"
              >
                {currentBlockIndex < blocks.length - 1 ? 'Next Block' : 'Finish Session'}
              </button>
            )}
          </div>
        </div>

        {/* Suggestions */}
        {blockInfo && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              Suggestions
            </h3>
            <ul className="space-y-2">
              {blockInfo.suggestions.map((suggestion, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-primary-500 mt-0.5">&#8226;</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Notes */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
          <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
            Notes for this block
          </label>
          <textarea
            value={currentBlock.notes}
            onChange={(e) => onUpdateNotes(currentBlockIndex, e.target.value)}
            placeholder="Jot down what you worked on, ideas, things to revisit..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}
