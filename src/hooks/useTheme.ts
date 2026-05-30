import { useState, useEffect } from 'react';

export type ColorTheme = 'default' | 'theme-shrek' | 'theme-smurf' | 'theme-panther' | 'theme-ziomo';
export type ThemeMode = 'light' | 'dark';

export function useTheme() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme-mode');
      if (stored === 'light' || stored === 'dark') return stored;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });

  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('color-theme');
      if (stored === 'theme-shrek' || stored === 'theme-smurf' || stored === 'theme-panther' || stored === 'theme-ziomo') return stored;
    }
    return 'default';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(themeMode);
    localStorage.setItem('theme-mode', themeMode);
  }, [themeMode]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('theme-shrek', 'theme-smurf', 'theme-panther', 'theme-ziomo');
    if (colorTheme !== 'default') {
      root.classList.add(colorTheme);
    }
    localStorage.setItem('color-theme', colorTheme);
  }, [colorTheme]);

  return { themeMode, setThemeMode, colorTheme, setColorTheme };
}
