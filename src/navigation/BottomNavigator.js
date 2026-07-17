import React from 'react';
import ReserveBloodScreen from '../screens/User/ReserveBloodScreen';
import EmergencyBloodScreen from '../screens/User/EmergencyBloodScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colors } from '../constants/colors';
import SOSAcceptedScreen from '../screens/User/SOSAcceptedScreen';
import UserHomeScreen from '../screens/User/UserHomeScreen';
import MapScreen from '../screens/User/MapScreen';
import BloodBankDetailsScreen from '../screens/User/BloodBankDetailsScreen';
import WaitingScreen from '../screens/User/WaitingScreen';
import SOSScreen from '../screens/User/SOSScreen';
import SOSDetailsScreen from '../screens/User/SOSDetailsScreen';
import SOSResponseScreen from '../screens/User/SOSResponseScreen';
import NotificationScreen from '../screens/User/NotificationScreen';
import ProfileScreen from '../screens/User/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="UserHome"
        component={UserHomeScreen}
      />

      <Stack.Screen
        name="Map"
        component={MapScreen}
      />

      <Stack.Screen
        name="BloodBankDetails"
        component={BloodBankDetailsScreen}
      />

      <Stack.Screen
        name="Waiting"
        component={WaitingScreen}
      />

      <Stack.Screen
        name="SOS"
        component={SOSScreen}
      />

      <Stack.Screen
        name="SOSDetails"
        component={SOSDetailsScreen}
      />
      <Stack.Screen
  name="ReserveBlood"
  component={ReserveBloodScreen}
/>

<Stack.Screen
  name="EmergencyBlood"
  component={EmergencyBloodScreen}
/>

      <Stack.Screen
        name="SOSResponse"
        component={SOSResponseScreen}
      />

      <Stack.Screen
  name="SOSAccepted"
  component={SOSAcceptedScreen}
/>

    </Stack.Navigator>
  );
};

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: colors.primaryRed,
        tabBarInactiveTintColor: '#999',

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
        },

        tabBarIcon: ({ color, size }) => {
          let icon;

          switch (route.name) {
            case 'Home':
              icon = 'home';
              break;

            case 'Notifications':
              icon = 'notifications';
              break;

            case 'Profile':
              icon = 'person';
              break;

            default:
              icon = 'ellipse';
          }

          return (
            <Ionicons
              name={icon}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}