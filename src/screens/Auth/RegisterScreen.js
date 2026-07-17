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

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleRegister = () => {
    // Firebase registration will be added later

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

        <Text style={styles.title}>Create Account</Text>

        <Text style={styles.subtitle}>
          Register to continue
        </Text>

        <TextInput
          mode="outlined"
          label="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          mode="outlined"
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TextInput
          mode="outlined"
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />

        <Text style={styles.roleTitle}>
          Select Role
        </Text>

        <RadioButton.Group
          value={role}
          onValueChange={setRole}
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
          label="Register"
          onPress={handleRegister}
          style={styles.button}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>
            Already have an account? Login
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

  button: {
    marginTop: spacing.lg,
  },

  loginText: {
    marginTop: spacing.lg,
    textAlign: 'center',
    color: colors.primaryRed,
    fontWeight: '600',
  },

});
