import React from 'react';
import BloodBankNavigator from './BloodBankNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import BottomNavigator from './BottomNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Auth"
      >
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
        />

        <Stack.Screen
          name="UserApp"
          component={BottomNavigator}
        />

        <Stack.Screen
  name="BloodBankApp"
  component={BloodBankNavigator}
/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}