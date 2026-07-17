import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { SOSProvider } from './src/context/SOSContext';

export default function App() {
  return (
    <SOSProvider>
      <AppNavigator />
    </SOSProvider>
  );
}