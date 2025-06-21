
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BentoCard } from "@/components/ui/bento-card";
import { ExpenseCard } from './UIExamples/ExpenseCard';
import { CategoryItem } from './UIExamples/CategoryItem';
import { ProfileCard } from './UIExamples/ProfileCard';
import { BudgetChart } from './UIExamples/BudgetChart';
import { TodoItem } from './UIExamples/TodoItem';

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

interface ComponentShowcaseProps {
  palette: ColorPalette;
}

export const ComponentShowcase = ({ palette }: ComponentShowcaseProps) => {
  if (!palette.primary.length) return null;

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-rounded">
          See Your Colors in Action
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 font-rounded">
          Preview how your palette works in real UI components and interfaces
        </p>
      </div>

      {/* Main Component Grid - Inspired by UITailwindColors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Expense Tracking Card */}
        <div className="lg:col-span-1">
          <ExpenseCard 
            shades={palette.primary}
            title="Track your expenses"
            amount="$12,543"
            trend="up"
            percentage="8.2%"
          />
        </div>

        {/* Budget Chart */}
        <div className="lg:col-span-1">
          <BudgetChart shades={palette.primary} />
        </div>

        {/* Profile Card */}
        <div className="lg:col-span-1">
          <ProfileCard 
            shades={palette.primary}
            name="Hannah Laurent"
            title="Product Designer"
            image="/api/placeholder/80/80"
          />
        </div>

        {/* Categories List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-rounded mb-4">Categories</h3>
          <CategoryItem 
            shades={palette.primary}
            icon="🛒"
            name="Groceries"
            count="9 transactions"
          />
          <CategoryItem 
            shades={palette.primary}
            icon="🏠"
            name="Household"
            count="12 transactions"
          />
          <CategoryItem 
            shades={palette.primary}
            icon="✈️"
            name="Travel"
            count="3 transactions"
          />
        </div>

        {/* Income/Expense Summary */}
        <div className="lg:col-span-1 space-y-4">
          <ExpenseCard 
            shades={palette.primary}
            title="Income"
            amount="$15,989"
            trend="up"
            percentage="12.1%"
          />
          <ExpenseCard 
            shades={palette.primary}
            title="Savings"
            amount="$5,210"
            trend="up"
            percentage="5.4%"
          />
        </div>

        {/* Todo List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-rounded mb-4">Todo</h3>
          <TodoItem 
            shades={palette.primary}
            task="Process client feedback in the design proposal"
            completed={true}
            priority="high"
          />
          <TodoItem 
            shades={palette.primary}
            task="Design 5 alternative hero sections for the homepage"
            completed={false}
            priority="medium"
          />
          <TodoItem 
            shades={palette.primary}
            task="Design system meeting preparation"
            completed={false}
            priority="low"
          />
        </div>
      </div>

      {/* Multi-Color Preview Section (when secondary/tertiary colors exist) */}
      {(palette.secondary.length > 0 || palette.tertiary.length > 0) && (
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-rounded">
              Multi-Color Combinations
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-rounded">
              See how your complete palette works together in advanced UI designs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {palette.secondary.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 font-rounded">Secondary Color Usage</h4>
                <ExpenseCard 
                  shades={palette.secondary}
                  title="Create budgets"
                  amount="$8,450"
                  trend="down"
                  percentage="3.1%"
                />
                <CategoryItem 
                  shades={palette.secondary}
                  icon="💼"
                  name="Business"
                  count="15 transactions"
                />
              </div>
            )}

            {palette.tertiary.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 font-rounded">Tertiary Color Usage</h4>
                <ProfileCard 
                  shades={palette.tertiary}
                  name="Alex Chen"
                  title="Frontend Developer"
                  image="/api/placeholder/80/80"
                />
                <TodoItem 
                  shades={palette.tertiary}
                  task="Review design tokens documentation"
                  completed={false}
                  priority="medium"
                />
              </div>
            )}

            {/* Combined Usage Example */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 font-rounded">Combined Palette</h4>
              <BentoCard className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: palette.primary[4]?.hex }}
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 font-rounded">Primary</span>
                  </div>
                  {palette.secondary.length > 0 && (
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: palette.secondary[4]?.hex }}
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 font-rounded">Secondary</span>
                    </div>
                  )}
                  {palette.tertiary.length > 0 && (
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: palette.tertiary[4]?.hex }}
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 font-rounded">Tertiary</span>
                    </div>
                  )}
                </div>
              </BentoCard>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade to Pro Section */}
      <div className="mt-16 text-center">
        <BentoCard className="p-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-rounded">
            Unlock All 20+ UI Examples
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 font-rounded">
            Create and combine up to 3 custom color scales and preview them instantly in over 20 UI Examples.
          </p>
          <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity font-rounded">
            Upgrade to Pro
          </button>
        </BentoCard>
      </div>
    </section>
  );
};
