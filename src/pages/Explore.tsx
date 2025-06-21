
import { useState, useEffect } from 'react';
import { ThemeProvider } from "@/contexts/ThemeContext";
import { usePalettes } from "@/hooks/usePalettes";
import { usePaletteFiltering } from "@/hooks/usePaletteFiltering";
import { ExploreHeader } from "@/components/explore/ExploreHeader";
import { ExploreFilters } from "@/components/explore/ExploreFilters";
import { PaletteGrid } from "@/components/explore/PaletteGrid";
import { EmptyState } from "@/components/explore/EmptyState";
import { AnalyticsService } from "@/services/analyticsService";
import { SessionService } from "@/services/sessionService";
import { LocalStorageService } from "@/services/localStorageService";
import { PaletteService } from "@/services/paletteService";
import { BentoCard } from "@/components/ui/bento-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ExploreContent = () => {
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('popular');
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();
  
  const { palettes, loading, handleLike, handleShare, refetch } = usePalettes(sortBy);
  const { 
    searchTerm, 
    setSearchTerm, 
    filterBy, 
    setFilterBy, 
    filteredPalettes, 
    getAverageBrightness 
  } = usePaletteFiltering(palettes);

  // Initialize session and track page visit
  useEffect(() => {
    const initializeAnalytics = async () => {
      await SessionService.initializeSession();
      await AnalyticsService.trackPageVisit('explore');
      
      // Update user preferences
      LocalStorageService.updateUserPreferences({
        lastUsedSection: 'explore'
      });
    };
    initializeAnalytics();
  }, []);

  // Seed curated palettes
  const handleSeedPalettes = async () => {
    setIsSeeding(true);
    try {
      await PaletteService.seedCuratedPalettes();
      await refetch();
      toast({
        title: "Success!",
        description: "Curated palettes have been added to the gallery.",
      });
    } catch (error) {
      console.error('Error seeding palettes:', error);
      toast({
        title: "Note",
        description: "Some palettes may already exist in the gallery.",
        variant: "default",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  // Get recent palettes from localStorage
  const recentPalettes = LocalStorageService.getRecentPalettes();

  // Get unique tags from all palettes
  const allTags = Array.from(new Set(
    palettes.flatMap(p => p.tags || [])
  )).slice(0, 8);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <ExploreHeader />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 font-rounded">
            Explore Community Palettes
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-rounded max-w-3xl mx-auto mb-8">
            Discover beautiful color combinations created by designers and developers around the world
          </p>
          
          {/* Seed Button for Demo */}
          {palettes.length < 5 && (
            <Button
              onClick={handleSeedPalettes}
              disabled={isSeeding}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {isSeeding ? 'Adding Palettes...' : 'Add Curated Palettes'}
            </Button>
          )}
        </div>

        {/* Popular Tags */}
        {allTags.length > 0 && (
          <section className="mb-12">
            <BentoCard className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-rounded mb-6">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-3">
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchTerm(`#${tag}`)}
                    className="rounded-full font-rounded hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:border-purple-300"
                  >
                    #{tag}
                  </Button>
                ))}
              </div>
            </BentoCard>
          </section>
        )}

        {/* Recent Palettes Section */}
        {recentPalettes.length > 0 && (
          <section className="mb-12">
            <BentoCard className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-rounded">
                  Your Recent Palettes
                </h3>
                <Badge variant="outline" className="font-rounded">
                  {recentPalettes.length} palette{recentPalettes.length !== 1 ? 's' : ''}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {recentPalettes.slice(0, 4).map((palette) => (
                  <div
                    key={palette.id}
                    className="group cursor-pointer rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                    onClick={() => {
                      const colors = palette.colors.join(',');
                      window.location.href = `/?import=${encodeURIComponent(colors)}`;
                    }}
                  >
                    <div className="h-16 flex">
                      {palette.colors.slice(0, 5).map((color, index) => (
                        <div
                          key={index}
                          className="flex-1 transition-all duration-300 group-hover:scale-110"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white font-rounded">
                        {palette.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-rounded">
                        {new Date(palette.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          </section>
        )}

        {/* Filters & Search */}
        <ExploreFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
        />

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300 font-rounded">
            Showing {filteredPalettes.length} palette{filteredPalettes.length !== 1 ? 's' : ''}
            {sortBy === 'popular' && (
              <Badge variant="outline" className="ml-2 font-rounded">
                Most Popular
              </Badge>
            )}
          </p>
        </div>

        {/* Palettes Grid */}
        <PaletteGrid
          palettes={filteredPalettes}
          loading={loading}
          onLike={handleLike}
          onShare={handleShare}
          getAverageBrightness={getAverageBrightness}
        />

        {filteredPalettes.length === 0 && !loading && <EmptyState />}
      </div>
    </div>
  );
};

const Explore = () => {
  return (
    <ThemeProvider>
      <ExploreContent />
    </ThemeProvider>
  );
};

export default Explore;
