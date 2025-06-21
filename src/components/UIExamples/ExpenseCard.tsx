
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ColorShade {
  name: string;
  hex: string;
  rgb: string;
}

interface ExpenseCardProps {
  shades: ColorShade[];
  title: string;
  amount: string;
  trend: 'up' | 'down';
  percentage?: string;
}

export const ExpenseCard = ({ shades, title, amount, trend, percentage }: ExpenseCardProps) => {
  const lightShade = shades.find(s => s.name === '50')?.hex || '#f8f9fa';
  const mediumShade = shades.find(s => s.name === '500')?.hex || '#6c757d';
  const darkShade = shades.find(s => s.name === '700')?.hex || '#495057';

  return (
    <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-rounded">{title}</h3>
        <div className={`p-2 rounded-lg`} style={{ backgroundColor: lightShade }}>
          {trend === 'up' ? (
            <TrendingUp className="h-5 w-5" style={{ color: mediumShade }} />
          ) : (
            <TrendingDown className="h-5 w-5" style={{ color: mediumShade }} />
          )}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-3xl font-bold text-gray-900 dark:text-white font-rounded">{amount}</p>
        {percentage && (
          <p className="text-sm font-medium" style={{ color: darkShade }}>
            {trend === 'up' ? '+' : '-'}{percentage} from last month
          </p>
        )}
      </div>
    </Card>
  );
};
