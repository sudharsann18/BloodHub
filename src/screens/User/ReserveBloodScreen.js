import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';

import { colors } from '../../constants/colors';
import {
  spacing,
  borderRadius,
  shadows,
} from '../../constants/theme';

export default function ReserveBloodScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    hospital = "Apollo Blood Bank",
    bloodGroup = "A+",
    units = "2",
  } = route.params || {};

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const reserveBlood = () => {
    navigation.navigate("Waiting", {
      type: "reservation",
      hospital,
      bloodGroup,
      units,
      date,
      time,
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
            🕒 Reserve Blood
          </Text>

          <Text style={styles.subtitle}>
            Schedule your blood delivery in advance.
          </Text>

          <View style={styles.infoCard}>

            <InfoRow label="Hospital" value={hospital} />
            <InfoRow label="Blood Group" value={bloodGroup} />
            <InfoRow label="Units" value={units} />

          </View>

          <InputField
            label="Delivery Date"
            placeholder="Example: 20-07-2026"
            value={date}
            onChangeText={setDate}
          />

          <InputField
            label="Delivery Time"
            placeholder="Example: 10:30 AM"
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
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
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
    fontSize: 26,
    fontWeight: '700',
    color: colors.primaryRed,
  },

  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    color: colors.gray,
  },

  infoCard: {
    backgroundColor: '#FFF5F5',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
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
    marginTop: spacing.lg,
  },

});