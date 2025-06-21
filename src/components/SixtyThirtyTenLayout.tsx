
import React from 'react';
import { BentoCard } from "@/components/ui/bento-card";

interface ColorShade {
  name: string;
  hex: string;
  rgb: string;
}

interface SixtyThirtyTenLayoutProps {
  primaryShades: ColorShade[];
  secondaryShades: ColorShade[];
  tertiaryShades: ColorShade[];
}

export const SixtyThirtyTenLayout = ({ primaryShades, secondaryShades, tertiaryShades }: SixtyThirtyTenLayoutProps) => {
  const primary = primaryShades[5]?.hex || '#6366f1';
  const secondary = secondaryShades[4]?.hex || '#10b981';
  const tertiary = tertiaryShades[6]?.hex || '#f59e0b';

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-rounded">
          60/30/10 Color Rule in Action
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 font-rounded">
          The classic design principle: 60% dominant, 30% secondary, 10% accent colors
        </p>
      </div>

      <BentoCard className="overflow-hidden">
        {/* 60% Background/Dominant Color */}
        <div 
          className="p-12 relative"
          style={{ backgroundColor: primary }}
        >
          <div className="max-w-4xl mx-auto">
            {/* 30% Secondary Content Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div 
                className="p-8 rounded-2xl shadow-lg"
                style={{ backgroundColor: secondary }}
              >
                <h3 className="text-2xl font-bold text-white mb-4 font-rounded">
                  Secondary Color (30%)
                </h3>
                <p className="text-white/90 font-rounded">
                  Used for content areas, navigation, and supporting elements. This creates visual hierarchy and structure.
                </p>
              </div>
              
              <div 
                className="p-8 rounded-2xl shadow-lg"
                style={{ backgroundColor: secondary }}
              >
                <h3 className="text-2xl font-bold text-white mb-4 font-rounded">
                  Content Section
                </h3>
                <p className="text-white/90 font-rounded">
                  Large content blocks use the secondary color to maintain readability while creating contrast.
                </p>
              </div>
            </div>

            {/* 10% Accent/CTA Elements */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                className="px-8 py-4 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-rounded"
                style={{ backgroundColor: tertiary }}
              >
                Primary CTA Button (10%)
              </button>
              <button 
                className="px-6 py-3 rounded-xl font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300 font-rounded"
                style={{ backgroundColor: tertiary }}
              >
                Secondary Action
              </button>
              <div 
                className="px-4 py-2 rounded-full text-sm font-semibold text-white shadow-sm font-rounded"
                style={{ backgroundColor: tertiary }}
              >
                Accent Badge
              </div>
            </div>
          </div>

          {/* Color Legend */}
          <div className="absolute top-4 right-4 space-y-2">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-4 h-4 rounded-full bg-white/20"></div>
              <span className="text-sm font-semibold font-rounded">60% Dominant</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: secondary }}
              ></div>
              <span className="text-sm font-semibold font-rounded">30% Secondary</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: tertiary }}
              ></div>
              <span className="text-sm font-semibold font-rounded">10% Accent</span>
            </div>
          </div>
        </div>
      </BentoCard>

      {/* Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BentoCard className="p-6 text-center">
          <div 
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl"
            style={{ backgroundColor: primary }}
          >
            60%
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-rounded">Dominant Color</h3>
          <p className="text-gray-600 dark:text-gray-300 font-rounded">
            Main background and large areas. Sets the overall mood and atmosphere.
          </p>
        </BentoCard>

        <BentoCard className="p-6 text-center">
          <div 
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl"
            style={{ backgroundColor: secondary }}
          >
            30%
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-rounded">Secondary Color</h3>
          <p className="text-gray-600 dark:text-gray-300 font-rounded">
            Content areas, navigation, and supporting elements for visual hierarchy.
          </p>
        </BentoCard>

        <BentoCard className="p-6 text-center">
          <div 
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl"
            style={{ backgroundColor: tertiary }}
          >
            10%
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-rounded">Accent Color</h3>
          <p className="text-gray-600 dark:text-gray-300 font-rounded">
            Call-to-action buttons, highlights, and important interactive elements.
          </p>
        </BentoCard>
      </div>
    </section>
  );
};
