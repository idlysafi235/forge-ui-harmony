
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUp, Users, DollarSign, Star, CheckCircle, Clock } from 'lucide-react';

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

interface BentoGridPreviewProps {
  palette: ColorPalette;
  isDark?: boolean;
}

export const BentoGridPreview = ({ palette, isDark = false }: BentoGridPreviewProps) => {
  if (!palette.primary.length) return null;

  const primary = palette.primary[5]?.hex || '#6366f1';
  const primaryLight = palette.primary[2]?.hex || '#e0e7ff';
  const primaryDark = palette.primary[7]?.hex || '#3730a3';
  const accent = palette.secondary[5]?.hex || palette.primary[6]?.hex || '#10b981';
  const warning = palette.tertiary[5]?.hex || '#f59e0b';

  const baseClasses = isDark 
    ? 'bg-gray-900 text-white border-gray-700' 
    : 'bg-white text-gray-900 border-gray-200';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Profile Card */}
      <Card className={`${baseClasses} hover:shadow-lg transition-all duration-300`}>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12" style={{ backgroundColor: primary }}>
              <AvatarFallback className="text-white font-semibold">JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">John Doe</h3>
              <p className="text-sm opacity-70">Product Designer</p>
            </div>
          </div>
          <Button 
            className="w-full mt-4 text-white font-semibold"
            style={{ backgroundColor: primary }}
          >
            View Profile
          </Button>
        </CardContent>
      </Card>

      {/* Stats Widget */}
      <Card className={`${baseClasses} hover:shadow-lg transition-all duration-300`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" style={{ color: accent }} />
            Revenue Growth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,543</div>
          <div className="flex items-center mt-2">
            <Badge 
              variant="secondary" 
              className="text-white"
              style={{ backgroundColor: accent }}
            >
              +8.2%
            </Badge>
            <span className="text-sm opacity-70 ml-2">vs last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Card */}
      <Card className={`${baseClasses} hover:shadow-lg transition-all duration-300 row-span-2`}>
        <CardHeader>
          <CardTitle>Pro Plan</CardTitle>
          <div className="text-3xl font-bold">$29<span className="text-lg font-normal opacity-70">/mo</span></div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" style={{ color: accent }} />
              <span className="text-sm">Unlimited projects</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" style={{ color: accent }} />
              <span className="text-sm">Priority support</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" style={{ color: accent }} />
              <span className="text-sm">Advanced analytics</span>
            </div>
          </div>
          <Button 
            className="w-full text-white font-semibold"
            style={{ backgroundColor: primary }}
          >
            Get Started
          </Button>
        </CardContent>
      </Card>

      {/* Form Card */}
      <Card className={`${baseClasses} hover:shadow-lg transition-all duration-300`}>
        <CardHeader>
          <CardTitle className="text-lg">Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium opacity-70">Email</label>
            <input 
              type="email" 
              className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                isDark ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-300'
              }`}
              style={{ '--tw-ring-color': primary } as React.CSSProperties}
              placeholder="john@example.com"
            />
          </div>
          <Button 
            size="sm" 
            className="text-white"
            style={{ backgroundColor: primary }}
          >
            Send Message
          </Button>
        </CardContent>
      </Card>

      {/* Task List */}
      <Card className={`${baseClasses} hover:shadow-lg transition-all duration-300`}>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Today's Tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span className="text-sm">Review design mockups</span>
          </div>
          <div className="flex items-center space-x-3">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: warning }}
            />
            <span className="text-sm">Client meeting at 3 PM</span>
          </div>
          <div className="flex items-center space-x-3">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: primary }}
            />
            <span className="text-sm">Update project timeline</span>
          </div>
        </CardContent>
      </Card>

      {/* Notification Card */}
      <Card className={`${baseClasses} hover:shadow-lg transition-all duration-300`}>
        <CardContent className="p-4">
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: isDark ? primaryDark : primaryLight }}
          >
            <div className="flex items-start space-x-3">
              <Star className="h-5 w-5 mt-0.5" style={{ color: primary }} />
              <div>
                <h4 className="font-medium text-sm">New Achievement!</h4>
                <p className="text-xs opacity-70 mt-1">You've created 10 color palettes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
