import React, { useState } from 'react';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../../components/InputField';

import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import { Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

import PrimaryButton from '../../components/PrimaryButton';

import { colors } from '../../constants/colors';
import {
  spacing,
  borderRadius,
  shadows,
} from '../../constants/theme';

export default function EmergencyBloodScreen() {

  const navigation = useNavigation();
  const route = useRoute();

  const {
    hospital = 'Apollo Blood Bank',
    bloodBankId,
    bloodGroup = 'A+',
    units = '2',
  } = route.params || {};

  const [patientName, setPatientName] = useState('');
  const [location, setLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const requestEmergency = async () => {

    if (!patientName || !location || !contactNumber) {
      Alert.alert(
        'Validation',
        'Please fill all fields'
      );
      return;
    }

    if (!bloodBankId) {
      Alert.alert(
        'Error',
        'Blood bank information is missing. Please go back and select a blood bank again.'
      );
      return;
    }

    try {

      const token = await AsyncStorage.getItem('token');

      const response = await api.post(
        '/request',
        {
          patientName,
          bloodGroup,
          units: Number(units),
          hospital,
          location,
          contactNumber,
          urgency: 'High',

          // IMPORTANT
          bloodBankId: Number(bloodBankId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert(
        'Success',
        'Emergency Request Created Successfully!'
      );

      navigation.navigate('Waiting', {
        type: 'emergency',
        request: response.data,
      });

    } catch (error) {

      console.log(
        'Emergency request error:',
        error?.response?.data || error
      );

      Alert.alert(
        'Error',
        error?.response?.data?.message ||
        'Failed to create request'
      );
    }
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
            🚨 Emergency Blood
          </Text>

          <Text style={styles.subtitle}>
            This request will be treated as HIGH PRIORITY.
          </Text>

          <View style={styles.warningCard}>

            <Text style={styles.warningTitle}>
              ⚠ High Priority Request
            </Text>

            <Text style={styles.warningText}>
              The blood bank will immediately start preparing your order
              and assign the nearest delivery partner.
            </Text>

          </View>

          <View style={styles.infoCard}>

            <InfoRow
              label="Hospital"
              value={hospital}
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
              label="Priority"
              value="HIGH"
            />

            <InfoRow
              label="Estimated Delivery"
              value="15 - 20 mins"
            />

          </View>

          <InputField
            label="Patient Name"
            placeholder="Enter patient name"
            value={patientName}
            onChangeText={setPatientName}
          />

          <InputField
            label="Current Location"
            placeholder="Enter current location"
            value={location}
            onChangeText={setLocation}
          />

          <InputField
            label="Contact Number"
            placeholder="Enter contact number"
            keyboardType="phone-pad"
            value={contactNumber}
            onChangeText={setContactNumber}
          />

          <PrimaryButton
            label="🚨 Request Emergency Blood"
            onPress={requestEmergency}
            style={styles.button}
          />

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
    fontSize: 28,
    fontWeight: '700',
    color: colors.primaryRed,
  },

  subtitle: {
    marginTop: spacing.sm,
    color: colors.gray,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },

  warningCard: {
    backgroundColor: '#FFF3CD',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },

  warningTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#D97706',
    marginBottom: 8,
  },

  warningText: {
    color: '#92400E',
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
  },

  button: {
    marginTop: spacing.xl,
  },

});