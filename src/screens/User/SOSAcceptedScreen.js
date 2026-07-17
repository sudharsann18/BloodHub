import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useSOS } from '../../context/SOSContext';

import { colors } from '../../constants/colors';
import {
  spacing,
  borderRadius,
  shadows,
} from '../../constants/theme';

export default function SOSAcceptedScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { clearSOS } = useSOS();

  const {
    patientName = '',
    bloodGroup = '',
    hospital = '',
    units = '',
    distance = '',
    phone = '',
  } = route.params || {};

  const goHome = () => {
    clearSOS();

    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>

          <Text style={styles.icon}>
            ❤️
          </Text>

          <Text style={styles.title}>
            Thank You!
          </Text>

          <Text style={styles.subtitle}>
            You have successfully accepted this emergency blood request.
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
              label="Units"
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

          <TouchableOpacity
            style={styles.callButton}
          >
            <Text style={styles.buttonText}>
              📞 Call Patient
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mapButton}
          >
            <Text style={styles.buttonText}>
              📍 Open Maps
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={goHome}
          >
            <Text style={styles.buttonText}>
              🏠 Back Home
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
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
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
    justifyContent: 'center',
    padding: spacing.lg,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    ...shadows.medium,
  },

  icon: {
    fontSize: 70,
    textAlign: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.primaryRed,
    textAlign: 'center',
    marginTop: spacing.md,
  },

  subtitle: {
    textAlign: 'center',
    color: colors.gray,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
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
    marginVertical: 8,
  },

  label: {
    color: colors.gray,
    fontWeight: '600',
  },

  value: {
    color: colors.black,
    fontWeight: '700',
    maxWidth: '60%',
    textAlign: 'right',
  },

  callButton: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: borderRadius.lg,
    marginTop: spacing.xl,
    alignItems: 'center',
  },

  mapButton: {
    backgroundColor: '#1976D2',
    padding: 16,
    borderRadius: borderRadius.lg,
    marginTop: spacing.md,
    alignItems: 'center',
  },

  homeButton: {
    backgroundColor: colors.primaryRed,
    padding: 16,
    borderRadius: borderRadius.lg,
    marginTop: spacing.md,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

});