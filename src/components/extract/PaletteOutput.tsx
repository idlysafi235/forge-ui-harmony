
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, Send, Edit, Palette as PaletteIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ExtractedColor {
  hex: string;
  name?: string;
  usage?: string;
}

interface PaletteOutputProps {
  colors: ExtractedColor[];
  isLoading: boolean;
}

export const PaletteOutput = ({ colors, isLoading }: PaletteOutputProps) => {
  const navigate = useNavigate();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyColor = async (hex: string, index: number) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
      toast({
        title: "Color copied!",
        description: `${hex} copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy color to clipboard",
        variant: "destructive",
      });
    }
  };

  const copyAllColors = async () => {
    const colorList = colors.map(color => color.hex).join(', ');
    try {
      await navigator.clipboard.writeText(colorList);
      toast({
        title: "All colors copied!",
        description: `${colors.length} colors copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy colors to clipboard",
        variant: "destructive",
      });
    }
  };

  const sendToGenerator = () => {
    const colorParams = colors.map(color => color.hex.replace('#', '')).join(',');
    navigate(`/?import=${encodeURIComponent(colorParams)}`);
  };

  const exportPalette = () => {
    const paletteData = {
      colors: colors,
      extractedAt: new Date().toISOString(),
      format: 'extracted-palette'
    };
    
    const blob = new Blob([JSON.stringify(paletteData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-palette.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Palette exported!",
      description: "Downloaded as extracted-palette.json",
    });
  };

  if (isLoading) {
    return (
      <Card className="sticky top-24">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center animate-pulse">
              <PaletteIcon className="h-8 w-8 text-purple-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Extracting Colors...
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Analyzing your content to find the perfect color palette
              </p>
            </div>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (colors.length === 0) {
    return (
      <Card className="sticky top-24">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <PaletteIcon className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No Colors Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Upload an image or enter a website URL to extract colors
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <PaletteIcon className="h-5 w-5 mr-2" />
            Extracted Palette
          </span>
          <Badge variant="secondary">{colors.length} colors</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Color Cards */}
        <div className="space-y-3">
          {colors.map((color, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex">
                {/* Color Preview */}
                <div 
                  className="w-16 h-16 flex-shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                
                {/* Color Info */}
                <div className="flex-1 p-3 bg-white dark:bg-gray-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                      {color.hex}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyColor(color.hex, index)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  {color.name && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      {color.name}
                    </p>
                  )}
                  {color.usage && (
                    <Badge variant="outline" className="text-xs">
                      {color.usage}
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Copy Feedback */}
              {copiedIndex === index && (
                <div className="absolute inset-0 bg-green-500/90 flex items-center justify-center">
                  <span className="text-white font-semibold">Copied!</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button 
            onClick={sendToGenerator}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white"
          >
            <Send className="h-4 w-4 mr-2" />
            Send to Generator
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              onClick={copyAllColors}
              className="text-sm"
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy All
            </Button>
            <Button 
              variant="outline" 
              onClick={exportPalette}
              className="text-sm"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
