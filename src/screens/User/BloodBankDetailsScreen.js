import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../constants/colors';
import {
  borderRadius,
  shadows,
  spacing,
} from '../../constants/theme';

export default function BloodBankDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const bank = route.params?.bank;
  const requestedGroup = route.params?.requestedGroup;
  const requestedUnits = route.params?.requestedUnits;

  const reserveBlood = () => {
  navigation.navigate('ReserveBlood', {
    hospital: bank?.name,
    bloodGroup: requestedGroup,
    units: requestedUnits,
  });
};

const emergencyBlood = () => {
  navigation.navigate('EmergencyBlood', {
    hospital: bank?.name,
    bloodGroup: requestedGroup,
    units: requestedUnits,
  });
};

  const callHospital = () => {
    Alert.alert(
      'Contact Blood Bank',
      'Calling feature will be connected later.'
    );
  };

  const getDirections = () => {
    Alert.alert(
      'Directions',
      'Google Maps integration coming next.'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.banner}>
          <Text style={styles.bannerIcon}>🏥</Text>
        </View>

        <View style={styles.card}>

          <Text style={styles.name}>
            {bank?.name}
          </Text>

          <Text style={styles.address}>
            {bank?.address}
          </Text>

          <View style={styles.infoBox}>

            <View style={styles.row}>
              <Text style={styles.label}>Distance</Text>
              <Text style={styles.value}>
                {bank?.distance}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Requested Blood
              </Text>

              <Text style={styles.value}>
                {requestedGroup}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Requested Units
              </Text>

              <Text style={styles.value}>
                {requestedUnits}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Available Units
              </Text>

              <Text style={styles.available}>
                {bank?.units}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Blood Groups
              </Text>

              <Text style={styles.value}>
                {bank?.bloodTypes.join(', ')}
              </Text>
            </View>

          </View>

          <View style={styles.statusCard}>
            <Text style={styles.statusTitle}>
              Availability
            </Text>

            <Text style={styles.statusText}>
              Blood is currently available.
              Reserve immediately before stock changes.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.callButton}
            onPress={callHospital}
          >
            <Text style={styles.callText}>
              📞 Call Blood Bank
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.directionButton}
            onPress={getDirections}
          >
            <Text style={styles.directionText}>
              📍 Get Directions
            </Text>
          </TouchableOpacity>

          <PrimaryButton
  label="🕒 Reserve Blood"
  onPress={reserveBlood}
  style={styles.reserveButton}
/>

<PrimaryButton
  label="🚨 Emergency Blood"
  onPress={emergencyBlood}
  style={styles.emergencyButton}
/>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  banner: {
    height: 220,
    backgroundColor: colors.primaryRed,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bannerIcon: {
    fontSize: 80,
  },

  card: {
    backgroundColor: colors.white,
    margin: spacing.lg,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginTop: -40,
    ...shadows.medium,
  },

  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.black,
  },

  address: {
    color: colors.gray,
    marginTop: 5,
    marginBottom: 20,
  },

  infoBox: {
    backgroundColor: '#fafafa',
    borderRadius: 15,
    padding: 15,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },

  label: {
    color: colors.gray,
    fontSize: 15,
  },

  value: {
    fontWeight: '600',
    color: colors.black,
  },

  available: {
    color: 'green',
    fontWeight: '700',
  },

  statusCard: {
    marginTop: 20,
    backgroundColor: '#FFF4F4',
    padding: 18,
    borderRadius: 15,
  },

  statusTitle: {
    color: colors.primaryRed,
    fontWeight: '700',
    marginBottom: 5,
    fontSize: 17,
  },

  statusText: {
    color: colors.gray,
    lineHeight: 22,
  },

  callButton: {
    marginTop: 25,
    backgroundColor: '#EEF8FF',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
  },

  callText: {
    color: '#007AFF',
    fontWeight: '700',
    fontSize: 16,
  },

  directionButton: {
    marginTop: 12,
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
  },

  directionText: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 16,
  },

  reserveButton: {
    marginTop: 25,
  },
  emergencyButton: {
  marginTop: 12,
  backgroundColor: '#D32F2F',
},

});