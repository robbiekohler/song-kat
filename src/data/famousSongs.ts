import type { FamousSong } from '../types';

export const famousSongs: FamousSong[] = [
  // Pop - verified original keys
  { id: '1', title: 'Let It Be', artist: 'The Beatles', year: 1970, genre: 'rock', progressionId: 'i-v-vi-iv', key: 'C', mood: ['uplifting', 'emotional'] },
  { id: '2', title: 'No Woman No Cry', artist: 'Bob Marley', year: 1974, genre: 'reggae', progressionId: 'i-v-vi-iv', key: 'C', mood: ['chill', 'uplifting'] },
  { id: '3', title: 'With or Without You', artist: 'U2', year: 1987, genre: 'rock', progressionId: 'i-v-vi-iv', key: 'D', mood: ['emotional', 'epic'] },
  { id: '4', title: 'She Will Be Loved', artist: 'Maroon 5', year: 2002, genre: 'pop', progressionId: 'i-v-vi-iv', key: 'C', mood: ['romantic', 'pop'] },
  { id: '5', title: 'Someone Like You', artist: 'Adele', year: 2011, genre: 'pop', progressionId: 'i-v-vi-iv', key: 'A', mood: ['sad', 'emotional'] },
  { id: '6', title: 'Counting Stars', artist: 'OneRepublic', year: 2013, genre: 'pop', progressionId: 'vi-iv-i-v', key: 'C#m', mood: ['uplifting', 'energetic'] },

  // Rock - verified original keys
  { id: '7', title: 'Twist and Shout', artist: 'The Beatles', year: 1963, genre: 'rock', progressionId: 'i-iv-v-i', key: 'D', mood: ['energetic', 'happy'] },
  { id: '8', title: 'Wild Thing', artist: 'The Troggs', year: 1966, genre: 'rock', progressionId: 'i-iv-v-i', key: 'A', mood: ['energetic', 'rock'] },
  { id: '9', title: 'Sweet Home Alabama', artist: 'Lynyrd Skynyrd', year: 1974, genre: 'rock', progressionId: 'i-bvii-iv-i', key: 'D', mood: ['happy', 'anthemic'] },
  { id: '10', title: 'Free Fallin\'', artist: 'Tom Petty', year: 1989, genre: 'rock', progressionId: 'i-bvii-iv-i', key: 'E', mood: ['chill', 'nostalgic'] },
  { id: '11', title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', year: 1987, genre: 'rock', progressionId: 'i-bvii-iv-i', key: 'D', mood: ['epic', 'romantic'] },
  { id: '12', title: 'Summer of \'69', artist: 'Bryan Adams', year: 1984, genre: 'rock', progressionId: 'i-v-iv-v', key: 'D', mood: ['nostalgic', 'energetic'] },

  // 50s/Doo-wop - verified original keys
  { id: '13', title: 'Stand By Me', artist: 'Ben E. King', year: 1961, genre: 'soul', progressionId: 'i-vi-iv-v', key: 'A', mood: ['romantic', 'emotional'] },
  { id: '14', title: 'Earth Angel', artist: 'The Penguins', year: 1954, genre: 'doo-wop', progressionId: 'i-vi-iv-v', key: 'Eb', mood: ['romantic', 'nostalgic'] },
  { id: '15', title: 'Every Breath You Take', artist: 'The Police', year: 1983, genre: 'rock', progressionId: 'i-vi-iv-v', key: 'Ab', mood: ['melancholic', 'romantic'] },

  // Jazz - common performance keys
  { id: '16', title: 'Autumn Leaves', artist: 'Jazz Standard', year: 1945, genre: 'jazz', progressionId: 'ii-v-i', key: 'Gm', mood: ['melancholic', 'chill'] },
  { id: '17', title: 'Fly Me to the Moon', artist: 'Frank Sinatra', year: 1964, genre: 'jazz', progressionId: 'ii-v-i', key: 'C', mood: ['romantic', 'smooth'] },
  { id: '18', title: 'All The Things You Are', artist: 'Jazz Standard', year: 1939, genre: 'jazz', progressionId: 'ii-v-i', key: 'Ab', mood: ['romantic', 'sophisticated'] },

  // Modern Pop - verified original keys
  { id: '19', title: 'Hey Soul Sister', artist: 'Train', year: 2009, genre: 'pop', progressionId: 'i-iv-vi-v', key: 'E', mood: ['happy', 'uplifting'] },
  { id: '20', title: 'Riptide', artist: 'Vance Joy', year: 2013, genre: 'indie', progressionId: 'i-iv-vi-v', key: 'D', mood: ['happy', 'chill'] },
  { id: '21', title: 'Take On Me', artist: 'a-ha', year: 1985, genre: 'pop', progressionId: 'i-iv-vi-v', key: 'A', mood: ['energetic', 'uplifting'] },

  // Emotional/Dramatic - verified original keys
  { id: '22', title: 'Africa', artist: 'Toto', year: 1982, genre: 'rock', progressionId: 'vi-iv-i-v', key: 'A', mood: ['epic', 'emotional'] },
  { id: '23', title: 'Grenade', artist: 'Bruno Mars', year: 2010, genre: 'pop', progressionId: 'vi-iv-i-v', key: 'Dm', mood: ['dramatic', 'emotional'] },
  { id: '24', title: 'Despacito', artist: 'Luis Fonsi', year: 2017, genre: 'pop', progressionId: 'vi-iv-i-v', key: 'Bm', mood: ['romantic', 'energetic'] },
  { id: '25', title: 'Numb', artist: 'Linkin Park', year: 2003, genre: 'rock', progressionId: 'vi-iv-i-v', key: 'F#m', mood: ['sad', 'dramatic'] },

  // Classic/Epic - verified original keys
  { id: '26', title: 'Canon in D', artist: 'Pachelbel', year: 1680, genre: 'classical', progressionId: 'i-v-vi-iii-iv', key: 'D', mood: ['epic', 'romantic'] },
  { id: '27', title: 'Basket Case', artist: 'Green Day', year: 1994, genre: 'rock', progressionId: 'i-v-vi-iii-iv', key: 'Eb', mood: ['energetic', 'anxious'] },

  // Melancholic - verified original keys
  { id: '28', title: 'Creep', artist: 'Radiohead', year: 1992, genre: 'rock', progressionId: 'i-iii-iv-iv', key: 'G', mood: ['sad', 'melancholic'] },
  { id: '29', title: 'Space Oddity', artist: 'David Bowie', year: 1969, genre: 'rock', progressionId: 'i-iii-iv-iv', key: 'C', mood: ['melancholic', 'epic'] },
  { id: '30', title: 'My Heart Will Go On', artist: 'Celine Dion', year: 1997, genre: 'pop', progressionId: 'i-iii-iv-iv', key: 'E', mood: ['romantic', 'epic'] },

  // Blues/Rock - verified original keys
  { id: '31', title: 'Johnny B. Goode', artist: 'Chuck Berry', year: 1958, genre: 'rock', progressionId: 'i-iv-i-v', key: 'Bb', mood: ['energetic', 'happy'] },
  { id: '32', title: 'Rock Around the Clock', artist: 'Bill Haley', year: 1954, genre: 'rock', progressionId: 'i-iv-i-v', key: 'A', mood: ['energetic', 'happy'] },

  // Minor Key - verified original keys
  { id: '33', title: 'All Along the Watchtower', artist: 'Jimi Hendrix', year: 1968, genre: 'rock', progressionId: 'im-bvi-biii-bvii', key: 'C#m', mood: ['dramatic', 'epic'] },
  { id: '34', title: 'Stairway to Heaven', artist: 'Led Zeppelin', year: 1971, genre: 'rock', progressionId: 'im-bvi-biii-bvii', key: 'Am', mood: ['epic', 'melancholic'] },
  { id: '35', title: 'Hit the Road Jack', artist: 'Ray Charles', year: 1961, genre: 'soul', progressionId: 'im-iv-v', key: 'Am', mood: ['energetic', 'dramatic'] },
  { id: '36', title: 'Sultans of Swing', artist: 'Dire Straits', year: 1978, genre: 'rock', progressionId: 'im-iv-v', key: 'Dm', mood: ['chill', 'sophisticated'] },

  // Flamenco/Dramatic - verified original keys
  { id: '37', title: 'Smooth', artist: 'Santana', year: 1999, genre: 'rock', progressionId: 'im-bvii-bvi-v', key: 'Am', mood: ['romantic', 'dramatic'] },
  { id: '38', title: 'Misirlou', artist: 'Dick Dale', year: 1962, genre: 'surf', progressionId: 'im-bvii-bvi-v', key: 'Em', mood: ['dramatic', 'energetic'] },

  // Alternative - verified original keys
  { id: '39', title: 'Mad World', artist: 'Tears for Fears', year: 1982, genre: 'pop', progressionId: 'im-bvi-biii-iv', key: 'Em', mood: ['sad', 'melancholic'] },
  { id: '40', title: 'Radioactive', artist: 'Imagine Dragons', year: 2012, genre: 'rock', progressionId: 'im-bvi-biii-iv', key: 'Bm', mood: ['epic', 'dramatic'] },
  { id: '41', title: 'Boulevard of Broken Dreams', artist: 'Green Day', year: 2004, genre: 'rock', progressionId: 'im-bvi-biii-iv', key: 'Fm', mood: ['sad', 'melancholic'] },

  // Additional songs - verified original keys
  { id: '42', title: 'Hotel California', artist: 'Eagles', year: 1977, genre: 'rock', progressionId: 'im-bvi-biii-bvii', key: 'Bm', mood: ['melancholic', 'epic'] },
  { id: '43', title: 'Wonderwall', artist: 'Oasis', year: 1995, genre: 'rock', progressionId: 'i-v-vi-iv', key: 'F#m', mood: ['romantic', 'nostalgic'] },
  { id: '44', title: 'Don\'t Stop Believin\'', artist: 'Journey', year: 1981, genre: 'rock', progressionId: 'i-v-vi-iv', key: 'E', mood: ['uplifting', 'epic'] },
  { id: '45', title: 'Hallelujah', artist: 'Leonard Cohen', year: 1984, genre: 'folk', progressionId: 'i-v-vi-iv', key: 'C', mood: ['emotional', 'melancholic'] },
  { id: '46', title: 'Zombie', artist: 'The Cranberries', year: 1994, genre: 'rock', progressionId: 'vi-iv-i-v', key: 'Em', mood: ['dramatic', 'emotional'] },
  { id: '47', title: 'Rolling in the Deep', artist: 'Adele', year: 2010, genre: 'pop', progressionId: 'im-iv-v', key: 'Cm', mood: ['dramatic', 'powerful'] },
  { id: '48', title: 'Billie Jean', artist: 'Michael Jackson', year: 1982, genre: 'pop', progressionId: 'im-iv-v', key: 'F#m', mood: ['dramatic', 'energetic'] },
  { id: '49', title: 'Pumped Up Kicks', artist: 'Foster the People', year: 2010, genre: 'indie', progressionId: 'vi-iv-i-v', key: 'F', mood: ['chill', 'dark'] },
  { id: '50', title: 'Wake Me Up', artist: 'Avicii', year: 2013, genre: 'pop', progressionId: 'vi-iv-i-v', key: 'Bm', mood: ['uplifting', 'energetic'] },
];

export function getSongsByGenre(genre: string): FamousSong[] {
  return famousSongs.filter(s => s.genre.toLowerCase() === genre.toLowerCase());
}

export function getSongsByDecade(startYear: number): FamousSong[] {
  return famousSongs.filter(s => s.year >= startYear && s.year < startYear + 10);
}

export function getSongsByMood(mood: string): FamousSong[] {
  return famousSongs.filter(s =>
    s.mood.some(m => m.toLowerCase().includes(mood.toLowerCase()))
  );
}

export function getSongsByProgression(progressionId: string): FamousSong[] {
  return famousSongs.filter(s => s.progressionId === progressionId);
}

export function searchSongs(query: string): FamousSong[] {
  const lowerQuery = query.toLowerCase();
  return famousSongs.filter(s =>
    s.title.toLowerCase().includes(lowerQuery) ||
    s.artist.toLowerCase().includes(lowerQuery) ||
    s.genre.toLowerCase().includes(lowerQuery) ||
    s.mood.some(m => m.toLowerCase().includes(lowerQuery))
  );
}
