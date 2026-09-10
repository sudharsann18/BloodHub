import React from 'react';
import ThemeProvider from './src/theme/ThemeProvider';
import AppNavigator from './src/navigation/AppNavigator';
import { SOSProvider } from './src/context/SOSContext';

export default function App() {
  return (
    <ThemeProvider>
      <SOSProvider>
        <AppNavigator />
      </SOSProvider>
    </ThemeProvider>
  );
}