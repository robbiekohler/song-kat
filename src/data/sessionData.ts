import type { SessionBlock, StrummingPattern } from '../types';

export const sessionBlocks: SessionBlock[] = [
  {
    id: 'warmup',
    name: 'Warm-Up',
    description: 'Loosen up your fingers with stretches and simple exercises',
    defaultMinutes: 5,
    icon: 'fire',
    suggestions: [
      'Finger stretches and hand warm-up',
      'Chromatic exercise: 1-2-3-4 on each string',
      'Simple open chord changes (G-C-D)',
      'Slow strumming to get comfortable',
    ],
  },
  {
    id: 'chords',
    name: 'Chord Practice',
    description: 'Work on chord shapes, transitions, and new voicings',
    defaultMinutes: 15,
    icon: 'hand',
    suggestions: [
      'Practice barre chord shapes (F, Bm)',
      'Work on smooth chord transitions',
      'Try alternate voicings of familiar chords',
      'Practice chord changes with a metronome',
    ],
  },
  {
    id: 'strumming',
    name: 'Strumming Patterns',
    description: 'Build rhythm skills with different strumming techniques',
    defaultMinutes: 10,
    icon: 'rhythm',
    suggestions: [
      'Practice basic down-up patterns',
      'Work on muted strums and ghost strokes',
      'Try syncopated patterns',
      'Practice palm muting technique',
    ],
  },
  {
    id: 'progression',
    name: 'Progression Work',
    description: 'Play through chord progressions and learn new ones',
    defaultMinutes: 15,
    icon: 'music',
    suggestions: [
      'Pick a progression and play it in 3 different keys',
      'Try a new progression from the Progressions page',
      'Play along with the audio player at different tempos',
      'Experiment with different voicing styles on one progression',
    ],
  },
  {
    id: 'songs',
    name: 'Song Practice',
    description: 'Work on learning or playing through complete songs',
    defaultMinutes: 10,
    icon: 'star',
    suggestions: [
      'Play through a song you already know for fluency',
      'Learn the chords to a new song from the Songs Database',
      'Practice singing while playing',
      'Work on a tricky section of a song in progress',
    ],
  },
  {
    id: 'freeplay',
    name: 'Free Play / Improv',
    description: 'Experiment freely, write ideas, or just have fun',
    defaultMinutes: 5,
    icon: 'sparkle',
    suggestions: [
      'Improvise over a chord progression',
      'Experiment with fingerpicking patterns',
      'Try writing a short chord progression of your own',
      'Play whatever feels good — no rules!',
    ],
  },
];

