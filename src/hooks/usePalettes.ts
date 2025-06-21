
import { useState, useEffect } from 'react';
import { PaletteService } from "@/services/paletteService";
import { SavedPalette } from "@/lib/supabase-functions";
import { useToast } from "@/hooks/use-toast";
import { AnalyticsService } from "@/services/analyticsService";

export const usePalettes = (sortBy: 'recent' | 'popular' = 'popular') => {
  const [palettes, setPalettes] = useState<SavedPalette[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadPalettes();
  }, [sortBy]);

  const loadPalettes = async () => {
    try {
      setLoading(true);
      const data = await PaletteService.getAllPalettes(sortBy);
      setPalettes(data);
    } catch (error) {
      console.error('Error loading palettes:', error);
      toast({
        title: "Error",
        description: "Failed to load palettes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (paletteId: string) => {
    try {
      await PaletteService.likePalette(paletteId);
      setPalettes(prev => prev.map(p => 
        p.id === paletteId ? { ...p, likes: p.likes + 1 } : p
      ));
      toast({
        title: "Liked!",
        description: "Palette added to your favorites.",
      });
    } catch (error) {
      console.error('Error liking palette:', error);
      toast({
        title: "Error",
        description: "Failed to like palette. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async (palette: SavedPalette) => {
    const shareText = `Check out this beautiful color palette: ${palette.name}`;
    const shareUrl = `${window.location.origin}/?palette=${palette.id}`;
    
    // Track share event
    await AnalyticsService.trackShare(palette.id, navigator.share ? 'native' : 'clipboard');
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: palette.name,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        // Fallback to clipboard if share fails
        navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied!",
          description: "Palette link copied to clipboard.",
        });
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Palette link copied to clipboard.",
      });
    }
  };

  return {
    palettes,
    loading,
    handleLike,
    handleShare,
    refetch: loadPalettes
  };
};
