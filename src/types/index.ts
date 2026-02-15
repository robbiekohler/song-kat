export interface ChordProgression {
  id: string;
  name: string;
  numerals: string[];
  moods: string[];
  famousSongs: string[];
  description: string;
  keyType: 'major' | 'minor' | 'both';
}

export interface FamousSong {
  id: string;
  title: string;
  artist: string;
  year: number;
  genre: string;
  progressionId: string;
  key: string;
  bpm?: number;
  mood: string[];
}

export interface Song {
  id: string;
  user_id: string;
  title: string;
  key: string;
  progression_id: string;
  notes: string;
  created_at: string;
}

export type MusicalKey =
  | 'C' | 'C#' | 'Db' | 'D' | 'D#' | 'Eb'
  | 'E' | 'F' | 'F#' | 'Gb' | 'G' | 'G#' | 'Ab' | 'A' | 'A#' | 'Bb' | 'B';

export type Mode = 'major' | 'minor';

export interface KeySignature {
  key: MusicalKey;
  mode: Mode;
}

export type Mood = 'happy' | 'sad' | 'epic' | 'chill' | 'dramatic' | 'uplifting' | 'melancholic' | 'energetic' | 'romantic';

export type Genre = 'pop' | 'rock' | 'jazz' | 'folk' | 'blues' | 'country' | 'r&b' | 'soul' | 'indie' | 'classical';

// Guitar Practice Session types
export interface SessionBlock {
  id: string;
  name: string;
  description: string;
  defaultMinutes: number;
  icon: string;
  suggestions: string[];
}

export interface StrummingPattern {
  id: string;
  name: string;
  pattern: ('D' | 'U' | 'x' | '-')[];  // D=down, U=up, x=muted hit, -=rest
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  genres: string[];
  description: string;
  bpmRange: [number, number];
}

export interface ActiveSession {
  blocks: ActiveBlock[];
  totalMinutes: number;
  startedAt: number | null;
  currentBlockIndex: number;
}

export interface ActiveBlock {
  blockId: string;
  name: string;
  minutes: number;
  completed: boolean;
  notes: string;
}
