
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ExtractedColor {
  hex: string;
  name?: string;
  usage?: string;
}

interface ImageExtractTabProps {
  onColorsExtracted: (colors: ExtractedColor[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const ImageExtractTab = ({ onColorsExtracted, isLoading, setIsLoading }: ImageExtractTabProps) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, GIF, WebP)",
          variant: "destructive",
        });
        return;
      }

      setUploadedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      toast({
        title: "Image uploaded",
        description: "Click 'Extract Colors' to analyze your image",
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false
  });

  const handleExtract = async () => {
    if (!uploadedImage) return;

    setIsLoading(true);
    
    // Simulate extraction delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted colors for now
    const mockColors: ExtractedColor[] = [
      { hex: "#FF6B6B", name: "Coral Red", usage: "Accent" },
      { hex: "#4ECDC4", name: "Turquoise", usage: "Primary" },
      { hex: "#45B7D1", name: "Sky Blue", usage: "Secondary" },
      { hex: "#96CEB4", name: "Mint Green", usage: "Background" },
      { hex: "#FFEAA7", name: "Warm Yellow", usage: "Highlight" },
    ];
    
    onColorsExtracted(mockColors);
    setIsLoading(false);
    
    toast({
      title: "Colors extracted!",
      description: `Found ${mockColors.length} dominant colors in your image`,
    });
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
    onColorsExtracted([]);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {!uploadedImage ? (
        <Card 
          {...getRootProps()} 
          className={`border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragActive 
              ? 'border-purple-400 bg-purple-50 dark:bg-purple-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-purple-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <Upload className="h-8 w-8 text-purple-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {isDragActive ? "Drop your image here" : "Upload an image"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Drag and drop an image, or click to browse
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Supports JPG, PNG, GIF, WebP (max 10MB)
              </p>
            </div>
          </div>
        </Card>
      ) : (
        /* Image Preview */
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <ImageIcon className="h-5 w-5 mr-2" />
                {uploadedImage.name}
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={removeImage}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {imagePreview && (
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full max-h-64 object-contain rounded-lg border border-gray-200 dark:border-gray-700"
                />
              </div>
            )}
            
            <div className="flex justify-between items-center pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                File size: {(uploadedImage.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <Button 
                onClick={handleExtract}
                disabled={isLoading}
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                {isLoading ? "Extracting..." : "Extract Colors"}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
