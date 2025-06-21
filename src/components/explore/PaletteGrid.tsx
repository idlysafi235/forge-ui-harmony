
import { Heart, Share, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BentoCard } from "@/components/ui/bento-card";
import { SavedPalette } from "@/lib/supabase-functions";
import { PaletteService } from "@/services/paletteService";
import { LocalStorageService } from "@/services/localStorageService";

interface PaletteGridProps {
  palettes: SavedPalette[];
  loading: boolean;
  onLike: (paletteId: string) => void;
  onShare: (palette: SavedPalette) => void;
  getAverageBrightness: (colors: string[]) => number;
}

export const PaletteGrid = ({ palettes, loading, onLike, onShare, getAverageBrightness }: PaletteGridProps) => {
  const handleUsePalette = async (palette: SavedPalette) => {
    // Track copy event
    await PaletteService.copyPalette(palette.id);
    
    // Add to recent palettes
    LocalStorageService.addRecentPalette({
      id: palette.id,
      name: palette.name,
      colors: palette.colors
    });

    // Navigate to main page with palette data
    const colors = palette.colors.join(',');
    window.location.href = `/?import=${encodeURIComponent(colors)}`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <BentoCard key={i} className="animate-pulse">
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-t-xl"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          </BentoCard>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {palettes.map((palette) => (
        <BentoCard key={palette.id} className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
          {/* Color Preview */}
          <div className="h-24 flex">
            {palette.colors.slice(0, 5).map((color, index) => (
              <div
                key={index}
                className="flex-1 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg font-rounded mb-2">
                  {palette.name}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-rounded">{palette.colors.length} colors</span>
                  <Badge variant="outline" className="font-rounded">
                    {getAverageBrightness(palette.colors) > 128 ? 'Light' : 'Dark'}
                  </Badge>
                  {(palette.copied_count || 0) > 0 && (
                    <Badge variant="secondary" className="font-rounded text-xs">
                      {palette.copied_count} copies
                    </Badge>
                  )}
                </div>
                {/* Tags */}
                {palette.tags && palette.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {palette.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs font-rounded">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLike(palette.id)}
                  className="text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  {palette.likes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onShare(palette)}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                >
                  <Share className="h-4 w-4" />
                </Button>
              </div>
              <Button
                size="sm"
                onClick={() => handleUsePalette(palette)}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-semibold"
              >
                <Eye className="h-4 w-4 mr-2" />
                Use
              </Button>
            </div>
          </div>
        </BentoCard>
      ))}
    </div>
  );
};
