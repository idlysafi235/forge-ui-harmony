
import { Palette } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export const ExploreHeader = () => {
  return (
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
              <a href="/" className="text-gray-600 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400 transition-colors font-medium">Generate</a>
              <a href="/explore" className="font-semibold text-purple-700 dark:text-purple-400 border-b-2 border-purple-500 pb-1">Explore</a>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = '/'}
              className="hover:bg-purple-50 dark:hover:bg-purple-950/30"
            >
              Create Palette
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
