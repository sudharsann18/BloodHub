import React, { useEffect, useState, useCallback } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PrimaryButton from '../../components/PrimaryButton';

import { getMySOS } from '../../services/api';

import { colors } from '../../constants/colors';

import {
  spacing,
  borderRadius,
  shadows,
} from '../../constants/theme';
import { openPhoneDialer } from '../../utils/deviceActions';

export default function SOSDetailsScreen() {

  const navigation = useNavigation();
  const route = useRoute();

  // ==================================================
  // GET SOS ID
  // ==================================================

  const routeSOSId =
    route.params?.sosId ??
    route.params?.id;

  const [sos, setSOS] = useState(
    route.params?.sos || null
  );

  const [loading, setLoading] = useState(true);


  // ==================================================
  // LOAD SOS FROM BACKEND
  // ==================================================

  const loadSOS = useCallback(async () => {

    if (!routeSOSId) {
      console.log('❌ No SOS ID received');
      setLoading(false);
      return;
    }

    try {

      const token =
        await AsyncStorage.getItem('token');

      if (!token) {

        console.log('❌ No token found');

        setLoading(false);

        return;
      }


      console.log('================================');
      console.log('🔍 Checking SOS ID:', routeSOSId);


      // Get all SOS created by current requester
      const response =
        await getMySOS(token);


      console.log(
        '📡 SOS /my response:',
        response
      );


      const mySOSList =
        Array.isArray(response)
          ? response
          : response?.data || [];


      console.log(
        '📋 My SOS list:',
        mySOSList
      );


      // ==================================================
      // FIND EXACT SOS
      // ==================================================

      const exactSOS =
        mySOSList.find(
          item =>
            String(item.id) ===
            String(routeSOSId)
        );


      if (!exactSOS) {

        console.log(
          '❌ SOS ID not found:',
          routeSOSId
        );

        setLoading(false);

        return;
      }


      // ==================================================
      // DEBUG
      // ==================================================

      console.log('================================');
      console.log('✅ EXACT SOS FOUND:', exactSOS);

      console.log(
        '📌 BACKEND STATUS:',
        exactSOS.status
      );

      console.log(
        '👤 donorId:',
        exactSOS.donorId
      );

      console.log(
        '👤 donorName:',
        exactSOS.donorName
      );

      console.log(
        '📞 donorPhone:',
        exactSOS.donorPhone
      );

      console.log(
        '================================');


      // ==================================================
      // UPDATE SCREEN
      // ==================================================

      setSOS(exactSOS);

      setLoading(false);

    } catch (error) {

      console.log(
        '❌ Error loading SOS:',
        error?.response?.data ||
        error?.message ||
        error
      );

      setLoading(false);
    }

  }, [routeSOSId]);


  // ==================================================
  // INITIAL LOAD + POLLING
  // ==================================================

  useEffect(() => {

    if (!routeSOSId) {

      setLoading(false);

      return;
    }


    // Load immediately
    loadSOS();


    // Check backend every 3 seconds
    const interval =
      setInterval(() => {

        loadSOS();

      }, 3000);


    return () => {

      clearInterval(interval);

    };

  }, [routeSOSId, loadSOS]);


  // ==================================================
  // BACK TO HOME
  // ==================================================

  const goHome = () => {

    navigation.navigate('UserHome');

  };


  // ==================================================
  // CALL DONOR
  // ==================================================

  const callDonor = () => openPhoneDialer(sos?.donorPhone, 'Donor');


  // ==================================================
  // NO SOS ID
  // ==================================================

  if (!routeSOSId) {

    return (

      <SafeAreaView style={styles.safeArea}>

        <View style={styles.centerContainer}>

          <Text style={styles.errorTitle}>
            SOS Not Found
          </Text>

          <Text style={styles.errorText}>
            No SOS request ID was received.
          </Text>

          <PrimaryButton
            label="🏠 Back to Home"
            onPress={goHome}
            style={styles.homeButton}
          />

        </View>

      </SafeAreaView>

    );

  }


  // ==================================================
  // LOADING
  // ==================================================

  if (loading && !sos) {

    return (

      <SafeAreaView style={styles.safeArea}>

        <View style={styles.centerContainer}>

          <ActivityIndicator
            size="large"
            color={colors.primaryRed}
          />

          <Text style={styles.loadingText}>
            Loading SOS details...
          </Text>

        </View>

      </SafeAreaView>

    );

  }


  // ==================================================
  // SOS NOT FOUND
  // ==================================================

  if (!sos) {

    return (

      <SafeAreaView style={styles.safeArea}>

        <View style={styles.centerContainer}>

          <Text style={styles.errorTitle}>
            SOS Not Found
          </Text>

          <Text style={styles.errorText}>
            Unable to find this SOS request.
          </Text>

          <PrimaryButton
            label="🏠 Back to Home"
            onPress={goHome}
            style={styles.homeButton}
          />

        </View>

      </SafeAreaView>

    );

  }


  // ==================================================
  // STATUS
  // ==================================================

  const status =
    sos.status || 'BROADCASTED';


  const isAccepted =
    status === 'ACCEPTED' ||
    status === 'CONFIRMED';


  // ==================================================
  // DONOR DETAILS
  // ==================================================

  const donorName =
    sos.donorName ||
    'Donor details unavailable';


  const donorPhone =
    sos.donorPhone ||
    'Phone unavailable';


  // ==================================================
  // RENDER
  // ==================================================

  return (

    <SafeAreaView style={styles.safeArea}>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* =========================================
            TITLE
        ========================================== */}

        <Text style={styles.title}>
          🚨 SOS Request
        </Text>

        <Text style={styles.subtitle}>
          Emergency blood request status
        </Text>


        {/* =========================================
            SOS ID
        ========================================== */}

        <View style={styles.idCard}>

          <Text style={styles.idLabel}>
            SOS Request ID
          </Text>

          <Text style={styles.idValue}>
            #{sos.id}
          </Text>

        </View>


        {/* =========================================
            REQUEST DETAILS
        ========================================== */}

        <View style={styles.card}>

          <DetailRow
            label="Patient"
            value={sos.patientName || '-'}
          />

          <DetailRow
            label="Hospital"
            value={sos.hospital || '-'}
          />

          <DetailRow
            label="Phone"
            value={sos.phone || '-'}
          />

          <DetailRow
            label="Blood Group"
            value={sos.bloodGroup || '-'}
            valueStyle={styles.bloodValue}
          />

          <DetailRow
            label="Units"
            value={String(sos.units ?? '-')}
          />

          <DetailRow
            label="Message"
            value={sos.message || '-'}
          />

        </View>


        {/* =========================================
            DONOR DETAILS
        ========================================== */}

        {isAccepted && (

          <View style={styles.donorCard}>

            <Text style={styles.donorTitle}>
              🩸 Donor Details
            </Text>


            <View style={styles.donorRow}>

              <Text style={styles.donorLabel}>
                Donor
              </Text>

              <Text style={styles.donorValue}>
                {donorName}
              </Text>

            </View>


            <View style={styles.donorRow}>

              <Text style={styles.donorLabel}>
                Phone
              </Text>

              <Text style={styles.donorValue}>
                {donorPhone}
              </Text>

            </View>


            {/* CALL DONOR */}

            {sos.donorPhone && (

              <PrimaryButton
                label="📞 Call Donor"
                onPress={callDonor}
                style={styles.callButton}
              />

            )}

          </View>

        )}


        {/* =========================================
            CURRENT STATUS
        ========================================== */}

        <View style={styles.statusCard}>

          <Text style={styles.statusTitle}>
            Current Status
          </Text>


          {/* BROADCASTED */}

          {status === 'BROADCASTED' && (

            <>

              <Text style={styles.searchingText}>
                🔎 Searching for nearby donors...
              </Text>

              <Text style={styles.statusText}>
                Status: BROADCASTED
              </Text>

              <Text style={styles.statusHint}>
                Checking for donor response every 3 seconds...
              </Text>

            </>

          )}


          {/* ACCEPTED */}

          {status === 'ACCEPTED' && (

            <>

              <Text style={styles.acceptedText}>
                🩸 A donor has accepted your SOS!
              </Text>

              <Text style={styles.statusText}>
                Status: ACCEPTED
              </Text>

              <Text style={styles.statusHint}>
                Donor response received successfully.
              </Text>

            </>

          )}


          {/* CONFIRMED */}

          {status === 'CONFIRMED' && (

            <>

              <Text style={styles.acceptedText}>
                ✅ Donor confirmed!
              </Text>

              <Text style={styles.statusText}>
                Status: CONFIRMED
              </Text>

              <Text style={styles.statusHint}>
                Your donor has been confirmed.
              </Text>

            </>

          )}


          {/* OTHER STATUS */}

          {status !== 'BROADCASTED' &&
            status !== 'ACCEPTED' &&
            status !== 'CONFIRMED' && (

              <Text style={styles.statusText}>
                Status: {status}
              </Text>

            )}

        </View>


        {/* =========================================
            BACK HOME
        ========================================== */}

        <PrimaryButton
          label="🏠 Back to Home"
          onPress={goHome}
          style={styles.homeButton}
        />

      </ScrollView>

    </SafeAreaView>

  );

}


