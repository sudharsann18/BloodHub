import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Text } from 'react-native-paper';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { useSOS } from '../../context/SOSContext';

import { colors } from '../../constants/colors';
import {
  borderRadius,
  shadows,
  spacing,
} from '../../constants/theme';

export default function SOSResponseScreen() {

  const navigation = useNavigation();
  const route = useRoute();

  const {
    acceptSOS,
    clearSOS,
  } = useSOS();

  const {
    patientName = "John Doe",
    bloodGroup = "O-",
    hospital = "Apollo Hospital",
    units = "2",
    distance = "2.5 km",
    phone = "9876543210",
    message = "Urgent blood required for surgery.",
  } = route.params || {};

  const handleAcceptSOS = () => {

    acceptSOS({
      name: "Current Donor",
      phone: "9999999999",
    });

    navigation.navigate("SOSAccepted", {
  patientName,
  bloodGroup,
  hospital,
  units,
  distance,
  phone,
  message,
});
  };

  return (

    <SafeAreaView style={styles.safeArea}>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
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
            🚨 Emergency Blood Request
          </Text>

          <Text style={styles.subtitle}>
            A nearby patient urgently needs blood.
          </Text>

          <View style={styles.infoCard}>

            <InfoRow
              label="Patient"
              value={patientName}
            />

            <InfoRow
              label="Blood Group"
              value={bloodGroup}
            />

            <InfoRow
              label="Units Required"
              value={units}
            />

            <InfoRow
              label="Hospital"
              value={hospital}
            />

            <InfoRow
              label="Distance"
              value={distance}
            />

            <InfoRow
              label="Phone"
              value={phone}
            />

          </View>

          <View style={styles.messageBox}>

            <Text style={styles.messageTitle}>
              Emergency Message
            </Text>

            <Text style={styles.message}>
              {message}
            </Text>

          </View>

          <TouchableOpacity
            style={styles.callButton}
            onPress={() =>
              Alert.alert(
                "Call",
                "Phone integration will be added with Firebase."
              )
            }
          >
            <Text style={styles.buttonText}>
              📞 Call Patient
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.directionButton}
            onPress={() =>
              Alert.alert(
                "Directions",
                "Google Maps integration coming soon."
              )
            }
          >
            <Text style={styles.buttonText}>
              📍 View Directions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.acceptButton}
            onPress={handleAcceptSOS}
          >
            <Text style={styles.buttonText}>
              ❤️ I'm Coming to Donate
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

    </SafeAreaView>

  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
      safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flexGrow: 1,
    padding: spacing.lg,
  },

  back: {
    color: colors.primaryRed,
    fontWeight: '700',
    fontSize: 16,
    marginBottom: spacing.md,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.medium,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.primaryRed,
  },

  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    color: colors.gray,
    lineHeight: 22,
  },

  infoCard: {
    backgroundColor: '#FFF5F5',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },

  label: {
    color: colors.gray,
    fontWeight: '600',
    fontSize: 15,
  },

  value: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 15,
    maxWidth: '60%',
    textAlign: 'right',
  },

  messageBox: {
    marginTop: spacing.xl,
    backgroundColor: '#FFF5F5',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },

  messageTitle: {
    color: colors.primaryRed,
    fontWeight: '700',
    marginBottom: 8,
    fontSize: 16,
  },

  message: {
    color: colors.black,
    lineHeight: 22,
    fontSize: 15,
  },

  callButton: {
    marginTop: spacing.xl,
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },

  directionButton: {
    marginTop: spacing.md,
    backgroundColor: '#1976D2',
    paddingVertical: 15,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },

  acceptButton: {
    marginTop: spacing.md,
    backgroundColor: colors.primaryRed,
    paddingVertical: 18,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

});