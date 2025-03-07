import { useCallback, useEffect, useState } from 'react';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeColors>({
    primary: '#5E35B1',
    secondary: '#2979FF',
    accent: '#39FF14',
    background: '#121212',
    surface: '#2D2D2D',
    textPrimary: '#FFFFFF',
    textSecondary: '#BDBDBD'
  });

  useEffect(() => {
    // In a real app, we might load the theme from local storage or an API
    // For now, we'll just use the default theme
    const rootStyle = document.documentElement.style;
    
    rootStyle.setProperty('--color-primary', theme.primary);
    rootStyle.setProperty('--color-secondary', theme.secondary);
    rootStyle.setProperty('--color-accent', theme.accent);
    rootStyle.setProperty('--color-background', theme.background);
    rootStyle.setProperty('--color-surface', theme.surface);
    rootStyle.setProperty('--color-text-primary', theme.textPrimary);
    rootStyle.setProperty('--color-text-secondary', theme.textSecondary);
  }, [theme]);

  const updateTheme = useCallback((newTheme: Partial<ThemeColors>) => {
    setTheme(currentTheme => ({
      ...currentTheme,
      ...newTheme
    }));
  }, []);

  return {
    ...theme,
    updateTheme
  };
}
