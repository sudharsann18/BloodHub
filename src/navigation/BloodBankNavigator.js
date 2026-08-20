import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BloodBankHomeScreen from '../screens/BloodBank/BloodBankHomeScreen';
import BloodRequestsScreen from '../screens/BloodBank/BloodRequestsScreen';
import InventoryScreen from '../screens/BloodBank/InventoryScreen';
import ReservationScreen from '../screens/BloodBank/ReservationScreen';
import HistoryScreen from '../screens/BloodBank/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function BloodBankNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >

      <Stack.Screen
        name="BloodBankHome"
        component={BloodBankHomeScreen}
      />

      <Stack.Screen
        name="BloodRequests"
        component={BloodRequestsScreen}
      />

      <Stack.Screen
        name="Inventory"
        component={InventoryScreen}
      />

      <Stack.Screen
        name="Reservations"
        component={ReservationScreen}
      />

      <Stack.Screen
        name="History"
        component={HistoryScreen}
      />

    </Stack.Navigator>
  );
}