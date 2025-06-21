
import React from 'react';
import { Sparkles, Palette, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BentoCard } from '@/components/ui/bento-card';

interface ModernHeroProps {
  onGeneratePalette: () => void;
  onScrollToExport: () => void;
}

export const ModernHero = ({ onGeneratePalette, onScrollToExport }: ModernHeroProps) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 dark:from-gray-900 dark:via-purple-950/30 dark:to-purple-900/10" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-lime-400/10 dark:bg-lime-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200 dark:border-purple-800 rounded-full px-4 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">AI-Powered Color Intelligence</span>
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 font-rounded leading-tight">
            Create <span className="text-transparent bg-gradient-to-r from-purple-600 via-purple-500 to-lime-500 bg-clip-text">Stunning</span>
            <br />
            Color Palettes
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-rounded">
            Generate beautiful, accessible color schemes with AI-powered harmony detection. 
            See your colors come to life in real UI components instantly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            onClick={onGeneratePalette}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 h-auto text-lg font-bold shadow-2xl rounded-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 border-0 font-rounded"
          >
            <Palette className="h-5 w-5 mr-2" />
            Generate Palette
          </Button>
          
          <Button 
            variant="outline"
            size="lg" 
            onClick={onScrollToExport}
            className="border-2 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/30 px-8 py-4 h-auto text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 font-rounded"
          >
            <ArrowDown className="h-5 w-5 mr-2" />
            View Components
          </Button>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <BentoCard className="p-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-rounded">AI Color Theory</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-rounded">
                Smart harmony detection using complementary, analogous, and triadic color relationships.
              </p>
            </div>
          </BentoCard>

          <BentoCard className="p-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-lime-500 to-lime-600 flex items-center justify-center">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-rounded">Live Preview</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-rounded">
                See your colors in action with real UI components, charts, and design elements.
              </p>
            </div>
          </BentoCard>

          <BentoCard className="p-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <ArrowDown className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-rounded">Export Ready</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-rounded">
                Export to Tailwind CSS, CSS variables, SCSS, and more formats instantly.
              </p>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};
