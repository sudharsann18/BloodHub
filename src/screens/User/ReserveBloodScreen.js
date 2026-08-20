import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Text } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";

import { createReservation } from "../../services/api";

import { colors } from "../../constants/colors";
import {
  spacing,
  borderRadius,
  shadows,
} from "../../constants/theme";

export default function ReserveBloodScreen() {

  const navigation = useNavigation();
  const route = useRoute();

  const {
    hospital = "Apollo Blood Bank",
    bloodBankId,
    bloodGroup = "A+",
    units = "2",
  } = route.params || {};

  const [patientName, setPatientName] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const reserveBlood = async () => {

    if (
      !patientName ||
      !location ||
      !contactNumber ||
      !date ||
      !time
    ) {
      Alert.alert("Validation", "Please fill all fields.");
      return;
    }

    if (!bloodBankId) {
      Alert.alert(
        "Error",
        "Blood bank information is missing. Please go back and select a blood bank again."
      );
      return;
    }

    try {

      const token = await AsyncStorage.getItem("token");

      await createReservation(
        {
          patientName,
          bloodGroup,
          units: Number(units),
          hospital,
          location,
          contactNumber,
          reservationDate: date,
          reservationTime: time,

          // IMPORTANT
          bloodBankId: Number(bloodBankId),
        },
        token
      );

      Alert.alert(
        "Success",
        "Reservation created successfully."
      );

      navigation.navigate("Waiting", {
        type: "reservation",
        hospital,
        bloodGroup,
        units,
        date,
        time,
      });

    } catch (error) {

      console.log(
        "Reservation error:",
        error?.response?.data || error
      );

      Alert.alert(
        "Error",
        error?.response?.data?.message ||
        "Failed to create reservation."
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
            🕒 Reserve Blood
          </Text>

          <Text style={styles.subtitle}>
            Schedule your blood delivery in advance.
          </Text>

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

          <InputField
            label="Delivery Date"
            placeholder="2026-08-10"
            value={date}
            onChangeText={setDate}
          />

          <InputField
            label="Delivery Time"
            placeholder="10:30:00"
            value={time}
            onChangeText={setTime}
          />

          <PrimaryButton
            label="Confirm Reservation"
            onPress={reserveBlood}
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
    fontWeight: "700",
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
    fontWeight: "700",
    color: colors.primaryRed,
  },

  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    color: colors.gray,
  },

  infoCard: {
    backgroundColor: "#FFF5F5",
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },

  label: {
    color: colors.gray,
    fontWeight: "600",
  },

  value: {
    color: colors.black,
    fontWeight: "700",
  },

  button: {
    marginTop: spacing.lg,
  },

});