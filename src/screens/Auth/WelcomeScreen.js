import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';

import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../constants/colors';
import {
  borderRadius,
  shadows,
  spacing,
} from '../../constants/theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>

        <View style={styles.logoCircle}>
          <Text style={styles.logo}>🩸</Text>
        </View>

        <Text style={styles.title}>
          Blood Bank Live Radar
        </Text>

        <Text style={styles.subtitle}>
          Find nearby blood banks, reserve blood,
          request emergency delivery, and save lives.
        </Text>

      </View>

      <View style={styles.bottomContainer}>

        <PrimaryButton
          label="Login"
          onPress={() => navigation.navigate('Login')}
        />

        <PrimaryButton
          label="Register"
          onPress={() => navigation.navigate('Register')}
          style={styles.registerButton}
        />

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    padding: spacing.xl,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.lightRed,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
  },

  logo: {
    fontSize: 70,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.primaryRed,
    marginTop: spacing.xl,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: spacing.md,
    textAlign: 'center',
    color: colors.gray,
    lineHeight: 24,
    fontSize: 16,
    paddingHorizontal: spacing.lg,
  },

  bottomContainer: {
    marginBottom: spacing.lg,
  },

  registerButton: {
    marginTop: spacing.md,
    backgroundColor: colors.black,
  },

});