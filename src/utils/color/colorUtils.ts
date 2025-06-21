
export interface ColorShade {
  name: string;
  hex: string;
  rgb: string;
}

export interface ColorPalette {
  primary: ColorShade[];
  secondary: ColorShade[];
  tertiary: ColorShade[];
}

export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export const getColorBrightness = (hex: string): number => {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
};

export const isLightColor = (hex: string): boolean => {
  return getColorBrightness(hex) > 128;
};

export const getContrastColor = (hex: string): string => {
  return isLightColor(hex) ? '#000000' : '#ffffff';
};

export const generateColorShades = (baseHex: string, name: string): ColorShade[] => {
  const rgb = hexToRgb(baseHex);
  if (!rgb) return [];

  const shades: ColorShade[] = [];
  const steps = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

  steps.forEach((step, index) => {
    const factor = step < 0.5 ? 1 + (0.5 - step) * 0.8 : 1 - (step - 0.5) * 0.8;
    
    const newR = Math.min(255, Math.max(0, Math.round(rgb.r * factor)));
    const newG = Math.min(255, Math.max(0, Math.round(rgb.g * factor)));
    const newB = Math.min(255, Math.max(0, Math.round(rgb.b * factor)));
    
    const hex = rgbToHex(newR, newG, newB);
    const rgbString = `rgb(${newR}, ${newG}, ${newB})`;
    
    shades.push({
      name: `${name}-${(index + 1) * 100}`,
      hex,
      rgb: rgbString
    });
  });

  return shades;
};

export const validateHexColor = (hex: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
};
