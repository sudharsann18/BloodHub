import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { Text, TextInput } from 'react-native-paper';

import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../constants/theme';
import api from '../../services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      alert('Please enter your email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!password) {
      alert('Please enter your password.');
      return;
    }

    try {
      const response = await api.post('/auth/login', {
        email: trimmedEmail,
        password,
      });

      const user = response.data;
      await AsyncStorage.setItem('token', user.token);
      await AsyncStorage.setItem('role', user.role);
      await AsyncStorage.setItem('name', user.fullName);

      if (user.role === 'USER') {
        navigation.replace('UserApp');
        return;
      }

      if (user.role === 'BLOOD_BANK') {
        navigation.replace('BloodBankApp');
        return;
      }

      await AsyncStorage.multiRemove(['token', 'role', 'name']);
      alert('This account type is no longer available in this app.');
    } catch (error) {
      const message = error?.response?.data?.message || error?.response?.data || 'Unable to connect to the server.';
      alert(message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <View style={styles.brandWrap}>
              <View style={styles.logoWrap}>
                <Text style={styles.logoText}>🩸</Text>
              </View>
              <Text style={styles.brand}>BloodHub</Text>
              <Text style={styles.brandSub}>Blood Bank Live Radar</Text>
            </View>

            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to BloodHub</Text>

            <TextInput
              mode="outlined"
              label="Email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Enter your email"
              placeholderTextColor={colors.muted}
              textColor={colors.text}
              selectionColor={colors.red}
              outlineColor={colors.border}
              activeOutlineColor={colors.red}
              style={styles.input}
              theme={{
                colors: {
                  primary: colors.red,
                  text: colors.text,
                  placeholder: colors.muted,
                  background: colors.surface,
                  onSurfaceVariant: colors.text,
                },
              }}
            />

            <TextInput
              mode="outlined"
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="Enter your password"
              placeholderTextColor={colors.muted}
              textColor={colors.text}
              selectionColor={colors.red}
              outlineColor={colors.border}
              activeOutlineColor={colors.red}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={colors.muted}
                  onPress={() => setShowPassword((value) => !value)}
                />
              }
              theme={{
                colors: {
                  primary: colors.red,
                  text: colors.text,
                  placeholder: colors.muted,
                  background: colors.surface,
                  onSurfaceVariant: colors.text,
                },
              }}
            />

            <PrimaryButton
              label="Login"
              onPress={handleLogin}
              style={styles.loginButton}
            />

            <View style={styles.dividerWrap}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.registerRow}>
              <Text style={styles.registerPrompt}>Don’t have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  brandWrap: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.redSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  logoText: {
    fontSize: 30,
  },
  brand: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: 0.5,
  },
  brandSub: {
    marginTop: 4,
    fontSize: 12,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.muted,
    marginBottom: spacing.lg,
  },
  input: {
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
  },
  loginButton: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  dividerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    color: colors.muted,
    fontWeight: '700',
    letterSpacing: 1,
  },
  registerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
  },
  registerPrompt: {
    color: colors.muted,
    marginRight: 6,
  },
  registerText: {
    color: colors.red,
    fontWeight: '700',
  },
});