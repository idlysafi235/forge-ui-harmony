
import React from 'react';
import { Card } from '@/components/ui/card';

interface ColorShade {
  name: string;
  hex: string;
  rgb: string;
}

interface ProfileCardProps {
  shades: ColorShade[];
  name: string;
  title: string;
  image: string;
}

export const ProfileCard = ({ shades, name, title, image }: ProfileCardProps) => {
  const lightShade = shades.find(s => s.name === '50')?.hex || '#f8f9fa';
  const mediumShade = shades.find(s => s.name === '500')?.hex || '#6c757d';
  const accentShade = shades.find(s => s.name === '400')?.hex || '#6c757d';

  return (
    <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col items-center text-center">
        <div 
          className="w-20 h-20 rounded-full mb-4 flex items-center justify-center text-2xl font-bold text-white"
          style={{ backgroundColor: mediumShade }}
        >
          {name.charAt(0)}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 font-rounded">{name}</h3>
        <p className="text-sm font-medium mb-4" style={{ color: accentShade }}>{title}</p>
        <button 
          className="w-full py-2 px-4 rounded-lg font-semibold text-white transition-colors duration-200 hover:opacity-90"
          style={{ backgroundColor: mediumShade }}
        >
          View Profile
        </button>
      </div>
    </Card>
  );
};
