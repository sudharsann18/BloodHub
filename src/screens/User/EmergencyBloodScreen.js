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
    bloodGroup = 'A+',
    units = '2',
  } = route.params || {};

  const requestEmergency = () => {
    navigation.navigate('Waiting', {
      type: 'emergency',
      hospital,
      bloodGroup,
      units,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
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