// ==================================================
// DETAIL ROW
// ==================================================

function DetailRow({
  label,
  value,
  valueStyle,
}) {

  return (

    <View style={styles.detailRow}>

      <Text style={styles.detailLabel}>
        {label}
      </Text>

      <Text
        style={[
          styles.detailValue,
          valueStyle,
        ]}
      >
        {value}
      </Text>

    </View>

  );

}


// ==================================================
// STYLES
// ==================================================

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },


  container: {
    padding: spacing.lg,
    paddingBottom: 40,
  },


  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primaryRed,
    marginBottom: spacing.sm,
  },


  subtitle: {
    fontSize: 15,
    color: colors.gray,
    marginBottom: spacing.lg,
  },


  // ===============================================
  // ID CARD
  // ===============================================

  idCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },


  idLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },


  idValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
  },


  // ===============================================
  // MAIN CARD
  // ===============================================

  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.medium,
  },


  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },


  detailLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#777',
    flex: 1,
  },


  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
    textAlign: 'right',
    flex: 2,
  },


  bloodValue: {
    color: colors.primaryRed,
    fontSize: 17,
    fontWeight: '700',
  },


  // ===============================================
  // DONOR CARD
  // ===============================================

  donorCard: {
    backgroundColor: '#EAF7EC',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },


  donorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#087F23',
    marginBottom: spacing.lg,
  },


  donorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },


  donorLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },


  donorValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    textAlign: 'right',
    flex: 1,
    marginLeft: 20,
  },


  callButton: {
    marginTop: spacing.md,
    backgroundColor: '#2E7D32',
  },


  // ===============================================
  // STATUS CARD
  // ===============================================

  statusCard: {
    backgroundColor: '#FFF5F5',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },


  statusTitle: {
    color: colors.primaryRed,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },


  searchingText: {
    color: '#111',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.md,
  },


  acceptedText: {
    color: '#087F23',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: spacing.md,
  },


  statusText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },


  statusHint: {
    color: '#777',
    fontSize: 14,
    fontStyle: 'italic',
  },


  // ===============================================
  // BUTTON
  // ===============================================

  homeButton: {
    backgroundColor: colors.primaryRed,
    marginTop: spacing.sm,
  },


  // ===============================================
  // LOADING / ERROR
  // ===============================================

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },


  loadingText: {
    marginTop: spacing.md,
    color: '#666',
    fontSize: 15,
  },


  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primaryRed,
    marginBottom: spacing.sm,
  },


  errorText: {
    color: '#777',
    fontSize: 15,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },

});;