import React, { useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import ThemeContext from './ThemeContext';
import { colors, setThemeColors, darkPalette, lightPalette } from './colors';

const THEME_KEY = 'themeMode';

export default function ThemeProvider({ children }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState('light');

  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(THEME_KEY)
      .then((savedMode) => {
        if (!mounted) return;
        if (savedMode === 'light' || savedMode === 'dark') {
          setMode(savedMode);
          return;
        }
        setMode(systemScheme === 'dark' ? 'dark' : 'light');
      })
      .catch(() => {
        if (mounted) setMode(systemScheme === 'dark' ? 'dark' : 'light');
      });

    return () => {
      mounted = false;
    };
  }, [systemScheme]);

  useEffect(() => {
    setThemeColors(mode);
    AsyncStorage.setItem(THEME_KEY, mode).catch(() => {});
  }, [mode]);

  const paperTheme = useMemo(() => {
    const baseTheme = mode === 'dark' ? MD3DarkTheme : MD3LightTheme;
    return {
      ...baseTheme,
      version: 3,
      roundness: 12,
      colors: {
        ...baseTheme.colors,
        primary: colors.red,
        secondary: colors.navy,
        background: colors.background,
        surface: colors.surface,
        surfaceVariant: colors.surface,
        onSurface: colors.text,
        text: colors.text,
        secondaryContainer: colors.redSoft,
        onSecondaryContainer: colors.red,
        outline: colors.border,
        error: colors.redDark,
        backdrop: colors.background,
        elevation: {
          level0: colors.background,
          level1: colors.surface,
          level2: colors.surface,
          level3: colors.surface,
          level4: colors.surface,
          level5: colors.surface,
        },
      },
    };
  }, [mode]);

  const value = useMemo(() => ({ mode, setMode, isDark: mode === 'dark' }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <PaperProvider theme={paperTheme}>
        {React.Children.map(children, (child) => (
          React.isValidElement(child) ? React.cloneElement(child, { key: mode }) : child
        ))}
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

export { darkPalette, lightPalette };
