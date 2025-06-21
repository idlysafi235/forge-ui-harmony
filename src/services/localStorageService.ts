export interface RecentPalette {
  id: string;
  name: string;
  colors: string[];
  timestamp: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  lastUsedSection: string;
  hasSeenIntro: boolean;
  favoriteColors: string[];
}

export class LocalStorageService {
  private static RECENT_PALETTES_KEY = 'colorcraft_recent_palettes';
  private static USER_PREFERENCES_KEY = 'colorcraft_preferences';
  private static MAX_RECENT_PALETTES = 10;

  static getRecentPalettes(): RecentPalette[] {
    try {
      const stored = localStorage.getItem(this.RECENT_PALETTES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading recent palettes:', error);
      return [];
    }
  }

  static addRecentPalette(palette: Omit<RecentPalette, 'timestamp'>): void {
    try {
      const recent = this.getRecentPalettes();
      const newPalette: RecentPalette = {
        ...palette,
        timestamp: new Date().toISOString()
      };

      // Remove if already exists
      const filtered = recent.filter(p => p.id !== palette.id);
      
      // Add to beginning
      filtered.unshift(newPalette);
      
      // Keep only the most recent ones
      const trimmed = filtered.slice(0, this.MAX_RECENT_PALETTES);
      
      localStorage.setItem(this.RECENT_PALETTES_KEY, JSON.stringify(trimmed));
    } catch (error) {
      console.error('Error saving recent palette:', error);
    }
  }

  static getUserPreferences(): UserPreferences {
    try {
      const stored = localStorage.getItem(this.USER_PREFERENCES_KEY);
      const defaults: UserPreferences = {
        theme: 'system',
        lastUsedSection: 'generator',
        hasSeenIntro: false,
        favoriteColors: []
      };
      return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
    } catch (error) {
      console.error('Error reading user preferences:', error);
      return {
        theme: 'system',
        lastUsedSection: 'generator',
        hasSeenIntro: false,
        favoriteColors: []
      };
    }
  }

  static updateUserPreferences(updates: Partial<UserPreferences>): void {
    try {
      const current = this.getUserPreferences();
      const updated = { ...current, ...updates };
      localStorage.setItem(this.USER_PREFERENCES_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating user preferences:', error);
    }
  }

  static addFavoriteColor(color: string): void {
    const prefs = this.getUserPreferences();
    if (!prefs.favoriteColors.includes(color)) {
      prefs.favoriteColors.push(color);
      // Keep only last 20 favorite colors
      if (prefs.favoriteColors.length > 20) {
        prefs.favoriteColors = prefs.favoriteColors.slice(-20);
      }
      this.updateUserPreferences(prefs);
    }
  }

  static removeFavoriteColor(color: string): void {
    const prefs = this.getUserPreferences();
    prefs.favoriteColors = prefs.favoriteColors.filter(c => c !== color);
    this.updateUserPreferences(prefs);
  }

  static clearAllData(): void {
    localStorage.removeItem(this.RECENT_PALETTES_KEY);
    localStorage.removeItem(this.USER_PREFERENCES_KEY);
  }
}
