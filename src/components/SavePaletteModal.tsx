
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Heart, Share } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { savePalette } from "@/lib/supabase-functions";

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

interface SavePaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  palette: ColorPalette;
  paletteTitle: string;
}

export const SavePaletteModal = ({ isOpen, onClose, palette, paletteTitle }: SavePaletteModalProps) => {
  const [name, setName] = useState(paletteTitle);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Extract primary colors for saving
      const colors = palette.primary.slice(0, 5).map(shade => shade.hex);
      
      const savedPalette = await savePalette(name, colors);
      
      toast({
        title: "Palette Saved!",
        description: `"${name}" has been saved successfully.`,
      });
      
      onClose();
      setName('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save palette. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const copyShareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied!",
      description: "Share this link to show your palette to others.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Save className="h-5 w-5" />
            <span>Save Your Palette</span>
          </DialogTitle>
          <DialogDescription>
            Give your palette a name and save it to your collection.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="palette-name">Palette Name</Label>
            <Input
              id="palette-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter palette name..."
              className="w-full"
            />
          </div>
          
          {/* Color Preview */}
          <div className="space-y-2">
            <Label>Colors Preview</Label>
            <div className="flex space-x-2">
              {palette.primary.slice(0, 5).map((shade, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-lg border-2 border-white shadow-md"
                  style={{ backgroundColor: shade.hex }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex space-x-2 pt-4">
          <Button
            onClick={handleSave}
            disabled={isSaving || !name.trim()}
            className="flex-1"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Palette'}
          </Button>
          
          <Button
            variant="outline"
            onClick={copyShareLink}
            className="flex-shrink-0"
          >
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
