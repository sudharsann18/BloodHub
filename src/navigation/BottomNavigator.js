import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ReserveBloodScreen from '../screens/User/ReserveBloodScreen';
import EmergencyBloodScreen from '../screens/User/EmergencyBloodScreen';
import UserHomeScreen from '../screens/User/UserHomeScreen';
import MapScreen from '../screens/User/MapScreen';
import BloodBankDetailsScreen from '../screens/User/BloodBankDetailsScreen';
import WaitingScreen from '../screens/User/WaitingScreen';
import SOSScreen from '../screens/User/SOSScreen';
import SOSDetailsScreen from '../screens/User/SOSDetailsScreen';
import SOSResponseScreen from '../screens/User/SOSResponseScreen';
import SOSAcceptedScreen from '../screens/User/SOSAcceptedScreen';
import SOSStatusScreen from '../screens/User/SOSStatusScreen';
import NotificationScreen from '../screens/User/NotificationScreen';
import ProfileScreen from '../screens/User/ProfileScreen';
import UserRequestsScreen from '../screens/User/UserRequestsScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="UserHome" component={UserHomeScreen} />
    <Stack.Screen name="BloodBankDetails" component={BloodBankDetailsScreen} />
    <Stack.Screen name="Waiting" component={WaitingScreen} />
    <Stack.Screen name="SOS" component={SOSScreen} />
    <Stack.Screen name="SOSDetails" component={SOSDetailsScreen} />
    <Stack.Screen name="SOSStatus" component={SOSStatusScreen} />
    <Stack.Screen name="SOSResponse" component={SOSResponseScreen} />
    <Stack.Screen name="SOSAccepted" component={SOSAcceptedScreen} />
    <Stack.Screen name="ReserveBlood" component={ReserveBloodScreen} />
    <Stack.Screen name="EmergencyBlood" component={EmergencyBloodScreen} />
  </Stack.Navigator>;
}

export default function BottomNavigator() {
  return <Tab.Navigator screenOptions={({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: colors.red,
    tabBarInactiveTintColor: colors.muted,
    tabBarStyle: { height: 68, paddingBottom: 8, paddingTop: 6, backgroundColor: colors.white, borderTopColor: colors.border },
    tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
    tabBarIcon: ({ color, size }) => {
      const icons = { Home: 'home-outline', Search: 'magnify', Requests: 'clipboard-text-outline', Notifications: 'bell-outline', Profile: 'account-outline' };
      return <MaterialCommunityIcons name={icons[route.name]} color={color} size={size} />;
    },
  })}>
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Search" component={MapScreen} />
    <Tab.Screen name="Requests" component={UserRequestsScreen} />
    <Tab.Screen name="Notifications" component={NotificationScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>;
}
