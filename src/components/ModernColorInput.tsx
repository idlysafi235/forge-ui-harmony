
import React from 'react';
import { Plus, Minus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { BentoCard } from '@/components/ui/bento-card';

interface ModernColorInputProps {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  showSecondary: boolean;
  showTertiary: boolean;
  isColorHarmonyEnabled: boolean;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
  onTertiaryColorChange: (color: string) => void;
  onToggleSecondary: () => void;
  onToggleTertiary: () => void;
}

export const ModernColorInput = ({
  primaryColor,
  secondaryColor,
  tertiaryColor,
  showSecondary,
  showTertiary,
  isColorHarmonyEnabled,
  onPrimaryColorChange,
  onSecondaryColorChange,
  onTertiaryColorChange,
  onToggleSecondary,
  onToggleTertiary,
}: ModernColorInputProps) => {
  return (
    <BentoCard className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Primary Color */}
        <div className="space-y-4">
          <Label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider font-rounded">
            Primary Color
          </Label>
          <div className="space-y-4">
            <div
              className="h-32 w-full rounded-2xl shadow-lg border-4 border-white dark:border-gray-600 cursor-pointer relative overflow-hidden group transition-all duration-300"
              style={{ backgroundColor: primaryColor }}
            >
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => onPrimaryColorChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-sm font-semibold text-gray-800 font-rounded">Click to change</span>
                </div>
              </div>
            </div>
            <Input
              value={primaryColor}
              onChange={(e) => onPrimaryColorChange(e.target.value)}
              className="text-center rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 font-rounded font-semibold bg-white dark:bg-gray-800"
              placeholder="#d5d86e"
            />
          </div>
        </div>

        {/* Secondary Color */}
        {showSecondary ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider font-rounded">
                Secondary Color
              </Label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onToggleSecondary}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 h-8 w-8 p-0 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div
                className="h-32 w-full rounded-2xl shadow-lg border-4 border-white dark:border-gray-600 cursor-pointer relative overflow-hidden group transition-all duration-300"
                style={{ 
                  backgroundColor: secondaryColor,
                  opacity: isColorHarmonyEnabled ? 0.7 : 1
                }}
              >
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => onSecondaryColorChange(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isColorHarmonyEnabled}
                />
                {isColorHarmonyEnabled && (
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Badge className="bg-purple-500 text-white border-0 font-rounded">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Auto-generated
                    </Badge>
                  </div>
                )}
              </div>
              <Input
                value={secondaryColor}
                onChange={(e) => onSecondaryColorChange(e.target.value)}
                className="text-center rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 font-rounded font-semibold bg-white dark:bg-gray-800"
                placeholder="#10b981"
                disabled={isColorHarmonyEnabled}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider font-rounded">
              Secondary Color
            </Label>
            <Button 
              variant="outline" 
              onClick={onToggleSecondary}
              className="w-full h-32 border-3 border-dashed border-purple-300 dark:border-purple-600 hover:border-purple-500 dark:hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 rounded-2xl transition-all font-rounded text-purple-700 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200"
            >
              <Plus className="h-6 w-6 mr-2" />
              Add Secondary
            </Button>
          </div>
        )}

        {/* Tertiary Color */}
        {showTertiary ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider font-rounded">
                Tertiary Color
              </Label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onToggleTertiary}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 h-8 w-8 p-0 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div
                className="h-32 w-full rounded-2xl shadow-lg border-4 border-white dark:border-gray-600 cursor-pointer relative overflow-hidden group transition-all duration-300"
                style={{ 
                  backgroundColor: tertiaryColor,
                  opacity: isColorHarmonyEnabled ? 0.7 : 1
                }}
              >
                <input
                  type="color"
                  value={tertiaryColor}
                  onChange={(e) => onTertiaryColorChange(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isColorHarmonyEnabled}
                />
                {isColorHarmonyEnabled && (
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Badge className="bg-purple-500 text-white border-0 font-rounded">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Auto-generated
                    </Badge>
                  </div>
                )}
              </div>
              <Input
                value={tertiaryColor}
                onChange={(e) => onTertiaryColorChange(e.target.value)}
                className="text-center rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 font-rounded font-semibold bg-white dark:bg-gray-800"
                placeholder="#f59e0b"
                disabled={isColorHarmonyEnabled}
              />
            </div>
          </div>
        ) : showSecondary ? (
          <div className="space-y-4">
            <Label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider font-rounded">
              Tertiary Color
            </Label>
            <Button 
              variant="outline" 
              onClick={onToggleTertiary}
              className="w-full h-32 border-3 border-dashed border-blue-300 dark:border-blue-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-2xl transition-all font-rounded text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200"
            >
              <Plus className="h-6 w-6 mr-2" />
              Add Tertiary
            </Button>
          </div>
        ) : null}
      </div>
    </BentoCard>
  );
};
