import React, { useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from 'react-native';

import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PrimaryButton from '../../components/PrimaryButton';
import BloodGroupSelector from '../../components/common/BloodGroupSelector';
import InputField from '../../components/InputField';

import { createSOS } from '../../services/api';

import { colors } from '../../constants/colors';
import { bloodGroups } from '../../constants/bloodGroups';

import {
  spacing,
  borderRadius,
  shadows,
} from '../../constants/theme';

export default function SOSScreen() {
  const navigation = useNavigation();

  const [selectedGroup, setSelectedGroup] = useState('');
  const [units, setUnits] = useState('');
  const [hospital, setHospital] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);

  const broadcastSOSRequest = async () => {
    // -----------------------------------------
    // VALIDATION
    // -----------------------------------------

    if (!selectedGroup) {
      Alert.alert(
        'Error',
        'Please select a blood group.'
      );
      return;
    }

    if (!units || Number(units) <= 0) {
      Alert.alert(
        'Error',
        'Please enter valid units.'
      );
      return;
    }

    if (!hospital.trim()) {
      Alert.alert('Error', 'Please enter the hospital or care location.');
      return;
    }

    try {
      setLoading(true);

      // -----------------------------------------
      // GET JWT TOKEN
      // -----------------------------------------

      const token = await AsyncStorage.getItem('token');

      if (!token) {
        Alert.alert(
          'Login Required',
          'Please login again.'
        );
        return;
      }

      // -----------------------------------------
      // CREATE SOS REQUEST
      // -----------------------------------------

      const requestData = {
        bloodGroup: selectedGroup,
        units: Number(units),
        message: message.trim(),
        hospital: hospital.trim(),
      };

      console.log('=================================');
      console.log('CREATING SOS');
      console.log('Request Data:', requestData);
      console.log('=================================');

      const response = await createSOS(
        requestData,
        token
      );

      console.log('=================================');
      console.log('SOS CREATED');
      console.log('Response:', response);
      console.log('SOS ID:', response?.id);
      console.log('Status:', response?.status);
      console.log('=================================');

      // -----------------------------------------
      // MAKE SURE BACKEND RETURNED REAL ID
      // -----------------------------------------

      if (!response || !response.id) {
        console.log(
          'ERROR: Backend did not return SOS ID'
        );

        Alert.alert(
          'Error',
          'SOS was created but the request ID was not received.'
        );

        return;
      }

      // -----------------------------------------
      // NAVIGATE TO SOS DETAILS
      // -----------------------------------------
      //
      // IMPORTANT:
      // Navigate ONLY ONCE.
      //
      // SOSDetailsScreen will use this ID to
      // repeatedly check the backend.
      //
      // Example:
      // SOS ID = 26
      //
      // /api/sos/my
      //      ↓
      // find SOS with id = 26
      //      ↓
      // BROADCASTED
      //      ↓
      // donor accepts
      //      ↓
      // ACCEPTED
      //
      // -----------------------------------------

      navigation.navigate('SOSDetails', {
        sosId: response.id,
      });

    } catch (error) {
      console.log('=================================');
      console.log('CREATE SOS ERROR');
      console.log(
        error?.response?.data || error
      );
      console.log('=================================');

      Alert.alert(
        'Error',
        error?.response?.data?.message ||
          'Unable to create SOS request.'
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* -------------------------------- */}
        {/* TITLE */}
        {/* -------------------------------- */}

        <Text style={styles.title}>
          🚨 Emergency SOS
        </Text>

        <Text style={styles.subtitle}>
          Broadcast an emergency blood request
          to nearby donors.
        </Text>

        {/* -------------------------------- */}
        {/* MAIN CARD */}
        {/* -------------------------------- */}

        <View style={styles.card}>

          {/* BLOOD GROUP */}

          <BloodGroupSelector
            label="Blood Group"
            value={selectedGroup}
            onSelect={setSelectedGroup}
            options={bloodGroups}
          />

          <InputField
            label="Hospital or Care Location"
            value={hospital}
            onChangeText={setHospital}
            placeholder="Enter the destination hospital"
            style={styles.input}
          />

          {/* UNITS */}

          <InputField
            label="Units Required"
            value={units}
            onChangeText={setUnits}
            keyboardType="numeric"
            placeholder="Enter units"
            style={styles.input}
          />

          {/* MESSAGE */}

          <InputField
            label="Emergency Message"
            value={message}
            onChangeText={setMessage}
            placeholder="Describe the emergency"
            multiline
            style={styles.messageInput}
          />

          {/* WARNING */}

          <View style={styles.warningBox}>

            <Text style={styles.warningTitle}>
              ⚠️ Emergency Request
            </Text>

            <Text style={styles.warningText}>
              Your request will be broadcast to
              other users who may be able to donate
              blood.
            </Text>

          </View>

          {/* BROADCAST BUTTON */}

          <PrimaryButton
            label={
              loading
                ? 'Sending SOS...'
                : '🚨 Broadcast SOS'
            }
            onPress={broadcastSOSRequest}
            disabled={loading}
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
    padding: spacing.lg,
    paddingBottom: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.primaryRed,
    marginBottom: spacing.sm,
  },

  subtitle: {
    fontSize: 16,
    color: colors.gray,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.medium,
  },

  input: {
    marginTop: spacing.lg,
  },

  messageInput: {
    marginTop: spacing.lg,
    minHeight: 100,
  },

  warningBox: {
    marginTop: spacing.xl,
    padding: spacing.md,
    backgroundColor: '#FFF5F5',
    borderRadius: borderRadius.lg,
  },

  warningTitle: {
    color: colors.primaryRed,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },

  warningText: {
    color: colors.gray,
    lineHeight: 21,
  },

  button: {
    marginTop: spacing.xl,
    backgroundColor: colors.primaryRed,
  },

});