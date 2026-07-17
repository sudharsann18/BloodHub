import React, { useState } from 'react';
import { useSOS } from '../../context/SOSContext';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import PrimaryButton from '../../components/PrimaryButton';
import InputField from '../../components/InputField';
import BloodGroupDropdown from '../../components/BloodGroupDropdown';
import SOSCard from '../../components/SOSCard';

import { colors } from '../../constants/colors';
import { bloodGroups } from '../../constants/bloodGroups';
import {
  borderRadius,
  shadows,
  spacing,
} from '../../constants/theme';


export default function UserHomeScreen() {
  const navigation = useNavigation();
  const { sosRequest } = useSOS();

  const [selectedGroup, setSelectedGroup] = useState('A+');
  const [units, setUnits] = useState('2');

  const searchBlood = () => {
    navigation.navigate('Map', {
      bloodGroup: selectedGroup,
      units: units,
    });
  };

  const openSOS = () => {
    navigation.navigate('SOS');
  };

  const openNotifications = () => {
    navigation.navigate('Notifications');
  };

  const openProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Header */}

        <View style={styles.header}>

          <View>
            

            <Text style={styles.username}>
              Find Blood Fast
            </Text>
          </View>

          <View style={styles.headerRight}>

            <TouchableOpacity
              style={styles.notificationButton}
              onPress={openNotifications}
            >
              <Text style={styles.notificationIcon}>🔔</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={openProfile}>
              <Avatar.Text
                size={46}
                label="AD"
                color="white"
                style={styles.avatar}
              />
            </TouchableOpacity>

          </View>

        </View>

        {/* Hero Card */}

        <View style={styles.heroCard}>

          <View style={styles.heroTop}>

            <View>

              <Text style={styles.heroTitle}>
                Need Blood?
              </Text>

              <Text style={styles.heroSubtitle}>
                Search nearby blood banks instantly.
              </Text>

            </View>

            <View style={styles.liveBadge}>
              <Text style={styles.liveText}>
                24/7
              </Text>
            </View>

          </View>

          <BloodGroupDropdown
            label="Blood Group"
            value={selectedGroup}
            onSelect={setSelectedGroup}
            options={bloodGroups}
          />

          <InputField
            label="Units Required"
            value={units}
            onChangeText={setUnits}
            keyboardType="numeric"
            placeholder="Enter Units"
            style={styles.input}
          />

          <PrimaryButton
            label="Search Blood"
            onPress={searchBlood}
            style={styles.searchButton}
          />

          <PrimaryButton
            label="Broadcast SOS"
            onPress={openSOS}
            style={styles.sosButton}
          />

        </View>

        {/* SOS Alerts */}

        <View style={styles.sectionRow}>

          <Text style={styles.sectionTitle}>
            Nearby SOS Alerts
          </Text>

          <TouchableOpacity>
            <Text style={styles.viewAll}>
              View All
            </Text>
          </TouchableOpacity>

        </View>

        {sosRequest ? (
  <SOSCard
    title={`Emergency ${sosRequest.bloodGroup} Needed`}
    subtitle={`${sosRequest.hospitalName} • ${sosRequest.distance}`}
    actionLabel="Respond"
    icon={<Text>🩸</Text>}
    onPress={() =>
      navigation.navigate("SOSResponse", {
        patientName: sosRequest.patientName,
        bloodGroup: sosRequest.bloodGroup,
        hospital: sosRequest.hospitalName,
        units: sosRequest.units,
        distance: sosRequest.distance,
        phone: sosRequest.phone,
        message: sosRequest.message,
      })
    }
  />
) : (
  <View
    style={{
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 15,
      alignItems: "center",
    }}
  >
    <Text style={{ color: "#888" }}>
      No nearby SOS requests
    </Text>
  </View>
)}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    padding: spacing.lg,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },

  greeting: {
    color: colors.gray,
    fontSize: 14,
  },

  username: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.black,
    marginTop: 4,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    ...shadows.small,
  },

  notificationIcon: {
    fontSize: 18,
  },

  avatar: {
    backgroundColor: colors.primaryRed,
  },

  heroCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.medium,
    marginBottom: spacing.xl,
  },

  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    alignItems: 'center',
  },

  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.black,
  },

  heroSubtitle: {
    color: colors.gray,
    marginTop: 5,
  },

  liveBadge: {
    backgroundColor: colors.lightRed,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },

  liveText: {
    color: colors.primaryRed,
    fontWeight: '700',
  },

  input: {
    marginTop: 15,
  },

  searchButton: {
    marginTop: 20,
  },

  sosButton: {
    marginTop: 12,
    backgroundColor: colors.primaryRed,
  },

  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.black,
  },

  viewAll: {
    color: colors.primaryRed,
    fontWeight: '700',
  },

});