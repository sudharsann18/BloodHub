import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Text, TextInput } from "react-native-paper";

import PrimaryButton from "../../components/PrimaryButton";

import { colors } from "../../constants/colors";
import {
  spacing,
  borderRadius,
  shadows,
} from "../../constants/theme";

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );

      const user = response.data;

      await AsyncStorage.setItem("token", user.token);
      await AsyncStorage.setItem("role", user.role);
      await AsyncStorage.setItem("name", user.fullName);

      alert("Login Successful");

      if (user.role === "USER") {
        navigation.replace("UserApp");
      }
      else if (user.role === "BLOOD_BANK") {
        navigation.replace("BloodBankApp");
      }
      else if (user.role === "DELIVERY_PARTNER") {
        navigation.replace("DeliveryApp");
      }

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message || error.response.data);
      } else {
        alert("Unable to connect to server");
      }

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
          keyboardType="email-address"
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

        <PrimaryButton
          label="Login"
          onPress={handleLogin}
          style={styles.loginButton}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
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
    justifyContent: "center",
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
    fontWeight: "700",
    color: colors.primaryRed,
  },

  subtitle: {
    color: colors.gray,
    marginBottom: spacing.lg,
  },

  input: {
    marginBottom: spacing.md,
  },

  loginButton: {
    marginTop: spacing.lg,
  },

  registerText: {
    marginTop: spacing.lg,
    textAlign: "center",
    color: colors.primaryRed,
    fontWeight: "600",
  },

});