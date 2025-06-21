import { useState, useEffect, useRef } from 'react';
import { Search, Save, ArrowDown, Copy, Trash2, Share, Plus, Minus, Palette, Sparkles, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { ComponentShowcase } from "@/components/ComponentShowcase";
import { SharePaletteModal } from "@/components/SharePaletteModal";
import { ExportPaletteModal } from "@/components/ExportPaletteModal";
import { SavePaletteModal } from "@/components/SavePaletteModal";
import { ColorRuleSection } from "@/components/ColorRuleSection";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ModernHero } from "@/components/ModernHero";
import { ModernColorInput } from "@/components/ModernColorInput";
import { BentoCard } from "@/components/ui/bento-card";
import { BentoGridPreview } from "@/components/BentoGridPreview";
import { ColorInActionSection } from "@/components/ColorInActionSection";
import { SixtyThirtyTenLayout } from "@/components/SixtyThirtyTenLayout";
import { AnalyticsService } from "@/services/analyticsService";
import { LocalStorageService } from "@/services/localStorageService";
import { SessionService } from "@/services/sessionService";

interface ColorShade {
  name: string;
  hex: string;
  rgb: string;
}

interface ColorPalette {
  primary: ColorShade[];
  secondary: ColorShade[];
  tertiary: ColorShade[];
}

