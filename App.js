import React from 'react';
import { PaperProvider } from 'react-native-paper';

import AppNavigator from './src/navigation/AppNavigator';
import { SOSProvider } from './src/context/SOSContext';

export default function App() {
  return (
    <PaperProvider>
      <SOSProvider>
        <AppNavigator />
      </SOSProvider>
    </PaperProvider>
  );
}