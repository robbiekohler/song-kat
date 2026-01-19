# Song Kat

A web app to help learn songwriting through chord progressions, famous song references, guitar chord diagrams, and music theory guides.

## Features

### Chord Progression Explorer
- Browse 15+ common progressions (I-V-vi-IV, ii-V-I, etc.)
- Filter by mood: happy, sad, epic, chill, dramatic, and more
- See which famous songs use each progression
- Automatic chord translation to any key (C, D, E, F, G, A, B with sharps/flats)
- Major and minor mode support

### Audio Playback
- Loop any chord progression with Tone.js
- Adjustable tempo (60-180 BPM)
- Beats per chord control (2, 4, or 8 beats)
- **7 Voicing Styles:**
  - Standard - Full chord voicings
  - Power Chord - Root + 5th (punk/rock)
  - Octave - Billy Corgan/Smashing Pumpkins style
  - Sus2 - Dreamy, open feel
  - Sus4 - Tension, U2 style
  - 5th + Octave - Thick rock sound
  - Open/Add9 - Jangly indie rock

### Guitar Chord Diagrams
- SVG chord diagrams with finger positions
- Color-coded fingers (index, middle, ring, pinky)
- **Alternate voicings for difficult chords:**
  - F: Full Barre, Easy (Fmaj7), Mini Barre, Thumb Wrap
  - Bm: Full Barre, Easy (Bm7), Partial, 3-Finger
  - All barre chords have easier alternatives
- Diagrams update based on selected voicing style

### Famous Songs Database
- 50+ songs across rock, pop, folk, jazz, and more
- Search by song name, artist, or genre
- See which chord progression each song uses
- Filter by decade and genre

### Music Theory Guides
- Chord functions (tonic, subdominant, dominant)
- Circle of fifths explained
- Modal flavors and borrowed chords
- Voice leading basics
- **Vocal Harmony Section:**
  - Harmony basics (3rds, 6ths, parallel motion)
  - Finding harmony notes from chord tones
  - Practice tips for couples/duos
  - Famous harmony styles to study

### User Features (Supabase)
- Sign in with Google
- Save favorite progressions
- Create and save song ideas with notes

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Audio:** Tone.js
- **Backend/Auth:** Supabase
- **Routing:** React Router v6

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (for auth features)

### Installation

```bash
# Clone the repo
git clone https://github.com/robbiekohler/song-kat.git
cd song-kat

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file with:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup

1. Create a new Supabase project
2. Run the SQL migration in `supabase/migrations/` to create the songs table
3. Enable Google OAuth in Authentication > Providers (optional)

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── components/       # React components
│   ├── ChordPlayer.tsx      # Audio playback controls
│   ├── GuitarChord.tsx      # SVG chord diagrams
│   ├── ProgressionCard.tsx  # Progression display
│   └── ...
├── data/            # Static data
│   ├── progressions.ts      # Chord progressions
│   ├── famousSongs.ts       # Song database
│   ├── guitarChords.ts      # Chord fingerings
│   └── musicTheory.ts       # Theory tips
├── lib/             # Utilities
│   ├── audioPlayer.ts       # Tone.js integration
│   ├── chordUtils.ts        # Chord transposition
│   └── supabase.ts          # Supabase client
├── pages/           # Route components
└── types/           # TypeScript types
```

## Contributing

Contributions welcome! Feel free to open issues or submit PRs.

## License

MIT
