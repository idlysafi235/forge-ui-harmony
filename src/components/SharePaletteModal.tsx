
import { useState } from 'react';
import { Copy, X, Twitter, Link } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

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

interface SharePaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  paletteTitle: string;
  palette: ColorPalette;
}

export const SharePaletteModal = ({ isOpen, onClose, paletteTitle, palette }: SharePaletteModalProps) => {
  const [editableTitle, setEditableTitle] = useState(paletteTitle);
  
  if (!isOpen) return null;

  const generateShareUrl = () => {
    const baseUrl = window.location.origin;
    const paletteData = encodeURIComponent(JSON.stringify({ title: editableTitle, palette }));
    return `${baseUrl}?palette=${paletteData}`;
  };

  const shareUrl = generateShareUrl();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Share link copied to clipboard.",
    });
  };

  const shareToTwitter = () => {
    const text = `Check out my ${editableTitle} color palette!`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative bg-white/90 backdrop-blur-md rounded-2xl p-8 max-w-[500px] w-full mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Share Palette</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="palette-name" className="text-sm font-medium text-gray-700">
              Palette Name
            </Label>
            <Input
              id="palette-name"
              value={editableTitle}
              onChange={(e) => setEditableTitle(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Share Link</Label>
            <div className="flex space-x-2">
              <Input
                value={shareUrl}
                readOnly
                className="flex-1 bg-gray-50 text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(shareUrl)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={shareToTwitter}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Twitter className="h-4 w-4 mr-2" />
              Share on Twitter
            </Button>
            <Button
              variant="outline"
              onClick={() => copyToClipboard(shareUrl)}
              className="flex-1"
            >
              <Link className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
          </div>

          {/* Color Preview */}
          <div className="border-t pt-4">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Preview</Label>
            <div className="flex space-x-2">
              {Object.entries(palette).map(([colorName, shades]) => {
                if (!shades.length) return null;
                return (
                  <div key={colorName} className="flex-1">
                    <div className="text-xs text-gray-600 mb-1 capitalize">{colorName}</div>
                    <div className="grid grid-cols-5 gap-1">
                      {shades.slice(1, 6).map((shade) => (
                        <div
                          key={shade.name}
                          className="w-full h-8 rounded"
                          style={{ backgroundColor: shade.hex }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
