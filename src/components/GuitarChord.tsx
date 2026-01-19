import { useState } from 'react';
import { getChordFingering, getChordAlternates, ChordFingering } from '../data/guitarChords';

interface GuitarChordProps {
  chord: string;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

const FINGER_COLORS = [
  '', // 0 = open/muted
  '#3b82f6', // 1 = index (blue)
  '#22c55e', // 2 = middle (green)
  '#f59e0b', // 3 = ring (amber)
  '#ef4444', // 4 = pinky (red)
  '#8b5cf6', // 5 = thumb (purple)
];

export function GuitarChord({ chord, size = 'md', showName = true }: GuitarChordProps) {
  const [voicingIndex, setVoicingIndex] = useState(0);
  const alternates = getChordAlternates(chord);
  const hasMultipleVoicings = alternates.length > 1;

  // Get current fingering based on voicing index
  const fingering: ChordFingering | null = alternates.length > 0
    ? alternates[voicingIndex % alternates.length]
    : getChordFingering(chord);

  const nextVoicing = () => {
    setVoicingIndex((prev) => (prev + 1) % alternates.length);
  };

  const prevVoicing = () => {
    setVoicingIndex((prev) => (prev - 1 + alternates.length) % alternates.length);
  };

  const sizes = {
    sm: { width: 80, height: 100, fontSize: 10, dotSize: 6 },
    md: { width: 120, height: 150, fontSize: 12, dotSize: 10 },
    lg: { width: 160, height: 200, fontSize: 14, dotSize: 14 },
  };

  const { width, height, fontSize, dotSize } = sizes[size];
  const stringSpacing = (width - 40) / 5;
  const fretSpacing = (height - 50) / 5;
  const startX = 20;
  const startY = 30;
  const numFrets = 5;

  if (!fingering) {
    return (
      <div
        className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg"
        style={{ width, height }}
      >
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {chord}
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          No diagram
        </span>
      </div>
    );
  }

  // Calculate the minimum fret to display
  const frettedNotes = fingering.frets.filter(f => f > 0);
  const minFret = frettedNotes.length > 0 ? Math.min(...frettedNotes) : 1;
  const maxFret = frettedNotes.length > 0 ? Math.max(...frettedNotes) : 1;
  const baseFret = maxFret <= 5 ? 1 : minFret;

  return (
    <div className="flex flex-col items-center">
      {showName && (
        <div className="flex flex-col items-center mb-1">
          <div
            className="font-bold text-gray-900 dark:text-gray-100"
            style={{ fontSize: fontSize + 2 }}
          >
            {chord}
          </div>
          {/* Voicing switcher */}
          {hasMultipleVoicings && size !== 'sm' && (
            <div className="flex items-center gap-1 mt-0.5">
              <button
                onClick={prevVoicing}
                className="p-0.5 text-gray-400 hover:text-primary-500 transition-colors"
                title="Previous voicing"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <span
                className="text-primary-600 dark:text-primary-400 cursor-pointer hover:underline"
                style={{ fontSize: fontSize - 2 }}
                onClick={nextVoicing}
                title="Click to switch voicing"
              >
                {fingering?.label || 'Standard'}
              </span>
              <button
                onClick={nextVoicing}
                className="p-0.5 text-gray-400 hover:text-primary-500 transition-colors"
                title="Next voicing"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
          {/* Small indicator for sm size */}
          {hasMultipleVoicings && size === 'sm' && (
            <button
              onClick={nextVoicing}
              className="text-primary-500 hover:text-primary-600"
              style={{ fontSize: fontSize - 2 }}
              title="Click to switch voicing"
            >
              ↻
            </button>
          )}
        </div>
      )}
      <svg width={width} height={height} className="select-none">
        {/* Nut or position indicator */}
        {baseFret === 1 ? (
          <rect
            x={startX - 2}
            y={startY - 4}
            width={stringSpacing * 5 + 4}
            height={4}
            fill="currentColor"
            className="text-gray-800 dark:text-gray-200"
          />
        ) : (
          <text
            x={startX - 15}
            y={startY + fretSpacing / 2 + 4}
            fontSize={fontSize}
            className="fill-gray-600 dark:fill-gray-400"
            textAnchor="middle"
          >
            {baseFret}
          </text>
        )}

        {/* Frets */}
        {Array.from({ length: numFrets + 1 }).map((_, i) => (
          <line
            key={`fret-${i}`}
            x1={startX}
            y1={startY + i * fretSpacing}
            x2={startX + stringSpacing * 5}
            y2={startY + i * fretSpacing}
            stroke="currentColor"
            strokeWidth={i === 0 && baseFret === 1 ? 0 : 1}
            className="text-gray-400 dark:text-gray-500"
          />
        ))}

        {/* Strings */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`string-${i}`}
            x1={startX + i * stringSpacing}
            y1={startY}
            x2={startX + i * stringSpacing}
            y2={startY + numFrets * fretSpacing}
            stroke="currentColor"
            strokeWidth={1 + (5 - i) * 0.2}
            className="text-gray-400 dark:text-gray-500"
          />
        ))}

        {/* Barre indicators */}
        {fingering.barres?.map((barre, i) => {
          const barreY = startY + (barre.fret - baseFret + 0.5) * fretSpacing;
          const startString = barre.fromString;
          const endString = barre.toString;
          return (
            <rect
              key={`barre-${i}`}
              x={startX + startString * stringSpacing - dotSize / 2}
              y={barreY - dotSize / 2}
              width={(endString - startString) * stringSpacing + dotSize}
              height={dotSize}
              rx={dotSize / 2}
              fill={FINGER_COLORS[1]}
              opacity={0.8}
            />
          );
        })}

        {/* Finger positions */}
        {fingering.frets.map((fret, stringIndex) => {
          const x = startX + stringIndex * stringSpacing;

          if (fret === -1) {
            // Muted string (X)
            return (
              <text
                key={`mute-${stringIndex}`}
                x={x}
                y={startY - 10}
                fontSize={fontSize}
                textAnchor="middle"
                className="fill-gray-600 dark:fill-gray-400"
              >
                ×
              </text>
            );
          }

          if (fret === 0) {
            // Open string (O)
            return (
              <circle
                key={`open-${stringIndex}`}
                cx={x}
                cy={startY - 10}
                r={dotSize / 2 - 1}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="text-gray-600 dark:text-gray-400"
              />
            );
          }

          // Fretted note
          const displayFret = fret - baseFret + 1;
          const y = startY + (displayFret - 0.5) * fretSpacing;
          const finger = fingering.fingers[stringIndex];

          // Skip if this is part of a barre (not the root note of the barre)
          const isBarreRoot = fingering.barres?.some(
            b => b.fret === fret && b.fromString === stringIndex
          );
          const isInBarre = fingering.barres?.some(
            b => b.fret === fret && stringIndex > b.fromString && stringIndex <= b.toString
          );

          if (isInBarre && !isBarreRoot) {
            return null;
          }

          return (
            <g key={`finger-${stringIndex}`}>
              <circle
                cx={x}
                cy={y}
                r={dotSize / 2}
                fill={FINGER_COLORS[finger] || '#64748b'}
              />
              {finger > 0 && size !== 'sm' && (
                <text
                  x={x}
                  y={y + fontSize / 3 - 1}
                  fontSize={fontSize - 2}
                  textAnchor="middle"
                  fill="white"
                  fontWeight="bold"
                >
                  {finger}
                </text>
              )}
            </g>
          );
        })}

        {/* String labels */}
        {size !== 'sm' && (
          <>
            {['E', 'A', 'D', 'G', 'B', 'e'].map((label, i) => (
              <text
                key={`label-${i}`}
                x={startX + i * stringSpacing}
                y={startY + numFrets * fretSpacing + 15}
                fontSize={fontSize - 2}
                textAnchor="middle"
                className="fill-gray-500 dark:fill-gray-500"
              >
                {label}
              </text>
            ))}
          </>
        )}
      </svg>

      {/* Finger legend for medium and large */}
      {size === 'lg' && (
        <div className="flex gap-2 mt-2 text-xs">
          {[1, 2, 3, 4].map(f => (
            <div key={f} className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: FINGER_COLORS[f] }}
              />
              <span className="text-gray-500 dark:text-gray-400">
                {f === 1 ? 'Index' : f === 2 ? 'Middle' : f === 3 ? 'Ring' : 'Pinky'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Component to display multiple chords in a row
interface ChordProgressionDiagramProps {
  chords: string[];
  size?: 'sm' | 'md' | 'lg';
}

export function ChordProgressionDiagram({ chords, size = 'sm' }: ChordProgressionDiagramProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {chords.map((chord, index) => (
        <GuitarChord key={`${chord}-${index}`} chord={chord} size={size} />
      ))}
    </div>
  );
}
