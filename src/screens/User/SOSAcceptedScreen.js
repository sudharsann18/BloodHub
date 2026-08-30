import React from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { colors } from '../../constants/colors';

import {
  borderRadius,
  shadows,
  spacing,
} from '../../constants/theme';

export default function SOSAcceptedScreen() {

  const navigation = useNavigation();
  const route = useRoute();

  const {
    patientName = '',
    bloodGroup = '',
    hospital = '',
    units = '',
    phone = '',
  } = route.params || {};


  // =====================================================
  // CALL PATIENT
  // =====================================================

  const callPatient = () => {

    if (!phone) {

      Alert.alert(
        'Phone unavailable',
        'Patient phone number is not available.'
      );

      return;
    }

    Linking.openURL(`tel:${phone}`);
  };


  // =====================================================
  // OPEN MAPS
  // =====================================================

  const openMaps = () => {

    const query =
      encodeURIComponent(hospital || 'Current Hospital');

    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${query}`
    );
  };


  // =====================================================
  // GO HOME
  // =====================================================

  const goHome = () => {

    // Home is the parent Bottom Tab.
    navigation.getParent()?.navigate('Home');
  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <SafeAreaView style={styles.safeArea}>

      <View style={styles.container}>

        <View style={styles.card}>

          <Text style={styles.icon}>
            ❤️
          </Text>

          <Text style={styles.title}>
            Thank You!
          </Text>

          <Text style={styles.subtitle}>
            You have successfully accepted this
            emergency blood request.
          </Text>


          {/* DETAILS */}

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
              label="Phone"
              value={phone}
            />

          </View>


          {/* CALL */}

          <TouchableOpacity
            style={styles.callButton}
            onPress={callPatient}
          >

            <Text style={styles.buttonText}>
              📞 Call Patient
            </Text>

          </TouchableOpacity>


          {/* MAP */}

          <TouchableOpacity
            style={styles.mapButton}
            onPress={openMaps}
          >

            <Text style={styles.buttonText}>
              📍 Open Maps
            </Text>

          </TouchableOpacity>


          {/* HOME */}

          <TouchableOpacity
            style={styles.homeButton}
            onPress={goHome}
          >

            <Text style={styles.buttonText}>
              🏠 Back Home
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </SafeAreaView>

  );
}


// =====================================================
// INFO ROW
// =====================================================

function InfoRow({ label, value }) {

  return (

    <View style={styles.row}>

      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value || '-'}
      </Text>

    </View>

  );
}


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
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