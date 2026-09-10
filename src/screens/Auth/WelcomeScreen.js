import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../constants/theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.logoWrap}>
          <Text style={styles.logoText}>🩸</Text>
        </View>

        <Text style={styles.brand}>BloodHub</Text>
        <Text style={styles.title}>Blood Bank Live Radar</Text>
        <Text style={styles.subtitle}>
          Find nearby blood banks, respond to urgent requests, and support life-saving care.
        </Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton label="Login" onPress={() => navigation.navigate('Login')} />
        <PrimaryButton
          label="Create an account"
          onPress={() => navigation.navigate('Register')}
          mode="outlined"
          style={styles.secondaryButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.canvas,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  logoWrap: {
    width: 120,
    height: 120,
    borderRadius: 36,
    backgroundColor: colors.redSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  logoText: {
    fontSize: 58,
  },
  brand: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: 0.5,
  },
  title: {
    marginTop: spacing.sm,
    fontSize: 16,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: spacing.md,
    textAlign: 'center',
    color: colors.muted,
    lineHeight: 24,
    fontSize: 16,
    maxWidth: 420,
  },
  actions: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  secondaryButton: {
    marginTop: 0,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
});