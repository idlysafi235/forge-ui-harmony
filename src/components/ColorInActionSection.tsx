
import React from 'react';
import { Bell, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BentoCard } from "@/components/ui/bento-card";
import { ProfileCard } from "@/components/color-preview/ProfileCard";
import { StatsWidget } from "@/components/color-preview/StatsWidget";
import { TaskList } from "@/components/color-preview/TaskList";

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

interface ColorInActionSectionProps {
  palette: ColorPalette;
}

export const ColorInActionSection = ({ palette }: ColorInActionSectionProps) => {
  const getPrimaryColor = (shadeIndex: number = 5) => palette.primary[shadeIndex]?.hex || '#6366f1';
  const getSecondaryColor = (shadeIndex: number = 4) => palette.secondary[shadeIndex]?.hex || '#10b981';
  const getTertiaryColor = (shadeIndex: number = 6) => palette.tertiary[shadeIndex]?.hex || '#f59e0b';

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-rounded">
          See Your Colors in Action
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 font-rounded">
          Experience how your palette works in real-world UI components and interfaces
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProfileCard 
          primaryColor={getPrimaryColor()}
          secondaryColor={getSecondaryColor()}
          tertiaryColor={getTertiaryColor()}
        />

        <StatsWidget 
          primaryColor={getPrimaryColor()}
          secondaryColor={getSecondaryColor()}
        />

        {/* Notification Card */}
        <BentoCard className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: getPrimaryColor() }}
              >
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white font-rounded">New Message</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-rounded">2 minutes ago</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-rounded">
              Your color palette has been approved and is now live!
            </p>
            <Button 
              size="sm" 
              className="w-full text-white font-semibold font-rounded"
              style={{ backgroundColor: getTertiaryColor() }}
            >
              View Details
            </Button>
          </div>
        </BentoCard>

        {/* Form Card */}
        <BentoCard className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-rounded">Quick Form</h3>
            <div className="space-y-3">
              <Input 
                placeholder="Enter your name" 
                className="border-2 focus:border-2 focus:ring-0"
                style={{ 
                  borderColor: getPrimaryColor(),
                  outline: 'none'
                }}
              />
              <Input 
                placeholder="Enter your email" 
                type="email"
                className="border-2 focus:border-2 focus:ring-0"
                style={{ 
                  borderColor: getSecondaryColor(),
                  outline: 'none'
                }}
              />
              <Button 
                className="w-full text-white font-semibold font-rounded"
                style={{ backgroundColor: getTertiaryColor() }}
              >
                Submit Form
              </Button>
            </div>
          </div>
        </BentoCard>

        <TaskList 
          primaryColor={getPrimaryColor()}
          secondaryColor={getSecondaryColor()}
        />

        {/* Social Card */}
        <BentoCard className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: getPrimaryColor() }}
              >
                JD
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white font-rounded">John Doe</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-rounded">@johndoe</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-rounded">
              Just launched my new color palette generator! What do you think? 🎨
            </p>
            <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
              <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                <Heart className="h-4 w-4" />
                <span className="text-sm font-rounded">24</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm font-rounded">12</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                <Share2 className="h-4 w-4" />
                <span className="text-sm font-rounded">Share</span>
              </button>
            </div>
          </div>
        </BentoCard>
      </div>
    </section>
  );
};
