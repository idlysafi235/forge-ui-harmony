
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ImageExtractTab } from "@/components/extract/ImageExtractTab";
import { WebsiteExtractTab } from "@/components/extract/WebsiteExtractTab";
import { PaletteOutput } from "@/components/extract/PaletteOutput";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Palette, Image, Globe } from "lucide-react";

interface ExtractedColor {
  hex: string;
  name?: string;
  usage?: string;
}

const Extract = () => {
  const [extractedColors, setExtractedColors] = useState<ExtractedColor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("image");

  const handleColorsExtracted = (colors: ExtractedColor[]) => {
    setExtractedColors(colors);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Palette className="h-6 w-6 text-purple-500" />
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Color Extractor
                </h1>
              </div>
            </div>
            
            {/* Navigation tabs */}
            <nav className="flex space-x-1">
              <Link to="/">
                <Button variant="ghost" size="sm">Generator</Button>
              </Link>
              <Link to="/explore">
                <Button variant="ghost" size="sm">Explore</Button>
              </Link>
              <Button variant="ghost" size="sm" className="bg-purple-100 dark:bg-purple-900/30">
                Extract
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Extract Colors from Any Source
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Upload an image or enter a website URL to extract beautiful color palettes automatically
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Extraction Tools */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="image" className="flex items-center space-x-2">
                      <Image className="h-4 w-4" />
                      <span>Image Extract</span>
                    </TabsTrigger>
                    <TabsTrigger value="website" className="flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span>Website Extract</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="image" className="space-y-4">
                    <ImageExtractTab 
                      onColorsExtracted={handleColorsExtracted}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  </TabsContent>
                  
                  <TabsContent value="website" className="space-y-4">
                    <WebsiteExtractTab 
                      onColorsExtracted={handleColorsExtracted}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Palette Output */}
          <div className="lg:col-span-1">
            <PaletteOutput 
              colors={extractedColors}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Extract;
