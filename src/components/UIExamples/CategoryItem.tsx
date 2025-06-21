
import React from 'react';

interface ColorShade {
  name: string;
  hex: string;
  rgb: string;
}

interface CategoryItemProps {
  shades: ColorShade[];
  icon: string;
  name: string;
  count: string;
}

export const CategoryItem = ({ shades, icon, name, count }: CategoryItemProps) => {
  const lightShade = shades.find(s => s.name === '100')?.hex || '#f1f3f4';
  const mediumShade = shades.find(s => s.name === '500')?.hex || '#6c757d';
  const accentShade = shades.find(s => s.name === '600')?.hex || '#495057';

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-sm transition-all duration-200">
      <div className="flex items-center space-x-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
          style={{ backgroundColor: lightShade, color: accentShade }}
        >
          {icon}
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white font-rounded">{name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-rounded">{count}</p>
        </div>
      </div>
      <div className="text-gray-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};
