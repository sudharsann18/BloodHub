import React, { useState } from 'react';
import { useSOS } from '../../context/SOSContext';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import PrimaryButton from '../../components/PrimaryButton';
import InputField from '../../components/InputField';
import BloodGroupDropdown from '../../components/BloodGroupDropdown';

import { colors } from '../../constants/colors';
import { bloodGroups } from '../../constants/bloodGroups';
import {
  borderRadius,
  shadows,
  spacing,
} from '../../constants/theme';

export default function SOSScreen() {

  const navigation = useNavigation();
  const { broadcastSOS: createSOS } = useSOS();

  /*
    Later these values will come from Firebase.
    For now they are dummy values.
  */

  const user = {
    name: "Sudharsann",
    phone: "9876543210",
    bloodGroup: "O-",
  };

  const [selectedGroup, setSelectedGroup] = useState(user.bloodGroup);
  const [units, setUnits] = useState("1");
  const [message, setMessage] = useState("");

  const broadcastSOS = () => {

  if (units.trim() === "") {
    Alert.alert("Validation", "Enter required units");
    return;
  }

  const sosData = {
    patientName: user.name,
    hospitalName: "Current Hospital",
    phone: user.phone,
    bloodGroup: selectedGroup,
    units,
    message,
    distance: "2.5 km",
  };

  // Store SOS globally
  createSOS(sosData);

  // Navigate to success screen
  navigation.navigate("SOSDetails", sosData);
};

  return (

    <SafeAreaView style={styles.safeArea}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >

        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.back}>
            ← Back
          </Text>
        </TouchableOpacity>

        <View style={styles.card}>

          <Text style={styles.title}>
            🚨 Emergency SOS
          </Text>

          <Text style={styles.subtitle}>
            Your registered profile details will be
            automatically used while sending the SOS.
          </Text>
                    <View style={styles.profileCard}>

            <Text style={styles.profileTitle}>
              Registered Information
            </Text>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{user.name}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{user.phone}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Blood Group</Text>
              <Text style={styles.value}>{selectedGroup}</Text>
            </View>

          </View>

          <View style={styles.formGroup}>

            <BloodGroupDropdown
              label="Blood Group"
              value={selectedGroup}
              onSelect={setSelectedGroup}
              options={bloodGroups}
            />

          </View>

          <View style={styles.formGroup}>

            <InputField
              label="Units Required"
              value={units}
              onChangeText={setUnits}
              placeholder="Enter units"
              keyboardType="numeric"
            />

          </View>

          <View style={styles.formGroup}>

            <InputField
              label="Emergency Message (Optional)"
              value={message}
              onChangeText={setMessage}
              placeholder="Example: Surgery in 30 minutes. Urgent blood required."
              multiline
              numberOfLines={5}
              style={styles.messageInput}
            />

          </View>

          <PrimaryButton
            label="🚨 Broadcast SOS"
            onPress={broadcastSOS}
            style={styles.button}
          />

        </View>

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
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.lg,
  },

  back: {
    color: colors.primaryRed,
    fontWeight: "700",
    marginBottom: spacing.md,
    fontSize: 16,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.medium,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.primaryRed,
  },

  subtitle: {
    marginTop: spacing.sm,
    color: colors.gray,
    lineHeight: 22,
  },

  profileCard: {
    marginTop: spacing.xl,
    backgroundColor: "#FFF5F5",
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },

  profileTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primaryRed,
    marginBottom: spacing.md,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },

  label: {
    color: colors.gray,
    fontWeight: "600",
  },

  value: {
    color: colors.black,
    fontWeight: "700",
  },

  formGroup: {
    marginTop: spacing.lg,
  },

  messageInput: {
    minHeight: 120,
    textAlignVertical: "top",
  },

  button: {
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },

});