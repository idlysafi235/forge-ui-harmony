
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Palette, Target } from 'lucide-react';

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

interface ColorRuleSectionProps {
  palette: ColorPalette;
}

export const ColorRuleSection = ({ palette }: ColorRuleSectionProps) => {
  // Helper function to get color by shade with fallback
  const getColor = (colorType: 'primary' | 'secondary' | 'tertiary', shade: string) => {
    if ((colorType === 'secondary' && !palette.secondary?.length) || 
        (colorType === 'tertiary' && !palette.tertiary?.length)) {
      return palette.primary?.find(s => s.name === shade)?.hex || '#6b7280';
    }
    return palette[colorType]?.find(s => s.name === shade)?.hex || '#6b7280';
  };

  const primaryDominant = getColor('primary', '100');
  const secondarySupport = getColor('secondary', '500');
  const tertiaryAccent = getColor('tertiary', '600');

  return (
    <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          <Target className="h-8 w-8 text-blue-600" />
          60/30/10 Color Rule
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          The classic design principle with strategic white space usage: 60% dominant color, 30% secondary color, 
          and 10% accent color for perfect visual balance and hierarchy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* 60% Rule Card */}
        <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all bg-white border border-gray-200">
          <CardHeader className="text-center bg-white">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-gray-100" style={{ backgroundColor: primaryDominant }}>
              <span className="text-2xl font-bold" style={{ color: getColor('primary', '800') }}>60%</span>
            </div>
            <CardTitle className="text-xl text-gray-900">Dominant Color</CardTitle>
            <p className="text-sm text-gray-600">Light backgrounds and feature cards</p>
          </CardHeader>
          <CardContent className="bg-white">
            <div className="space-y-3">
              <div className="h-24 rounded-xl border border-gray-100" style={{ backgroundColor: primaryDominant }}></div>
              <div className="text-center">
                <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">Primary - 100</Badge>
                <p className="text-sm font-mono mt-1 text-gray-600">{primaryDominant}</p>
                <p className="text-xs text-gray-500 mt-2">Used for card backgrounds with white space separation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 30% Rule Card */}
        <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all bg-white border border-gray-200">
          <CardHeader className="text-center bg-white">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-gray-100" style={{ backgroundColor: secondarySupport }}>
              <span className="text-2xl font-bold text-white">30%</span>
            </div>
            <CardTitle className="text-xl text-gray-900">Secondary Color</CardTitle>
            <p className="text-sm text-gray-600">Interactive elements and medium areas</p>
          </CardHeader>
          <CardContent className="bg-white">
            <div className="space-y-3">
              <div className="h-24 rounded-xl border border-gray-100" style={{ backgroundColor: secondarySupport }}></div>
              <div className="text-center">
                <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">Secondary - 500</Badge>
                <p className="text-sm font-mono mt-1 text-gray-600">{secondarySupport}</p>
                <p className="text-xs text-gray-500 mt-2">Buttons and interactive elements on white backgrounds</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 10% Rule Card */}
        <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all bg-white border border-gray-200">
          <CardHeader className="text-center bg-white">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-gray-100" style={{ backgroundColor: tertiaryAccent }}>
              <span className="text-2xl font-bold text-white">10%</span>
            </div>
            <CardTitle className="text-xl text-gray-900">Accent Color</CardTitle>
            <p className="text-sm text-gray-600">Highlights and call-to-action elements</p>
          </CardHeader>
          <CardContent className="bg-white">
            <div className="space-y-3">
              <div className="h-24 rounded-xl border border-gray-100" style={{ backgroundColor: tertiaryAccent }}></div>
              <div className="text-center">
                <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">Tertiary - 600</Badge>
                <p className="text-sm font-mono mt-1 text-gray-600">{tertiaryAccent}</p>
                <p className="text-xs text-gray-500 mt-2">Premium badges and featured elements</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Example Applications with White Space Focus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Financial App Layout */}
        <Card className="rounded-2xl shadow-md overflow-hidden bg-white border border-gray-200">
          <CardHeader className="bg-white">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Eye className="h-5 w-5" />
              Financial Dashboard
            </CardTitle>
            <p className="text-sm text-gray-600">Proper white space and color distribution</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-64 relative bg-gray-50">
              {/* Main background with subtle gray */}
              <div className="absolute inset-0 bg-gray-50">
                
                {/* Feature Cards - 60% usage */}
                <div className="p-4 space-y-2">
                  <div className="h-12 rounded-lg p-3 flex items-center" style={{ backgroundColor: primaryDominant }}>
                    <div className="w-6 h-6 rounded-full mr-3" style={{ backgroundColor: getColor('primary', '300') }}></div>
                    <div className="h-2 w-20 rounded" style={{ backgroundColor: getColor('primary', '700') }}></div>
                  </div>
                  <div className="h-12 rounded-lg p-3 flex items-center" style={{ backgroundColor: primaryDominant }}>
                    <div className="w-6 h-6 rounded-full mr-3" style={{ backgroundColor: getColor('primary', '300') }}></div>
                    <div className="h-2 w-16 rounded" style={{ backgroundColor: getColor('primary', '700') }}></div>
                  </div>
                </div>
                
                {/* White chart area */}
                <div className="mx-4 mt-2 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="h-2 w-12 rounded mb-2 bg-gray-900"></div>
                  <div className="flex space-x-1 h-16 items-end">
                    <div className="w-4 rounded-t" style={{ backgroundColor: getColor('primary', '500'), height: '60%' }}></div>
                    <div className="w-4 rounded-t" style={{ backgroundColor: getColor('primary', '400'), height: '40%' }}></div>
                    <div className="w-4 rounded-t" style={{ backgroundColor: getColor('primary', '300'), height: '20%' }}></div>
                  </div>
                </div>
                
                {/* 30% Button area */}
                <div className="absolute bottom-4 left-4 right-4">
                  <Button 
                    className="text-white text-sm px-4 py-2 rounded-lg shadow-md"
                    style={{ backgroundColor: secondarySupport }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* E-commerce Product Card */}
        <Card className="rounded-2xl shadow-md overflow-hidden bg-white border border-gray-200">
          <CardHeader className="bg-white">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Palette className="h-5 w-5" />
              Product Showcase
            </CardTitle>
            <p className="text-sm text-gray-600">Strategic color placement with white space</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-64 relative bg-white">
              {/* Product image area with gradient */}
              <div 
                className="h-32 w-full"
                style={{
                  background: `linear-gradient(135deg, ${primaryDominant}, ${getColor('primary', '200')})`
                }}
              >
                {/* Premium badge - 10% accent */}
                <div className="absolute top-2 right-2">
                  <div 
                    className="px-2 py-1 rounded text-xs text-white font-medium"
                    style={{ backgroundColor: tertiaryAccent }}
                  >
                    Premium
                  </div>
                </div>
              </div>
              
              {/* White content area - strategic breathing space */}
              <div className="p-4 bg-white">
                <div className="h-3 w-24 rounded mb-2 bg-gray-900"></div>
                <div className="h-2 w-16 rounded mb-3 bg-gray-600"></div>
                
                {/* Star rating */}
                <div className="flex space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: tertiaryAccent }}
                    ></div>
                  ))}
                </div>
                
                {/* Price and CTA */}
                <div className="flex justify-between items-center">
                  <div className="h-4 w-12 rounded bg-gray-900"></div>
                  <Button 
                    size="sm"
                    className="text-white text-xs px-3 py-1 rounded"
                    style={{ backgroundColor: secondarySupport }}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Best Practices with White Space Focus */}
      <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          Strategic Color & White Space Usage
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-blue-900 mb-2">60% - Dominant (Tints)</h4>
            <p className="text-gray-700 mb-2">Use light tints (100-300) for card backgrounds and feature areas.</p>
            <div className="text-xs text-gray-600">
              <span className="font-medium">White space role:</span> Separates colored cards, provides breathing room
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-green-900 mb-2">30% - Secondary (Shades)</h4>
            <p className="text-gray-700 mb-2">Apply medium shades (400-600) for buttons and interactive elements.</p>
            <div className="text-xs text-gray-600">
              <span className="font-medium">White space role:</span> Creates contrast for interactive elements
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-orange-900 mb-2">10% - Accent (Deep)</h4>
            <p className="text-gray-700 mb-2">Reserve deep shades (600-800) for badges, highlights, and CTAs.</p>
            <div className="text-xs text-gray-600">
              <span className="font-medium">White space role:</span> Makes accents pop and draw attention
            </div>
          </div>
        </div>
        
        {/* White Space Guidelines */}
        <div className="mt-6 p-4 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <h4 className="font-medium text-gray-900 mb-2">🤍 White Space Strategy</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700">
            <div>
              <span className="font-medium">Card Containers:</span> White backgrounds for content clarity and data visualization
            </div>
            <div>
              <span className="font-medium">Padding & Gaps:</span> Creates hierarchy and prevents color overload
            </div>
            <div>
              <span className="font-medium">Chart Areas:</span> White backgrounds make colored data stand out
            </div>
            <div>
              <span className="font-medium">Text Readability:</span> Ensures contrast for dark text on light backgrounds
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
