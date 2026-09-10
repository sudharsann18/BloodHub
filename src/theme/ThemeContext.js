import React, { createContext, useContext } from 'react';

const ThemeContext = createContext({
  mode: 'light',
  setMode: () => {},
  isDark: false,
});

export const useThemeMode = () => useContext(ThemeContext);

export default ThemeContext;
