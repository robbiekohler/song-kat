import { useState, useEffect, useRef } from 'react';
import { getPlayer, VoicingStyle, VOICING_INFO, InstrumentType, INSTRUMENT_INFO, DrumPattern, DRUM_PATTERN_INFO, ChordRhythm, CHORD_RHYTHM_INFO, BassPattern, BASS_PATTERN_INFO } from '../lib/audioPlayer';

interface ChordPlayerProps {
  chords: string[];
  className?: string;
  voicing: VoicingStyle;
  onVoicingChange: (voicing: VoicingStyle) => void;
}

export const VOICING_OPTIONS: VoicingStyle[] = [
  'standard',
  'power',
  'octave',
  'sus2',
  'sus4',
  'fifth_octave',
  'open',
];

export const INSTRUMENT_OPTIONS: InstrumentType[] = [
  'piano',
  'electric_piano',
  'acoustic_guitar',
  'clean_guitar',
  'organ',
  'synth_pad',
  'strings',
  'bell',
];

export const DRUM_OPTIONS: DrumPattern[] = [
  'none',
  'rock',
  'pop',
  'ballad',
  'shuffle',
  'texas_blues',
  'slow_blues',
  'metronome',
];

export const RHYTHM_OPTIONS: ChordRhythm[] = [
  'sustain',
  'quarter',
  'eighth',
  'offbeat',
  'syncopated',
  'arpeggio',
];

export const BASS_OPTIONS: BassPattern[] = [
  'none',
  'root',
  'blues_shuffle',
  'walking_blues',
  'texas_bass',
];

