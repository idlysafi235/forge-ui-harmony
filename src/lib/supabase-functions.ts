
import { supabase } from "@/integrations/supabase/client";

export interface SavedPalette {
  id: string;
  name: string;
  colors: string[];
  created_at: string;
  likes: number;
  user_id: string | null;
  is_public: boolean;
  copied_count: number;
  exported_count: number;
  source_type?: string;
  tags?: string[];
  source_image_url?: string;
}

// Save a new palette
export const savePalette = async (name: string, colors: string[]) => {
  const { data, error } = await supabase
    .from('palettes')
    .insert({
      name: name || 'Untitled Palette',
      colors: colors,
      is_public: true
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving palette:', error);
    throw error;
  }

  return data;
};

// Get all public palettes
export const getAllPalettes = async (sortBy: 'recent' | 'popular' = 'recent') => {
  const query = supabase
    .from('palettes')
    .select('*')
    .eq('is_public', true);

  if (sortBy === 'popular') {
    query.order('likes', { ascending: false });
  } else {
    query.order('created_at', { ascending: false });
  }

  const { data, error } = await query.limit(50);

  if (error) {
    console.error('Error fetching palettes:', error);
    throw error;
  }

  return data as SavedPalette[];
};

// Like a palette - using RPC function for atomic increment
export const likePalette = async (paletteId: string) => {
  const { data: currentData, error: fetchError } = await supabase
    .from('palettes')
    .select('likes')
    .eq('id', paletteId)
    .single();

  if (fetchError) {
    console.error('Error fetching current likes:', fetchError);
    throw fetchError;
  }

  const { data, error } = await supabase
    .from('palettes')
    .update({ likes: (currentData.likes || 0) + 1 })
    .eq('id', paletteId)
    .select()
    .single();

  if (error) {
    console.error('Error liking palette:', error);
    throw error;
  }

  return data;
};

// Get palette by ID (for sharing)
export const getPaletteById = async (id: string) => {
  const { data, error } = await supabase
    .from('palettes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching palette:', error);
    throw error;
  }

  return data as SavedPalette;
};

// Get popular palettes
export const getPopularPalettes = async (limit: number = 12) => {
  const { data, error } = await supabase
    .from('palettes')
    .select('*')
    .eq('is_public', true)
    .order('likes', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching popular palettes:', error);
    throw error;
  }

  return data as SavedPalette[];
};
