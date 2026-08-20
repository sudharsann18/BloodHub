import React, { useState } from 'react';

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

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  acceptSOS,
} from '../../services/api';

import { colors } from '../../constants/colors';

import {
  borderRadius,
  shadows,
  spacing,
} from '../../constants/theme';

export default function SOSResponseScreen() {

  const navigation = useNavigation();
  const route = useRoute();

  const [loading, setLoading] = useState(false);

  const {
    id,

    patientName = '',
    bloodGroup = '',
    hospital = '',
    units = '',
    phone = '',
    message = '',
  } = route.params || {};

  const handleAcceptSOS = async () => {

    if (!id) {

      Alert.alert(
        "Error",
        "SOS request ID is missing."
      );

      return;
    }

    try {

      setLoading(true);

      const token =
        await AsyncStorage.getItem('token');

      if (!token) {

        Alert.alert(
          "Login Required",
          "Please login again."
        );

        return;
      }

      const response =
        await acceptSOS(id, token);

      console.log(
        "SOS accepted:",
        response
      );

      Alert.alert(
        "Success",
        "You have accepted this SOS request.",
        [
          {
            text: "OK",
            onPress: () => {

              navigation.navigate(
                "SOSAccepted",
                {
                  ...response,
                }
              );

            },
          },
        ]
      );

    } catch (error) {

      console.log(
        "SOS accept error:",
        error?.response?.data || error
      );

      Alert.alert(
        "Error",
        error?.response?.data?.message ||
        "Unable to accept SOS request."
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
              value={String(units)}
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

          <View style={styles.messageBox}>

            <Text style={styles.messageTitle}>
              Emergency Message
            </Text>

            <Text style={styles.message}>
              {message || "No additional message."}
            </Text>

          </View>

          <TouchableOpacity
            style={styles.callButton}
            onPress={() =>
              Alert.alert(
                "Call",
                `Patient phone: ${phone}`
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
            style={[
              styles.acceptButton,
              loading && styles.disabledButton,
            ]}
            onPress={handleAcceptSOS}
            disabled={loading}
          >

            <Text style={styles.buttonText}>

              {loading
                ? "Accepting..."
                : "❤️ I'm Coming to Donate"}

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
        {value || '-'}
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

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

});