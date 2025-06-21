
import React from 'react';
import { Check } from 'lucide-react';

interface ColorShade {
  name: string;
  hex: string;
  rgb: string;
}

interface TodoItemProps {
  shades: ColorShade[];
  task: string;
  completed?: boolean;
  priority: 'high' | 'medium' | 'low';
}

export const TodoItem = ({ shades, task, completed = false, priority }: TodoItemProps) => {
  const lightShade = shades.find(s => s.name === '100')?.hex || '#f1f3f4';
  const mediumShade = shades.find(s => s.name === '500')?.hex || '#6c757d';
  const accentShade = shades.find(s => s.name === '600')?.hex || '#495057';

  const priorityColors = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#10b981'
  };

  return (
    <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-sm transition-all duration-200">
      <div 
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors duration-200 ${
          completed ? 'border-transparent' : 'border-gray-300'
        }`}
        style={{ 
          backgroundColor: completed ? mediumShade : 'transparent',
          borderColor: completed ? mediumShade : '#d1d5db'
        }}
      >
        {completed && <Check className="w-3 h-3 text-white" />}
      </div>
      <div className="flex-1">
        <p className={`font-medium font-rounded ${completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
          {task}
        </p>
      </div>
      <div 
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: priorityColors[priority] }}
      />
    </div>
  );
};
