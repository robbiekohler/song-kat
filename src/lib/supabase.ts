import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create a real client if credentials are provided, otherwise
// the app still renders (auth/db features will be unavailable).
export const supabase: SupabaseClient = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder');

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
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createSong(song: Omit<DbSong, 'id' | 'created_at'>): Promise<DbSong> {
  const { data, error } = await supabase
    .from('songs')
    .insert(song)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSong(id: string, updates: Partial<DbSong>): Promise<DbSong> {
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
  const { error } = await supabase
    .from('songs')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
