import type { ChordProgression } from '../types';

export const progressions: ChordProgression[] = [
  {
    id: 'i-v-vi-iv',
    name: 'I-V-vi-IV',
    numerals: ['I', 'V', 'vi', 'IV'],
    moods: ['happy', 'uplifting', 'pop', 'energetic'],
    famousSongs: ['Let It Be', 'No Woman No Cry', 'With or Without You', 'She Will Be Loved'],
    description: 'The most popular progression in modern pop music. Creates a sense of optimism with a touch of bittersweetness.',
    keyType: 'major',
  },
  {
    id: 'i-iv-v-i',
    name: 'I-IV-V-I',
    numerals: ['I', 'IV', 'V', 'I'],
    moods: ['classic', 'rock', 'happy', 'energetic'],
    famousSongs: ['Twist and Shout', 'La Bamba', 'Wild Thing', 'Louie Louie'],
    description: 'The classic rock and roll progression. Simple, powerful, and timeless.',
    keyType: 'major',
  },
  {
    id: 'i-vi-iv-v',
    name: 'I-vi-IV-V',
    numerals: ['I', 'vi', 'IV', 'V'],
    moods: ['romantic', 'nostalgic', 'doo-wop', 'happy'],
    famousSongs: ['Stand By Me', 'Every Breath You Take', 'Earth Angel', 'Last Kiss'],
    description: 'The 50s progression. Perfect for romantic ballads and nostalgic songs.',
    keyType: 'major',
  },
  {
    id: 'ii-v-i',
    name: 'ii-V-I',
    numerals: ['ii', 'V', 'I'],
    moods: ['jazz', 'sophisticated', 'smooth', 'chill'],
    famousSongs: ['Autumn Leaves', 'All The Things You Are', 'Fly Me to the Moon'],
    description: 'The essential jazz progression. Creates smooth, sophisticated movement.',
    keyType: 'major',
  },
  {
    id: 'i-iv-vi-v',
    name: 'I-IV-vi-V',
    numerals: ['I', 'IV', 'vi', 'V'],
    moods: ['uplifting', 'anthemic', 'pop', 'energetic'],
    famousSongs: ['Hey Soul Sister', 'Riptide', 'Take On Me'],
    description: 'A modern pop favorite. Upbeat and catchy.',
    keyType: 'major',
  },
  {
    id: 'vi-iv-i-v',
    name: 'vi-IV-I-V',
    numerals: ['vi', 'IV', 'I', 'V'],
    moods: ['emotional', 'pop', 'dramatic', 'uplifting'],
    famousSongs: ['Despacito', 'Grenade', 'Africa', 'Numb'],
    description: 'Starting on the minor chord gives this progression a more emotional quality while still feeling resolved.',
    keyType: 'major',
  },
  {
    id: 'i-v-vi-iii-iv',
    name: 'I-V-vi-iii-IV-I-IV-V',
    numerals: ['I', 'V', 'vi', 'iii', 'IV', 'I', 'IV', 'V'],
    moods: ['epic', 'emotional', 'classical', 'dramatic'],
    famousSongs: ['Canon in D', 'Basket Case', 'Cryin'],
    description: 'Pachelbel\'s Canon progression. Epic and emotionally satisfying.',
    keyType: 'major',
  },
  {
    id: 'i-iii-iv-iv',
    name: 'I-iii-IV-iv',
    numerals: ['I', 'iii', 'IV', 'iv'],
    moods: ['melancholic', 'emotional', 'cinematic', 'dramatic'],
    famousSongs: ['Creep', 'Space Oddity', 'My Heart Will Go On'],
    description: 'The minor iv chord creates a poignant, bittersweet feeling.',
    keyType: 'major',
  },
  {
    id: 'i-v-iv-v',
    name: 'I-V-IV-V',
    numerals: ['I', 'V', 'IV', 'V'],
    moods: ['happy', 'energetic', 'pop', 'rock'],
    famousSongs: ['Summer of \'69', 'Crocodile Rock', 'What I Like About You'],
    description: 'An energetic, driving progression perfect for upbeat rock and pop.',
    keyType: 'major',
  },
  {
    id: 'i-ii-iii-iv',
    name: 'I-II-III-IV',
    numerals: ['I', 'II', 'III', 'IV'],
    moods: ['uplifting', 'anthemic', 'rock', 'energetic'],
    famousSongs: ['Don\'t Look Back in Anger', 'Hey Jude (coda)'],
    description: 'Uses non-diatonic chords for a powerful, anthemic feel.',
    keyType: 'major',
  },
  {
    id: 'i-bvii-iv-i',
    name: 'I-bVII-IV-I',
    numerals: ['I', 'bVII', 'IV', 'I'],
    moods: ['rock', 'anthemic', 'powerful', 'epic'],
    famousSongs: ['Sweet Home Alabama', 'Sweet Child O\' Mine', 'Free Fallin\''],
    description: 'The mixolydian progression. Gives a rootsy, rock feel.',
    keyType: 'major',
  },
  {
    id: 'i-iv-i-v',
    name: 'I-IV-I-V',
    numerals: ['I', 'IV', 'I', 'V'],
    moods: ['blues', 'rock', 'country', 'classic'],
    famousSongs: ['Johnny B. Goode', 'Rock Around the Clock'],
    description: 'A classic 12-bar blues variation. Raw and powerful.',
    keyType: 'major',
  },
  {
    id: 'twelve-bar-blues',
    name: '12-Bar Blues',
    numerals: ['I7', 'I7', 'I7', 'I7', 'IV7', 'IV7', 'I7', 'I7', 'V7', 'IV7', 'I7', 'V7'],
    moods: ['blues', 'classic', 'jam', 'rock'],
    famousSongs: ['Sweet Home Chicago', 'Pride and Joy', 'The Thrill Is Gone', 'Stormy Monday'],
    description: 'The classic 12-bar blues progression. Perfect for jamming and soloing over.',
    keyType: 'major',
  },
  {
    id: 'quick-change-blues',
    name: 'Quick Change Blues',
    numerals: ['I7', 'IV7', 'I7', 'I7', 'IV7', 'IV7', 'I7', 'I7', 'V7', 'IV7', 'I7', 'V7'],
    moods: ['blues', 'jam', 'texas', 'classic'],
    famousSongs: ['Texas Flood', 'Crossroads', 'Red House'],
    description: 'Blues with quick IV change in bar 2. Popular in Texas blues.',
    keyType: 'major',
  },
  // Minor key progressions
  {
    id: 'im-bvi-biii-bvii',
    name: 'i-bVI-bIII-bVII',
    numerals: ['i', 'bVI', 'bIII', 'bVII'],
    moods: ['sad', 'melancholic', 'dramatic', 'emotional'],
    famousSongs: ['All Along the Watchtower', 'Stairway to Heaven', 'Hotel California'],
    description: 'A minor key progression with descending bass. Mysterious and powerful.',
    keyType: 'minor',
  },
  {
    id: 'im-iv-v',
    name: 'i-iv-V',
    numerals: ['i', 'iv', 'V'],
    moods: ['sad', 'dramatic', 'minor', 'emotional'],
    famousSongs: ['Hit the Road Jack', 'Sultans of Swing', 'Rolling in the Deep'],
    description: 'The harmonic minor progression. The major V chord creates tension in a minor key.',
    keyType: 'minor',
  },
  {
    id: 'im-bvii-bvi-v',
    name: 'i-bVII-bVI-V',
    numerals: ['i', 'bVII', 'bVI', 'V'],
    moods: ['dramatic', 'flamenco', 'intense', 'epic'],
    famousSongs: ['Smooth', 'Misirlou', 'Hava Nagila'],
    description: 'The Andalusian cadence. Creates a dramatic, Spanish-influenced sound.',
    keyType: 'minor',
  },
  {
    id: 'im-bvi-biii-iv',
    name: 'i-bVI-bIII-iv',
    numerals: ['i', 'bVI', 'bIII', 'iv'],
    moods: ['sad', 'alternative', 'melancholic', 'chill'],
    famousSongs: ['Mad World', 'Radioactive', 'Boulevard of Broken Dreams'],
    description: 'A modern alternative rock staple. Dark and introspective.',
    keyType: 'minor',
  },
  {
    id: 'im-bvii-iv-i',
    name: 'i-bVII-iv-i',
    numerals: ['i', 'bVII', 'iv', 'i'],
    moods: ['sad', 'rock', 'emotional', 'dark'],
    famousSongs: ['Losing My Religion', 'Paint It Black', 'Black Magic Woman'],
    description: 'A haunting minor progression with natural minor movement.',
    keyType: 'minor',
  },
  {
    id: 'im-iv-bvi-v',
    name: 'i-iv-bVI-V',
    numerals: ['i', 'iv', 'bVI', 'V'],
    moods: ['emotional', 'dramatic', 'powerful', 'epic'],
    famousSongs: ['My Heart Will Go On', 'Show Must Go On', 'Bohemian Rhapsody'],
    description: 'An emotional minor progression with a dramatic resolution.',
    keyType: 'minor',
  },
  {
    id: 'im-biii-bvii-iv',
    name: 'i-bIII-bVII-iv',
    numerals: ['i', 'bIII', 'bVII', 'iv'],
    moods: ['dark', 'rock', 'powerful', 'intense'],
    famousSongs: ['Zombie', 'Bad Guy', 'Stressed Out'],
    description: 'A modern dark pop/rock progression with strong minor character.',
    keyType: 'minor',
  },
];

export function getProgressionsByMood(mood: string): ChordProgression[] {
  return progressions.filter(p =>
    p.moods.some(m => m.toLowerCase().includes(mood.toLowerCase()))
  );
}

export function getProgressionsByKeyType(keyType: 'major' | 'minor'): ChordProgression[] {
  return progressions.filter(p => p.keyType === keyType || p.keyType === 'both');
}

export function searchProgressions(query: string): ChordProgression[] {
  const lowerQuery = query.toLowerCase();
  return progressions.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.moods.some(m => m.toLowerCase().includes(lowerQuery)) ||
    p.famousSongs.some(s => s.toLowerCase().includes(lowerQuery))
  );
}
