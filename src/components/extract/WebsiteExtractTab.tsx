
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Globe, ExternalLink, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ExtractedColor {
  hex: string;
  name?: string;
  usage?: string;
}

interface WebsiteExtractTabProps {
  onColorsExtracted: (colors: ExtractedColor[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const WebsiteExtractTab = ({ onColorsExtracted, isLoading, setIsLoading }: WebsiteExtractTabProps) => {
  const [url, setUrl] = useState("");
  const [extractedSite, setExtractedSite] = useState<{
    url: string;
    title: string;
    screenshot?: string;
  } | null>(null);

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleExtract = async () => {
    if (!url.trim()) {
      toast({
        title: "URL required",
        description: "Please enter a website URL to extract colors from",
        variant: "destructive",
      });
      return;
    }

    // Add https:// if not present
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    if (!isValidUrl(formattedUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate extraction delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock extracted colors for now
      const mockColors: ExtractedColor[] = [
        { hex: "#1a202c", name: "Dark Navy", usage: "Header" },
        { hex: "#2d3748", name: "Charcoal", usage: "Navigation" },
        { hex: "#4299e1", name: "Blue", usage: "Links" },
        { hex: "#f7fafc", name: "Light Gray", usage: "Background" },
        { hex: "#e2e8f0", name: "Border Gray", usage: "Borders" },
      ];
      
      setExtractedSite({
        url: formattedUrl,
        title: new URL(formattedUrl).hostname,
        screenshot: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop"
      });
      
      onColorsExtracted(mockColors);
      
      toast({
        title: "Colors extracted!",
        description: `Found ${mockColors.length} dominant colors from the website`,
      });
    } catch (error) {
      toast({
        title: "Extraction failed",
        description: "Unable to extract colors from this website. It may block external access.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearExtraction = () => {
    setUrl("");
    setExtractedSite(null);
    onColorsExtracted([]);
  };

  return (
    <div className="space-y-6">
      {/* URL Input */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Website URL
            </h3>
          </div>
          
          <div className="flex space-x-2">
            <Input
              type="url"
              placeholder="Enter website URL (e.g., google.com, github.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleExtract()}
              className="flex-1"
            />
            <Button 
              onClick={handleExtract}
              disabled={isLoading || !url.trim()}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              {isLoading ? "Extracting..." : "Extract"}
            </Button>
          </div>
          
          <div className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>
              Some websites may block color extraction due to CORS policies. 
              Popular sites like Google, GitHub, and Dribbble usually work well.
            </p>
          </div>
        </div>
      </Card>

      {/* Extracted Site Preview */}
      {extractedSite && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                {extractedSite.title}
              </h3>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.open(extractedSite.url, '_blank')}
                  className="text-purple-500 hover:text-purple-600"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Visit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearExtraction}
                  className="text-gray-500 hover:text-red-500"
                >
                  Clear
                </Button>
              </div>
            </div>
            
            {extractedSite.screenshot && (
              <div className="relative">
                <img 
                  src={extractedSite.screenshot} 
                  alt={`${extractedSite.title} preview`}
                  className="w-full max-h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                />
                <div className="absolute inset-0 bg-black/10 rounded-lg"></div>
              </div>
            )}
            
            <p className="text-sm text-gray-500 dark:text-gray-400 break-all">
              {extractedSite.url}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};
