import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../../constants/colors';
import {
  borderRadius,
  shadows,
  spacing,
} from '../../constants/theme';

export default function SOSDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    patientName = '',
    hospitalName = '',
    phone = '',
    bloodGroup = '',
    units = '',
    message = '',
  } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>

        <Text style={styles.icon}>🚨</Text>

        <Text style={styles.title}>
          SOS Request Sent
        </Text>

        <Text style={styles.subtitle}>
          Your emergency blood request has been
          successfully broadcast to nearby users
          and blood banks.
        </Text>

        <View style={styles.details}>

          <View style={styles.row}>
            <Text style={styles.label}>Patient</Text>
            <Text style={styles.value}>{patientName}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Hospital</Text>
            <Text style={styles.value}>{hospitalName}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{phone}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Blood Group</Text>
            <Text style={styles.value}>{bloodGroup}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Units</Text>
            <Text style={styles.value}>{units}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Message</Text>
            <Text style={styles.value}>
              {message || '-'}
            </Text>
          </View>

        </View>

        <View style={styles.statusBox}>
          <Text style={styles.statusTitle}>
            Current Status
          </Text>

          <Text style={styles.status}>
            🔍 Searching nearby donors...
          </Text>

          <Text style={styles.status}>
            🏥 Alert sent to blood banks...
          </Text>

          <Text style={styles.status}>
            📱 Nearby users notified...
          </Text>
        </View>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() =>
            navigation.navigate('Home')
          }
        >
          <Text style={styles.homeText}>
            Back to Home
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: spacing.lg,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    ...shadows.medium,
  },

  icon: {
    fontSize: 70,
    textAlign: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.primaryRed,
    textAlign: 'center',
    marginTop: 15,
  },

  subtitle: {
    textAlign: 'center',
    color: colors.gray,
    marginTop: 10,
    lineHeight: 22,
  },

  details: {
    marginTop: 30,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  label: {
    fontWeight: '700',
    color: colors.gray,
  },

  value: {
    color: colors.black,
    fontWeight: '600',
    maxWidth: '60%',
    textAlign: 'right',
  },

  statusBox: {
    marginTop: 30,
    backgroundColor: '#FFF5F5',
    borderRadius: 15,
    padding: 20,
  },

  statusTitle: {
    color: colors.primaryRed,
    fontWeight: '700',
    marginBottom: 10,
  },

  status: {
    marginTop: 8,
    color: colors.black,
  },

  homeButton: {
    marginTop: 30,
    backgroundColor: colors.primaryRed,
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
  },

  homeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
  },

});