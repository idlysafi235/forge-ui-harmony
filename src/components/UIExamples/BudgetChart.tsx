
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';

interface ColorShade {
  name: string;
  hex: string;
  rgb: string;
}

interface BudgetChartProps {
  shades: ColorShade[];
}

export const BudgetChart = ({ shades }: BudgetChartProps) => {
  const data = [
    { month: 'Jan', amount: 400 },
    { month: 'Feb', amount: 300 },
    { month: 'Mar', amount: 600 },
    { month: 'Apr', amount: 800 },
    { month: 'May', amount: 500 },
    { month: 'Jun', amount: 700 },
  ];

  const barColor = shades.find(s => s.name === '500')?.hex || '#6c757d';
  const lightShade = shades.find(s => s.name === '50')?.hex || '#f8f9fa';

  return (
    <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-rounded">Expenses</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white font-rounded">$12,543</p>
      </div>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis hide />
            <Bar 
              dataKey="amount" 
              fill={barColor}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