export const strummingPatterns: StrummingPattern[] = [
  {
    id: 'basic-down',
    name: 'Basic Down',
    pattern: ['D', '-', 'D', '-', 'D', '-', 'D', '-'],
    difficulty: 'beginner',
    genres: ['folk', 'country'],
    description: 'The simplest pattern — just downstrokes on each beat. Great for getting started.',
    bpmRange: [60, 120],
  },
  {
    id: 'basic-down-up',
    name: 'Down-Up',
    pattern: ['D', 'U', 'D', 'U', 'D', 'U', 'D', 'U'],
    difficulty: 'beginner',
    genres: ['pop', 'rock', 'folk'],
    description: 'Alternating down and up strokes on every eighth note. The foundation of all strumming.',
    bpmRange: [60, 140],
  },
  {
    id: 'campfire',
    name: 'Campfire Strum',
    pattern: ['D', '-', 'D', 'U', '-', 'U', 'D', 'U'],
    difficulty: 'beginner',
    genres: ['folk', 'pop', 'country'],
    description: 'The classic "campfire" pattern. Works with almost any song. Down, down-up, up-down-up.',
    bpmRange: [80, 130],
  },
  {
    id: 'folk-strum',
    name: 'Folk Strum',
    pattern: ['D', '-', 'D', 'U', 'D', 'U', 'D', 'U'],
    difficulty: 'beginner',
    genres: ['folk', 'acoustic', 'singer-songwriter'],
    description: 'A steady folk pattern with a slight accent on the first beat. Great for storytelling songs.',
    bpmRange: [70, 120],
  },
  {
    id: 'island-strum',
    name: 'Island Strum',
    pattern: ['D', '-', 'U', '-', 'U', 'D', 'U', '-'],
    difficulty: 'intermediate',
    genres: ['reggae', 'island', 'pop'],
    description: 'The classic island/reggae feel. Emphasizes the offbeats for a laid-back groove.',
    bpmRange: [70, 110],
  },
  {
    id: 'pop-ballad',
    name: 'Pop Ballad',
    pattern: ['D', '-', '-', 'U', '-', 'U', 'D', '-'],
    difficulty: 'intermediate',
    genres: ['pop', 'ballad', 'acoustic'],
    description: 'A gentle, spacious pattern perfect for slower songs and ballads.',
    bpmRange: [60, 100],
  },
  {
    id: 'driving-rock',
    name: 'Driving Rock',
    pattern: ['D', 'x', 'U', 'x', 'D', 'x', 'U', 'x'],
    difficulty: 'intermediate',
    genres: ['rock', 'punk', 'pop-rock'],
    description: 'Muted strums between hits give this a percussive, driving feel.',
    bpmRange: [100, 160],
  },
  {
    id: 'syncopated-pop',
    name: 'Syncopated Pop',
    pattern: ['D', '-', 'U', '-', 'U', 'D', '-', 'U'],
    difficulty: 'intermediate',
    genres: ['pop', 'indie', 'acoustic'],
    description: 'Syncopated accents give a modern pop feel. Think Ed Sheeran, Jason Mraz.',
    bpmRange: [80, 130],
  },
  {
    id: 'fingerstyle-folk',
    name: 'Travis Picking Feel',
    pattern: ['D', 'U', '-', 'U', 'D', 'U', '-', 'U'],
    difficulty: 'advanced',
    genres: ['folk', 'country', 'fingerstyle'],
    description: 'Mimics Travis picking with a strum. Alternating bass note emphasis on beats 1 and 3.',
    bpmRange: [60, 100],
  },
  {
    id: 'funk-mute',
    name: 'Funk Mute',
    pattern: ['D', 'x', 'U', 'x', 'D', 'U', 'x', 'U'],
    difficulty: 'advanced',
    genres: ['funk', 'r&b', 'soul'],
    description: 'Percussive muted strums mixed with clean hits. Requires good muting control.',
    bpmRange: [80, 120],
  },
  {
    id: 'shuffle-blues',
    name: 'Blues Shuffle',
    pattern: ['D', '-', 'U', 'D', '-', 'U', 'D', '-'],
    difficulty: 'intermediate',
    genres: ['blues', 'rock', 'country'],
    description: 'A swung shuffle pattern. Play with a triplet feel for authentic blues sound.',
    bpmRange: [70, 120],
  },
  {
    id: 'flamenco-rasgueado',
    name: 'Flamenco Feel',
    pattern: ['D', 'U', 'D', 'U', 'x', 'D', 'U', 'D'],
    difficulty: 'advanced',
    genres: ['flamenco', 'latin', 'world'],
    description: 'Fast, rhythmic strumming inspired by flamenco rasgueado technique.',
    bpmRange: [80, 140],
  },
];

// Build a default 60-minute session from the blocks
export function buildDefaultSession(totalMinutes: number = 60) {
  const blocks = sessionBlocks.map(block => ({
    blockId: block.id,
    name: block.name,
    minutes: block.defaultMinutes,
    completed: false,
    notes: '',
  }));

  // Scale to fit the target duration
  const defaultTotal = blocks.reduce((sum, b) => sum + b.minutes, 0);
  if (defaultTotal !== totalMinutes) {
    const ratio = totalMinutes / defaultTotal;
    let remaining = totalMinutes;
    blocks.forEach((block, i) => {
      if (i === blocks.length - 1) {
        block.minutes = remaining;
      } else {
        block.minutes = Math.max(1, Math.round(block.minutes * ratio));
        remaining -= block.minutes;
      }
    });
  }

  return {
    blocks,
    totalMinutes,
    startedAt: null,
    currentBlockIndex: 0,
  };
}

export function getStrummingPatternsByDifficulty(difficulty: string): StrummingPattern[] {
  return strummingPatterns.filter(p => p.difficulty === difficulty);
}

export function getStrummingPatternsByGenre(genre: string): StrummingPattern[] {
  return strummingPatterns.filter(p =>
    p.genres.some(g => g.toLowerCase().includes(genre.toLowerCase()))
  );
}
