import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
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

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim()) {
      alert('Please enter your full name.');
      return;
    }

    if (!email.trim()) {
      alert('Please enter your email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!phone.trim()) {
      alert('Please enter your phone number.');
      return;
    }

    if (!password) {
      alert('Please enter your password.');
      return;
    }

    if (!confirmPassword) {
      alert('Please confirm your password.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register', {
        fullName: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        role,
      });

      alert(response.data?.message || 'Account created successfully.');
      navigation.navigate('Login');
    } catch (error) {
      const message = error?.response?.data?.message || error?.response?.data || 'Unable to connect to the server.';
      alert(message);
    } finally {
      setLoading(false);
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
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <View style={styles.brandWrap}>
              <View style={styles.logoWrap}>
                <Text style={styles.logoText}>🩸</Text>
              </View>
              <Text style={styles.brand}>BloodHub</Text>
              <Text style={styles.brandSub}>Blood Bank Live Radar</Text>
            </View>

            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>Join BloodHub to help patients find blood when they need it.</Text>

            <TextInput
              mode="outlined"
              label="Full name"
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
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
              label="Phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="Enter your phone number"
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

            <TextInput
              mode="outlined"
              label="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholder="Re-enter your password"
              placeholderTextColor={colors.muted}
              textColor={colors.text}
              selectionColor={colors.red}
              outlineColor={colors.border}
              activeOutlineColor={colors.red}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={colors.muted}
                  onPress={() => setShowConfirmPassword((value) => !value)}
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

            <Text style={styles.roleTitle}>Account type</Text>
            <View style={styles.roleGrid}>
              <Pressable
                onPress={() => setRole('USER')}
                style={[styles.roleCard, role === 'USER' && styles.roleCardSelected]}
              >
                <Text style={styles.roleIcon}>👤</Text>
                <Text style={[styles.roleLabel, role === 'USER' && styles.roleLabelSelected]}>User</Text>
                <Text style={styles.roleHint}>Find and request blood</Text>
              </Pressable>
              <Pressable
                onPress={() => setRole('BLOOD_BANK')}
                style={[styles.roleCard, role === 'BLOOD_BANK' && styles.roleCardSelected]}
              >
                <Text style={styles.roleIcon}>🏥</Text>
                <Text style={[styles.roleLabel, role === 'BLOOD_BANK' && styles.roleLabelSelected]}>Blood Bank</Text>
                <Text style={styles.roleHint}>Manage blood inventory</Text>
              </Pressable>
            </View>

            <PrimaryButton
              label={loading ? 'Creating account...' : 'Create Account'}
              onPress={handleRegister}
              disabled={loading}
              loading={loading}
              style={styles.button}
            />

            <View style={styles.loginRow}>
              <Text style={styles.loginPrompt}>Already registered?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>Login</Text>
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
    fontSize: 15,
    color: colors.muted,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  input: {
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
  },
  roleTitle: {
    marginBottom: spacing.sm,
    color: colors.text,
    fontWeight: '700',
    fontSize: 16,
  },
  roleGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  roleCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    minHeight: 96,
    justifyContent: 'center',
  },
  roleCardSelected: {
    borderColor: colors.red,
    backgroundColor: colors.redSoft,
  },
  roleIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  roleLabel: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '700',
    marginBottom: 2,
  },
  roleLabelSelected: {
    color: colors.red,
  },
  roleHint: {
    fontSize: 12,
    color: colors.muted,
  },
  button: {
    marginTop: spacing.sm,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: spacing.lg,
  },
  loginPrompt: {
    color: colors.muted,
    marginRight: 6,
  },
  loginText: {
    color: colors.red,
    fontWeight: '700',
  },
});
