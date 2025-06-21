import { supabase } from "@/integrations/supabase/client";
import { SavedPalette } from "@/lib/supabase-functions";
import { AnalyticsService } from "./analyticsService";

export class PaletteService {
  static async getAllPalettes(sortBy: 'recent' | 'popular' = 'recent'): Promise<SavedPalette[]> {
    const query = supabase
      .from('palettes')
      .select('*')
      .eq('is_public', true);

    if (sortBy === 'popular') {
      // Sort by combined engagement (likes + copies + exports)
      query.order('likes', { ascending: false })
           .order('copied_count', { ascending: false })
           .order('created_at', { ascending: false });
    } else {
      query.order('created_at', { ascending: false });
    }

    const { data, error } = await query.limit(50);

    if (error) {
      console.error('Error fetching palettes:', error);
      throw error;
    }

    return data.map(palette => ({
      ...palette,
      colors: palette.colors as string[]
    })) as SavedPalette[];
  }

  static async likePalette(paletteId: string): Promise<SavedPalette> {
    // Track the like event
    await AnalyticsService.trackLike(paletteId);

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

    return {
      ...data,
      colors: data.colors as string[]
    };
  }

  static async copyPalette(paletteId: string): Promise<void> {
    // Track the copy event
    await AnalyticsService.trackCopy(paletteId);

    // Increment copy count using RPC or manual fetch-update
    const { data: currentData, error: fetchError } = await supabase
      .from('palettes')
      .select('copied_count')
      .eq('id', paletteId)
      .single();

    if (fetchError) {
      console.error('Error fetching current copy count:', fetchError);
      return;
    }

    const { error } = await supabase
      .from('palettes')
      .update({ 
        copied_count: (currentData.copied_count || 0) + 1
      })
      .eq('id', paletteId);

    if (error) {
      console.error('Error updating copy count:', error);
    }
  }

  static async exportPalette(paletteId: string, format: string): Promise<void> {
    // Track the export event
    await AnalyticsService.trackExport(paletteId, format);

    // Increment export count using manual fetch-update
    const { data: currentData, error: fetchError } = await supabase
      .from('palettes')
      .select('exported_count')
      .eq('id', paletteId)
      .single();

    if (fetchError) {
      console.error('Error fetching current export count:', fetchError);
      return;
    }

    const { error } = await supabase
      .from('palettes')
      .update({ 
        exported_count: (currentData.exported_count || 0) + 1
      })
      .eq('id', paletteId);

    if (error) {
      console.error('Error updating export count:', error);
    }
  }

  static async savePalette(name: string, colors: string[], tags?: string[]): Promise<SavedPalette> {
    const { data, error } = await supabase
      .from('palettes')
      .insert({
        name: name || 'Untitled Palette',
        colors: colors,
        is_public: true,
        tags: tags || [],
        source_type: 'manual'
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving palette:', error);
      throw error;
    }

    // Track palette generation
    await AnalyticsService.trackPaletteGeneration(data.id, { name, colorCount: colors.length });

    return {
      ...data,
      colors: data.colors as string[]
    };
  }

  static async getPaletteById(id: string): Promise<SavedPalette> {
    const { data, error } = await supabase
      .from('palettes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching palette:', error);
      throw error;
    }

    return {
      ...data,
      colors: data.colors as string[]
    } as SavedPalette;
  }

  static async getTrendingPalettes(limit: number = 12): Promise<SavedPalette[]> {
    // Get palettes with high engagement in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data, error } = await supabase
      .from('palettes')
      .select('*')
      .eq('is_public', true)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('likes', { ascending: false })
      .order('copied_count', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching trending palettes:', error);
      throw error;
    }

    return data.map(palette => ({
      ...palette,
      colors: palette.colors as string[]
    })) as SavedPalette[];
  }

  static async searchPalettes(query: string, tags?: string[]): Promise<SavedPalette[]> {
    let supabaseQuery = supabase
      .from('palettes')
      .select('*')
      .eq('is_public', true);

    if (query) {
      supabaseQuery = supabaseQuery.ilike('name', `%${query}%`);
    }

    if (tags && tags.length > 0) {
      supabaseQuery = supabaseQuery.overlaps('tags', tags);
    }

    const { data, error } = await supabaseQuery
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error searching palettes:', error);
      throw error;
    }

    return data.map(palette => ({
      ...palette,
      colors: palette.colors as string[]
    })) as SavedPalette[];
  }

  static async seedCuratedPalettes(): Promise<void> {
    const curatedPalettes = [
      {
        name: "Muted Ocean",
        colors: ["#a3bfcf", "#7d98a1", "#5e7c88", "#3e4c59", "#1e2a38"],
        tags: ["Muted", "Cool", "Nature"],
        source_type: "curated"
      },
      {
        name: "Retro Sunset",
        colors: ["#f4a261", "#e76f51", "#2a9d8f", "#264653", "#fefae0"],
        tags: ["Warm", "Retro", "Contrast"],
        source_type: "curated"
      },
      {
        name: "Cyber Night",
        colors: ["#0f0f0f", "#8a2be2", "#00ffff", "#ff00ff", "#ffffff"],
        tags: ["Dark", "Vibrant", "Neon", "Futuristic"],
        source_type: "curated"
      },
      {
        name: "Calm Forest",
        colors: ["#e3f9e5", "#c1e1c1", "#7ca982", "#3b5d50", "#253237"],
        tags: ["Earthy", "Soft", "Neutral"],
        source_type: "curated"
      },
      {
        name: "Tech Minimal",
        colors: ["#fefefe", "#f1f5f9", "#cbd5e1", "#64748b", "#1e293b"],
        tags: ["Minimal", "UI-Ready", "Light"],
        source_type: "curated"
      },
      {
        name: "Luxury Gold",
        colors: ["#ffd700", "#daa520", "#b8860b", "#8b6914", "#654321"],
        tags: ["Luxury", "Warm", "Elegant"],
        source_type: "curated"
      },
      {
        name: "Arctic Blue",
        colors: ["#e6f3ff", "#b3d9ff", "#80bfff", "#4da6ff", "#1a8cff"],
        tags: ["Cool", "Clean", "Professional"],
        source_type: "curated"
      },
      {
        name: "Berry Burst",
        colors: ["#ff6b9d", "#e0518b", "#c43678", "#a71c65", "#8a0252"],
        tags: ["Vibrant", "Bold", "Energetic"],
        source_type: "curated"
      },
      {
        name: "Midnight Sky",
        colors: ["#1a1a2e", "#16213e", "#0f3460", "#533483", "#e94560"],
        tags: ["Dark", "Mystery", "Night"],
        source_type: "curated"
      },
      {
        name: "Desert Sand",
        colors: ["#f4e4c1", "#e6d3a3", "#d4af37", "#cd853f", "#8b4513"],
        tags: ["Warm", "Earthy", "Natural"],
        source_type: "curated"
      }
    ];

    for (const palette of curatedPalettes) {
      try {
        await supabase.from('palettes').insert({
          name: palette.name,
          colors: palette.colors,
          is_public: true,
          tags: palette.tags,
          source_type: palette.source_type,
          likes: Math.floor(Math.random() * 50) + 10, // Random likes for demo
          copied_count: Math.floor(Math.random() * 100) + 20,
          exported_count: Math.floor(Math.random() * 30) + 5
        });
      } catch (error) {
        console.log('Palette might already exist:', palette.name);
      }
    }
  }
}
