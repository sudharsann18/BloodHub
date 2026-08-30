import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { Text } from 'react-native-paper';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getMySOS,
} from '../../services/api';

import { colors } from '../../constants/colors';

import {
  borderRadius,
  shadows,
  spacing,
} from '../../constants/theme';


export default function SOSStatusScreen() {

  const navigation = useNavigation();
  const route = useRoute();

  const [sos, setSOS] = useState(
    route.params?.sos || null
  );

  const [loading, setLoading] = useState(true);


  // =====================================================
  // LOAD REQUESTER'S SOS
  // =====================================================

  const loadSOS = async () => {

    try {

      const token =
        await AsyncStorage.getItem('token');

      if (!token) {
        return;
      }

      const response =
        await getMySOS(token);

      console.log(
        'My SOS status:',
        response
      );

      if (!response || response.length === 0) {
        return;
      }

      // We know the ID of the SOS we just created
      const sosId =
        route.params?.sos?.id;

      let currentSOS;

      if (sosId) {

        currentSOS =
          response.find(
            item =>
              String(item.id) === String(sosId)
          );

      }

      // Fallback to latest SOS
      if (!currentSOS) {

        currentSOS =
          response[0];

      }

      if (currentSOS) {

        setSOS(currentSOS);

      }

    } catch (error) {

      console.log(
        'Load SOS status error:',
        error?.response?.data || error
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // INITIAL LOAD + POLLING
  // =====================================================

  useEffect(() => {

    loadSOS();

    // Check backend every 3 seconds
    const interval =
      setInterval(() => {

        loadSOS();

      }, 3000);

    return () => {

      clearInterval(interval);

    };

  }, []);


  // =====================================================
  // BACK HOME
  // =====================================================

  const goHome = () => {

    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Home',
        },
      ],
    });

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading && !sos) {

    return (

      <SafeAreaView style={styles.safeArea}>

        <View style={styles.loadingContainer}>

          <ActivityIndicator
            size="large"
            color={colors.primaryRed}
          />

          <Text style={styles.loadingText}>
            Loading SOS status...
          </Text>

        </View>

      </SafeAreaView>

    );

  }


  // =====================================================
  // NO SOS
  // =====================================================

  if (!sos) {

    return (

      <SafeAreaView style={styles.safeArea}>

        <View style={styles.container}>

          <View style={styles.card}>

            <Text style={styles.icon}>
              ⚠️
            </Text>

            <Text style={styles.title}>
              SOS Not Found
            </Text>

            <Text style={styles.subtitle}>
              We could not find your SOS request.
            </Text>

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
  // STATUS
  // =====================================================

  const status =
    String(sos.status || '').toUpperCase();

  const accepted =
    status === 'ACCEPTED' ||
    status === 'CONFIRMED';


  return (

    <SafeAreaView style={styles.safeArea}>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.card}>

          {/* ================================================= */}
          {/* ICON */}
          {/* ================================================= */}

          <Text style={styles.icon}>

            {accepted
              ? '❤️'
              : '🩸'}

          </Text>


          {/* ================================================= */}
          {/* TITLE */}
          {/* ================================================= */}

          <Text style={styles.title}>

            {accepted
              ? 'SOS Accepted!'
              : 'SOS Request Sent'}

          </Text>


          {/* ================================================= */}
          {/* STATUS MESSAGE */}
          {/* ================================================= */}

          <Text style={styles.subtitle}>

            {accepted

              ? 'A donor has accepted your emergency blood request.'

              : 'Your emergency request has been broadcast to nearby donors.'}

          </Text>


          {/* ================================================= */}
          {/* STATUS BADGE */}
          {/* ================================================= */}

          <View
            style={[
              styles.statusBox,
              accepted
                ? styles.acceptedStatus
                : styles.waitingStatus,
            ]}
          >

            <Text style={styles.statusIcon}>

              {accepted
                ? '🟢'
                : '🟡'}

            </Text>

            <View>

              <Text style={styles.statusTitle}>

                {accepted
                  ? 'ACCEPTED'
                  : 'WAITING FOR DONOR'}

              </Text>

              <Text style={styles.statusText}>

                {accepted

                  ? 'A donor is responding to your request.'

                  : 'Waiting for someone to accept your SOS...'}

              </Text>

            </View>

          </View>


          {/* ================================================= */}
          {/* REQUEST DETAILS */}
          {/* ================================================= */}

          <View style={styles.infoCard}>

            <InfoRow
              label="Patient"
              value={sos.patientName}
            />

            <InfoRow
              label="Blood Group"
              value={sos.bloodGroup}
            />

            <InfoRow
              label="Units Required"
              value={sos.units}
            />

            <InfoRow
              label="Hospital"
              value={sos.hospital}
            />

            <InfoRow
              label="Phone"
              value={sos.phone}
            />

          </View>


          {/* ================================================= */}
          {/* DONOR INFORMATION */}
          {/* ================================================= */}

          {accepted && (

            <View style={styles.donorCard}>

              <Text style={styles.donorTitle}>
                Donor Information
              </Text>

              <InfoRow
                label="Donor"
                value={
                  sos.donorName ||
                  sos.acceptedByName ||
                  '-'
                }
              />

              <InfoRow
                label="Phone"
                value={
                  sos.donorPhone ||
                  '-'
                }
              />

            </View>

          )}


          {/* ================================================= */}
          {/* WAITING MESSAGE */}
          {/* ================================================= */}

          {!accepted && (

            <View style={styles.waitingCard}>

              <ActivityIndicator
                size="small"
                color={colors.primaryRed}
              />

              <Text style={styles.waitingText}>
                This page automatically checks for
                donor responses.
              </Text>

            </View>

          )}


          {/* ================================================= */}
          {/* BACK HOME */}
          {/* ================================================= */}

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
        {value !== null &&
        value !== undefined &&
        value !== ''
          ? String(value)
          : '-'}
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

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: spacing.md,
    color: colors.gray,
    fontSize: 15,
  },

  icon: {
    fontSize: 65,
    textAlign: 'center',
  },

  title: {
    fontSize: 29,
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

  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
  },

  waitingStatus: {
    backgroundColor: '#FFF8E1',
  },

  acceptedStatus: {
    backgroundColor: '#E8F5E9',
  },

  statusIcon: {
    fontSize: 25,
    marginRight: 12,
  },

  statusTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.black,
  },

  statusText: {
    marginTop: 3,
    color: colors.gray,
    fontSize: 13,
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

  donorCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginTop: spacing.lg,
  },

  donorTitle: {
    color: '#2E7D32',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
  },

  waitingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginTop: spacing.lg,
  },

  waitingText: {
    flex: 1,
    marginLeft: 12,
    color: colors.gray,
    lineHeight: 20,
  },

  homeButton: {
    backgroundColor: colors.primaryRed,
    padding: 16,
    borderRadius: borderRadius.lg,
    marginTop: spacing.xl,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

});