const IndexContent = () => {
  const [primaryColor, setPrimaryColor] = useState('#d5d86e');
  const [secondaryColor, setSecondaryColor] = useState('#10b981');
  const [tertiaryColor, setTertiaryColor] = useState('#f59e0b');
  const [showSecondary, setShowSecondary] = useState(true);
  const [showTertiary, setShowTertiary] = useState(true);
  const [harmonyMode, setHarmonyMode] = useState('complementary');
  const [isColorHarmonyEnabled, setIsColorHarmonyEnabled] = useState(true);
  const [palette, setPalette] = useState<ColorPalette>({
    primary: [],
    secondary: [],
    tertiary: []
  });
  const [paletteTitle, setPaletteTitle] = useState('Lime Harmony');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Ref for smooth scrolling to palette section
  const paletteRef = useRef<HTMLDivElement>(null);

  // Initialize session and track page visit
  useEffect(() => {
    const initializeAnalytics = async () => {
      await SessionService.initializeSession();
      await AnalyticsService.trackPageVisit('home');
    };
    initializeAnalytics();
  }, []);

  // Convert hex to HSL
  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  };

  // Convert HSL to hex
  const hslToHex = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // Generate color shades
  const generateShades = (baseColor: string): ColorShade[] => {
    const [h, s, l] = hexToHsl(baseColor);
    const shades = [
      { name: '50', lightness: 95 },
      { name: '100', lightness: 90 },
      { name: '200', lightness: 80 },
      { name: '300', lightness: 70 },
      { name: '400', lightness: 60 },
      { name: '500', lightness: 50 },
      { name: '600', lightness: 40 },
      { name: '700', lightness: 30 },
      { name: '800', lightness: 20 },
      { name: '900', lightness: 10 },
    ];

    return shades.map(shade => {
      const hex = hslToHex(h, s, shade.lightness);
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      
      return {
        name: shade.name,
        hex,
        rgb: `rgb(${r}, ${g}, ${b})`
      };
    });
  };

  // Generate harmony colors
  const generateHarmonyColors = (baseColor: string, mode: string) => {
    const [h, s, l] = hexToHsl(baseColor);
    
    switch (mode) {
      case 'complementary':
        return [
          baseColor,
          hslToHex((h + 180) % 360, s, l),
          hslToHex((h + 60) % 360, s * 0.8, l)
        ];
      case 'analogous':
        return [
          baseColor,
          hslToHex((h + 30) % 360, s, l),
          hslToHex((h - 30 + 360) % 360, s, l)
        ];
      case 'triadic':
        return [
          baseColor,
          hslToHex((h + 120) % 360, s, l),
          hslToHex((h + 240) % 360, s, l)
        ];
      default:
        return [baseColor, secondaryColor, tertiaryColor];
    }
  };

  // Generate palette with analytics tracking
  const generatePalette = async () => {
    let colors: string[];

    if (isColorHarmonyEnabled) {
      colors = generateHarmonyColors(primaryColor, harmonyMode);
      const [primary, secondary, tertiary] = colors;
      
      if (showSecondary && secondary) setSecondaryColor(secondary);
      if (showTertiary && tertiary) setTertiaryColor(tertiary);
    } else {
      colors = [
        primaryColor,
        showSecondary ? secondaryColor : '',
        showTertiary ? tertiaryColor : ''
      ].filter(Boolean);
    }

    const [primary, secondary, tertiary] = colors;
    
    const newPalette = {
      primary: generateShades(primary),
      secondary: secondary && showSecondary ? generateShades(secondary) : [],
      tertiary: tertiary && showTertiary ? generateShades(tertiary) : []
    };

    setPalette(newPalette);

    const titles = [
      'Lime Harmony', 'Fresh Palette', 'Nature Vibes', 'Green Energy',
      'Citrus Burst', 'Spring Fresh', 'Garden Light', 'Lime Zest'
    ];
    const newTitle = titles[Math.floor(Math.random() * titles.length)];
    setPaletteTitle(newTitle);

    // Store in recent palettes
    const allColors = [
      ...newPalette.primary.map(s => s.hex),
      ...newPalette.secondary.map(s => s.hex),
      ...newPalette.tertiary.map(s => s.hex)
    ];

    LocalStorageService.addRecentPalette({
      id: `local_${Date.now()}`,
      name: newTitle,
      colors: allColors
    });

    // Track palette generation
    await AnalyticsService.trackPaletteGeneration(undefined, {
      harmonyMode: isColorHarmonyEnabled ? harmonyMode : 'manual',
      colorCount: allColors.length,
      paletteTitle: newTitle
    });

    // Update user preferences
    LocalStorageService.updateUserPreferences({
      lastUsedSection: 'generator'
    });

    // Smooth scroll to palette section
    setTimeout(() => {
      if (paletteRef.current) {
        paletteRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100);

    toast({
      title: "Palette Generated!",
      description: "Your new color palette is ready to use.",
    });
  };

  // Copy to clipboard with analytics
  const copyToClipboard = async (text: string, paletteId?: string) => {
    navigator.clipboard.writeText(text);
    
    // Track copy event
    await AnalyticsService.trackCopy(paletteId, text);
    
    // Add to favorite colors if it's a hex color
    if (text.startsWith('#')) {
      LocalStorageService.addFavoriteColor(text);
    }

    toast({
      title: "Copied!",
      description: `${text} copied to clipboard.`,
    });
  };

  // Clear all colors and reset harmony mode
  const clearAllColors = () => {
    setShowSecondary(true);
    setShowTertiary(true);
    setPrimaryColor('#d5d86e');
    setSecondaryColor('#10b981');
    setTertiaryColor('#f59e0b');
    setHarmonyMode('complementary');
    setIsColorHarmonyEnabled(true);
    setPalette({ primary: [], secondary: [], tertiary: [] });
    setPaletteTitle('');
    
    toast({
      title: "Colors Cleared!",
      description: "All colors have been reset and harmony mode is re-enabled.",
    });
  };

  // Handle color changes with immediate update
  const handlePrimaryColorChange = (color: string) => {
    setPrimaryColor(color);
  };

  const handleSecondaryColorChange = (color: string) => {
    setSecondaryColor(color);
    if (isColorHarmonyEnabled) {
      setIsColorHarmonyEnabled(false);
      toast({
        title: "Harmony Mode Disabled",
        description: "Manual color changes disable harmony mode.",
      });
    }
  };

  const handleTertiaryColorChange = (color: string) => {
    setTertiaryColor(color);
    if (isColorHarmonyEnabled) {
      setIsColorHarmonyEnabled(false);
      toast({
        title: "Harmony Mode Disabled",
        description: "Manual color changes disable harmony mode.",
      });
    }
  };

  // Generate initial palette
  useEffect(() => {
    generatePalette();
  }, []);

  // Auto-regenerate when harmony mode or primary color changes in harmony mode
  useEffect(() => {
    if (isColorHarmonyEnabled) {
      generatePalette();
    }
  }, [harmonyMode, primaryColor, isColorHarmonyEnabled]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 font-rounded">
      {/* Modern Header */}
      <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-rounded">
                  ColorCraft Pro
                </h1>
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="font-semibold text-purple-700 dark:text-purple-400 border-b-2 border-purple-500 pb-1">Generate</a>
                <a href="/explore" className="text-gray-600 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400 transition-colors font-medium">Explore</a>
              </nav>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button variant="ghost" size="sm" onClick={() => setShowShareModal(true)} className="text-gray-600 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowSaveModal(true)} className="text-gray-600 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button 
                size="sm" 
                onClick={() => setShowExportModal(true)}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg border-0 px-4 py-2 rounded-xl font-semibold"
              >
                <ArrowDown className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Modern Hero Section */}
        <ModernHero 
          onGeneratePalette={generatePalette}
          onScrollToExport={() => setShowExportModal(true)}
        />

        {/* Color Input Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-rounded">
              Create Your Perfect Palette
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-rounded">
              Choose your colors and let AI handle the harmony, or customize each color individually.
            </p>
          </div>

          {/* Color Harmony Toggle */}
          <BentoCard className="p-8">
            <div className="flex items-center justify-center space-x-4">
              <Checkbox
                id="harmony-mode"
                checked={isColorHarmonyEnabled}
                onCheckedChange={(checked) => setIsColorHarmonyEnabled(!!checked)}
                className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 w-5 h-5"
              />
              <Label 
                htmlFor="harmony-mode" 
                className="text-lg font-semibold text-gray-800 dark:text-gray-200 cursor-pointer font-rounded"
              >
                <Sparkles className="h-5 w-5 inline mr-2" />
                Smart Color Harmony
              </Label>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center font-rounded">
              {isColorHarmonyEnabled 
                ? "AI-powered color theory will automatically create harmonious palettes" 
                : "Manual mode - customize each color individually"
              }
            </p>
          </BentoCard>

          <ModernColorInput
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            tertiaryColor={tertiaryColor}
            showSecondary={showSecondary}
            showTertiary={showTertiary}
            isColorHarmonyEnabled={isColorHarmonyEnabled}
            onPrimaryColorChange={handlePrimaryColorChange}
            onSecondaryColorChange={handleSecondaryColorChange}
            onTertiaryColorChange={handleTertiaryColorChange}
            onToggleSecondary={() => setShowSecondary(!showSecondary)}
            onToggleTertiary={() => setShowTertiary(!showTertiary)}
          />

          {/* Controls */}
          <BentoCard className="p-8">
            <div className="flex flex-col lg:flex-row gap-6 items-end">
              <div className="flex-1">
                <Label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider font-rounded">
                  Color Harmony Mode
                </Label>
                <Select 
                  value={harmonyMode} 
                  onValueChange={setHarmonyMode}
                  disabled={!isColorHarmonyEnabled}
                >
                  <SelectTrigger className={`mt-2 rounded-xl h-12 bg-white dark:bg-gray-800 ${!isColorHarmonyEnabled ? 'opacity-50 cursor-not-allowed' : 'border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400'}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="complementary">Complementary Colors</SelectItem>
                    <SelectItem value="analogous">Analogous Colors</SelectItem>
                    <SelectItem value="triadic">Triadic Colors</SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-rounded">
                  {isColorHarmonyEnabled 
                    ? "AI generates perfect color combinations using color theory" 
                    : "Custom mode - full control over individual colors"
                  }
                </p>
              </div>
              <div className="flex gap-4">
                <Button 
                  variant="outline"
                  onClick={clearAllColors}
                  className="text-red-600 hover:text-red-700 border-red-200 dark:border-red-800 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl px-6 py-3 font-semibold font-rounded"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button 
                  onClick={generatePalette} 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-10 py-3 h-auto text-lg font-bold shadow-2xl rounded-xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-0 font-rounded"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Palette
                </Button>
              </div>
            </div>
          </BentoCard>
        </section>

        {/* Color Palette Preview with analytics integration */}
        {palette.primary.length > 0 && (
          <section className="space-y-8" ref={paletteRef}>
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-rounded">{paletteTitle}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-rounded">
                {isColorHarmonyEnabled 
                  ? `Generated using ${harmonyMode} color harmony` 
                  : 'Custom color combination'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {Object.entries(palette).map(([colorName, shades]) => {
                if (!shades.length) return null;
                
                return (
                  <BentoCard key={colorName} className="overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white capitalize font-rounded">{colorName}</h3>
                        <Badge variant="outline" className="text-sm font-semibold font-rounded bg-white dark:bg-gray-800">
                          {shades.length} shades
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-0">
                      {shades.map((shade, index) => (
                        <div
                          key={shade.name}
                          className="flex items-center justify-between p-4 group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                          onClick={() => copyToClipboard(shade.hex)}
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className="w-12 h-12 rounded-xl shadow-lg border-2 border-white dark:border-gray-600"
                              style={{ backgroundColor: shade.hex }}
                            />
                            <div>
                              <div className="font-bold text-gray-900 dark:text-white font-rounded">{colorName}-{shade.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">{shade.hex}</div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </BentoCard>
                );
              })}
            </div>
          </section>
        )}

        {/* Enhanced "See Your Colors in Action" Section */}
        {palette.primary.length > 0 && (
          <ColorInActionSection palette={palette} />
        )}

        {/* 60/30/10 Layout Section */}
        {palette.primary.length > 0 && palette.secondary.length > 0 && palette.tertiary.length > 0 && (
          <SixtyThirtyTenLayout 
            primaryShades={palette.primary}
            secondaryShades={palette.secondary}
            tertiaryShades={palette.tertiary}
          />
        )}

        {/* Bento Grid Preview Section */}
        {palette.primary.length > 0 && (
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-rounded">
                Preview in Components
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-rounded">
                See how your palette works in real UI components and interfaces
              </p>
            </div>
            <BentoGridPreview palette={palette} />
          </section>
        )}

        {/* Color Rule Section */}
        <ColorRuleSection palette={palette} />

        {/* Component Showcase */}
        <ComponentShowcase palette={palette} />
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-t from-gray-50 via-white to-transparent dark:from-gray-800 dark:via-gray-900 dark:to-transparent py-20 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 font-rounded">Built with passion</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-rounded">Create beautiful color palettes for your next project</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-rounded">Powered by modern design principles & color theory</p>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400 transition-colors font-medium font-rounded">GitHub</a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400 transition-colors font-medium font-rounded">Documentation</a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400 transition-colors font-medium font-rounded">Feedback</a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400 transition-colors font-medium font-rounded">Support</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SharePaletteModal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)}
        paletteTitle={paletteTitle}
        palette={palette}
      />
      <ExportPaletteModal 
        isOpen={showExportModal} 
        onClose={() => setShowExportModal(false)}
        paletteTitle={paletteTitle}
        palette={palette}
      />
      <SavePaletteModal 
        isOpen={showSaveModal} 
        onClose={() => setShowSaveModal(false)}
        palette={palette}
        paletteTitle={paletteTitle}
      />
    </div>
  );
};

const Index = () => {
  return (
    <ThemeProvider>
      <IndexContent />
    </ThemeProvider>
  );
};

export default Index;
