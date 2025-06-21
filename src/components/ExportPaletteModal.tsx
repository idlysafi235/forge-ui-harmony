
import { useState } from 'react';
import { Copy, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
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

interface ExportPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  paletteTitle: string;
  palette: ColorPalette;
}

export const ExportPaletteModal = ({ isOpen, onClose, paletteTitle, palette }: ExportPaletteModalProps) => {
  const [activeTab, setActiveTab] = useState('tailwind3');
  const [activeFormat, setActiveFormat] = useState('hex');
  
  if (!isOpen) return null;

  const formatColor = (hex: string, format: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    switch (format) {
      case 'rgb':
        return `rgb(${r}, ${g}, ${b})`;
      case 'hsl':
        // Convert RGB to HSL
        const rNorm = r / 255;
        const gNorm = g / 255;
        const bNorm = b / 255;
        const max = Math.max(rNorm, gNorm, bNorm);
        const min = Math.min(rNorm, gNorm, bNorm);
        let h = 0, s = 0, l = (max + min) / 2;

        if (max !== min) {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
            case gNorm: h = (bNorm - rNorm) / d + 2; break;
            case bNorm: h = (rNorm - gNorm) / d + 4; break;
          }
          h /= 6;
        }

        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
      case 'hex':
      default:
        return hex;
    }
  };

  const generateExportCode = () => {
    const cleanTitle = paletteTitle.toLowerCase().replace(/\s+/g, '_');
    
    if (activeTab === 'tailwind3') {
      let code = `// ${paletteTitle} - Tailwind CSS Configuration\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n`;
      
      Object.entries(palette).forEach(([colorName, shades]) => {
        if (shades.length > 0) {
          code += `        ${colorName}: {\n`;
          shades.forEach(shade => {
            code += `          '${shade.name}': '${formatColor(shade.hex, activeFormat)}',\n`;
          });
          code += `        },\n`;
        }
      });
      
      code += `      }\n    }\n  }\n}`;
      return code;
    }
    
    if (activeTab === 'css') {
      let code = `/* ${paletteTitle} - CSS Variables */\n:root {\n`;
      
      Object.entries(palette).forEach(([colorName, shades]) => {
        if (shades.length > 0) {
          shades.forEach(shade => {
            code += `  --${colorName}-${shade.name}: ${formatColor(shade.hex, activeFormat)};\n`;
          });
        }
      });
      
      code += `}`;
      return code;
    }
    
    if (activeTab === 'scss') {
      let code = `// ${paletteTitle} - SCSS Variables\n`;
      
      Object.entries(palette).forEach(([colorName, shades]) => {
        if (shades.length > 0) {
          shades.forEach(shade => {
            code += `$${colorName}-${shade.name}: ${formatColor(shade.hex, activeFormat)};\n`;
          });
        }
      });
      
      return code;
    }

    return '';
  };

  const exportCode = generateExportCode();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exportCode);
    toast({
      title: "Copied!",
      description: "Export code copied to clipboard.",
    });
  };

  const downloadFile = () => {
    const extension = activeTab === 'css' ? 'css' : activeTab === 'scss' ? 'scss' : 'js';
    const blob = new Blob([exportCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${paletteTitle.toLowerCase().replace(/\s+/g, '-')}-palette.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl p-8 max-w-[600px] w-full mx-4 shadow-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Export Palette</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'tailwind3', label: 'Tailwind 3' },
            { id: 'css', label: 'CSS' },
            { id: 'scss', label: 'SCSS' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Format Selection */}
        <div className="flex space-x-1 mb-6 bg-gray-50 rounded-lg p-1">
          {[
            { id: 'hex', label: 'HEX' },
            { id: 'rgb', label: 'RGB' },
            { id: 'hsl', label: 'HSL' }
          ].map(format => (
            <button
              key={format.id}
              onClick={() => setActiveFormat(format.id)}
              className={`flex-1 px-3 py-1 text-sm font-medium rounded transition-colors ${
                activeFormat === format.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {format.label}
            </button>
          ))}
        </div>

        {/* Code Block */}
        <div className="flex-1 overflow-hidden">
          <div className="relative bg-gray-900 rounded-lg p-4 h-full overflow-auto">
            <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
              {exportCode}
            </pre>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="absolute top-2 right-2 text-gray-300 hover:text-white"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 mt-6">
          <Button onClick={copyToClipboard} className="flex-1">
            <Copy className="h-4 w-4 mr-2" />
            Copy to Clipboard
          </Button>
          <Button variant="outline" onClick={downloadFile} className="flex-1">
            Download File
          </Button>
        </div>
      </div>
    </div>
  );
};
