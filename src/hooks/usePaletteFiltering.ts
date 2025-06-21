
import { useState, useMemo } from 'react';
import { SavedPalette } from "@/lib/supabase-functions";

export const usePaletteFiltering = (palettes: SavedPalette[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'light' | 'dark'>('all');

  const getBrightness = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  const getAverageBrightness = (colors: string[]) => {
    const total = colors.reduce((sum, color) => sum + getBrightness(color), 0);
    return total / colors.length;
  };

  const filteredPalettes = useMemo(() => {
    return palettes.filter(palette => {
      const matchesSearch = palette.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterBy === 'all') return matchesSearch;
      
      const avgBrightness = getAverageBrightness(palette.colors);
      const isLight = avgBrightness > 128;
      
      if (filterBy === 'light') return matchesSearch && isLight;
      if (filterBy === 'dark') return matchesSearch && !isLight;
      
      return matchesSearch;
    });
  }, [palettes, searchTerm, filterBy]);

  return {
    searchTerm,
    setSearchTerm,
    filterBy,
    setFilterBy,
    filteredPalettes,
    getAverageBrightness
  };
};