export function ChordPlayer({ chords, className = '', voicing, onVoicingChange }: ChordPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(100);
  const [currentChordIndex, setCurrentChordIndex] = useState(-1);
  const [beatsPerChord, setBeatsPerChord] = useState(4);
  const [showVoicingInfo, setShowVoicingInfo] = useState(false);
  const [instrument, setInstrument] = useState<InstrumentType>('piano');
  const [drumPattern, setDrumPattern] = useState<DrumPattern>('rock');
  const [chordRhythm, setChordRhythm] = useState<ChordRhythm>('quarter');
  const [bassPattern, setBassPattern] = useState<BassPattern>('none');
  const playerRef = useRef(getPlayer());

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      playerRef.current.stop();
    };
  }, []);

  // Stop playback when chords change
  useEffect(() => {
    if (isPlaying) {
      handleStop();
    }
  }, [chords.join(',')]);

  const handlePlay = async () => {
    try {
      await playerRef.current.play(
        chords,
        tempo,
        beatsPerChord,
        (index) => setCurrentChordIndex(index),
        voicing,
        instrument,
        drumPattern,
        chordRhythm,
        bassPattern
      );
      setIsPlaying(true);
    } catch (error) {
      console.error('Failed to play:', error);
    }
  };

  const handleVoicingChange = (newVoicing: VoicingStyle) => {
    onVoicingChange(newVoicing);
    if (isPlaying) {
      handleStop();
    }
  };

  const handleInstrumentChange = (newInstrument: InstrumentType) => {
    setInstrument(newInstrument);
    if (isPlaying) {
      handleStop();
    }
  };

  const handleDrumChange = (newPattern: DrumPattern) => {
    setDrumPattern(newPattern);
    if (isPlaying) {
      handleStop();
    }
  };

  const handleRhythmChange = (newRhythm: ChordRhythm) => {
    setChordRhythm(newRhythm);
    if (isPlaying) {
      handleStop();
    }
  };

  const handleBassChange = (newBassPattern: BassPattern) => {
    setBassPattern(newBassPattern);
    if (isPlaying) {
      handleStop();
    }
  };

  const handleStop = () => {
    playerRef.current.stop();
    setIsPlaying(false);
    setCurrentChordIndex(-1);
  };

  const handleTempoChange = (newTempo: number) => {
    setTempo(newTempo);
    if (isPlaying) {
      playerRef.current.setTempo(newTempo);
    }
  };

  return (
    <div className={`bg-gray-100 dark:bg-gray-900 rounded-lg p-4 ${className}`}>
      {/* Chord display with highlight */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {chords.map((chord, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded-lg font-semibold text-lg transition-all duration-150 ${
              currentChordIndex === index
                ? 'bg-primary-500 text-white scale-110 shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'
            }`}
          >
            {chord}
          </div>
        ))}
      </div>

      {/* Voicing selector */}
      <div className="mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Voicing Style:
          </label>
          <button
            onClick={() => setShowVoicingInfo(!showVoicingInfo)}
            className="p-1.5 -m-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 touch-manipulation"
            title="About voicing styles"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
          {VOICING_OPTIONS.map((v) => (
            <button
              key={v}
              onClick={() => handleVoicingChange(v)}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors min-h-[36px] ${
                voicing === v
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
              }`}
            >
              {VOICING_INFO[v].name}
            </button>
          ))}
        </div>

        {/* Voicing info panel */}
        {showVoicingInfo && (
          <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {VOICING_INFO[voicing].name}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {VOICING_INFO[voicing].description}
              </p>
              <p className="text-gray-500 dark:text-gray-500 mt-1 text-xs">
                Used by: {VOICING_INFO[voicing].artists}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Instrument selector */}
      <div className="mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Instrument:
          </label>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
          {INSTRUMENT_OPTIONS.map((inst) => (
            <button
              key={inst}
              onClick={() => handleInstrumentChange(inst)}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors min-h-[36px] ${
                instrument === inst
                  ? 'bg-green-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
              }`}
              title={INSTRUMENT_INFO[inst].description}
            >
              {INSTRUMENT_INFO[inst].name}
            </button>
          ))}
        </div>
      </div>

      {/* Drum pattern selector */}
      <div className="mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Drums:
          </label>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
          {DRUM_OPTIONS.map((pattern) => (
            <button
              key={pattern}
              onClick={() => handleDrumChange(pattern)}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors min-h-[36px] ${
                drumPattern === pattern
                  ? 'bg-orange-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
              }`}
              title={DRUM_PATTERN_INFO[pattern].description}
            >
              {DRUM_PATTERN_INFO[pattern].name}
            </button>
          ))}
        </div>
      </div>

      {/* Bass pattern selector */}
      <div className="mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Bass:
          </label>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
          {BASS_OPTIONS.map((pattern) => (
            <button
              key={pattern}
              onClick={() => handleBassChange(pattern)}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors min-h-[36px] ${
                bassPattern === pattern
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
              }`}
              title={BASS_PATTERN_INFO[pattern].description}
            >
              {BASS_PATTERN_INFO[pattern].name}
            </button>
          ))}
        </div>
      </div>

      {/* Chord rhythm selector */}
      <div className="mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Chord Rhythm:
          </label>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
          {RHYTHM_OPTIONS.map((rhythm) => (
            <button
              key={rhythm}
              onClick={() => handleRhythmChange(rhythm)}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors min-h-[36px] ${
                chordRhythm === rhythm
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
              }`}
              title={CHORD_RHYTHM_INFO[rhythm].description}
            >
              {CHORD_RHYTHM_INFO[rhythm].name}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {/* Play/Stop button */}
        <button
          onClick={isPlaying ? handleStop : handlePlay}
          className={`flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-2 rounded-lg font-medium transition-colors min-h-[44px] ${
            isPlaying
              ? 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white'
              : 'bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white'
          }`}
        >
          {isPlaying ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <rect x="5" y="4" width="4" height="12" rx="1" />
                <rect x="11" y="4" width="4" height="12" rx="1" />
              </svg>
              Stop
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Play
            </>
          )}
        </button>

        {/* Tempo control */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            Tempo:
          </label>
          <input
            type="range"
            min="60"
            max="180"
            value={tempo}
            onChange={(e) => handleTempoChange(parseInt(e.target.value))}
            className="w-20 sm:w-24 h-2 accent-primary-500"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-10 sm:w-12 text-center">
            {tempo}
          </span>
        </div>

        {/* Beats per chord */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            Beats:
          </label>
          <select
            value={beatsPerChord}
            onChange={(e) => {
              setBeatsPerChord(parseInt(e.target.value));
              if (isPlaying) {
                handleStop();
              }
            }}
            className="px-2 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm min-h-[36px]"
          >
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
          </select>
        </div>
      </div>

      {/* Help text */}
      <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-3">
        Try different voicing styles for creative inspiration. Octaves and power chords work great for rock!
      </p>
    </div>
  );
}
