import React from 'react';
import BloodBankNavigator from './BloodBankNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import BottomNavigator from './BottomNavigator';

import { View } from 'react-native';
import { Text } from 'react-native-paper';

const Stack = createNativeStackNavigator();


function DeliveryApp() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text variant="headlineMedium">
        🚑 Delivery Partner Dashboard
      </Text>
    </View>
  );
}

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

        <Stack.Screen
          name="DeliveryApp"
          component={DeliveryApp}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}