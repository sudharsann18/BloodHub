import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { Text, TextInput, RadioButton } from 'react-native-paper';

import PrimaryButton from '../../components/PrimaryButton';

import { colors } from '../../constants/colors';
import {
  spacing,
  borderRadius,
  shadows,
} from '../../constants/theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleLogin = () => {
    // Firebase Authentication will be added later

    if (role === 'user') {
      navigation.replace('UserApp');
    } else if (role === 'bloodbank') {
      navigation.replace('BloodBankApp');
    } else {
      navigation.replace('DeliveryApp');
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.title}>
          Login
        </Text>

        <Text style={styles.subtitle}>
          Sign in to continue
        </Text>

        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />

        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <Text style={styles.roleTitle}>
          Select Role
        </Text>

        <RadioButton.Group
          onValueChange={setRole}
          value={role}
        >

          <View style={styles.radioRow}>
            <RadioButton value="user" />
            <Text>User</Text>
          </View>

          <View style={styles.radioRow}>
            <RadioButton value="bloodbank" />
            <Text>Blood Bank</Text>
          </View>

          <View style={styles.radioRow}>
            <RadioButton value="delivery" />
            <Text>Delivery Partner</Text>
          </View>

        </RadioButton.Group>

        <PrimaryButton
          label="Login"
          onPress={handleLogin}
          style={styles.loginButton}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.lg,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    ...shadows.medium,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primaryRed,
  },

  subtitle: {
    color: colors.gray,
    marginBottom: spacing.lg,
  },

  input: {
    marginBottom: spacing.md,
  },

  roleTitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
    fontWeight: '700',
    fontSize: 16,
  },

  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  loginButton: {
    marginTop: spacing.lg,
  },

  registerText: {
    marginTop: spacing.lg,
    textAlign: 'center',
    color: colors.primaryRed,
    fontWeight: '600',
  },

});