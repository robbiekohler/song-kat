import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = supabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null!;

// Database types
export interface DbSong {
  id: string;
  user_id: string;
  title: string;
  key: string;
  progression_id: string;
  notes: string;
  created_at: string;
}

export async function getSongs(userId: string): Promise<DbSong[]> {
  if (!supabaseConfigured) return [];
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createSong(song: Omit<DbSong, 'id' | 'created_at'>): Promise<DbSong> {
  if (!supabaseConfigured) throw new Error('Supabase is not configured');
  const { data, error } = await supabase
    .from('songs')
    .insert(song)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSong(id: string, updates: Partial<DbSong>): Promise<DbSong> {
  if (!supabaseConfigured) throw new Error('Supabase is not configured');
  const { data, error } = await supabase
    .from('songs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteSong(id: string): Promise<void> {
  if (!supabaseConfigured) throw new Error('Supabase is not configured');
  const { error } = await supabase
    .from('songs')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
