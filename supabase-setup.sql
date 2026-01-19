-- Supabase Setup for Song Kat
-- Run this in the Supabase SQL Editor

-- Create songs table
CREATE TABLE IF NOT EXISTS songs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  key TEXT NOT NULL,
  progression_id TEXT NOT NULL,
  notes TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only see their own songs
CREATE POLICY "Users can view own songs" ON songs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy: Users can insert their own songs
CREATE POLICY "Users can insert own songs" ON songs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can update their own songs
CREATE POLICY "Users can update own songs" ON songs
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy: Users can delete their own songs
CREATE POLICY "Users can delete own songs" ON songs
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS songs_user_id_idx ON songs(user_id);
CREATE INDEX IF NOT EXISTS songs_created_at_idx ON songs(created_at DESC);
