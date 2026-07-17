import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../../constants/colors';
import { borderRadius, shadows, spacing } from '../../constants/theme';

const bloodBanks = [
  {
    id: '1',
    name: 'Apollo Blood Bank',
    distance: '1.2 km',
    address: 'Anna Nagar, Chennai',
    bloodTypes: ['A+', 'O+', 'B+', 'AB+'],
    units: 18,
  },
  {
    id: '2',
    name: 'Government Blood Bank',
    distance: '2.5 km',
    address: 'Kilpauk, Chennai',
    bloodTypes: ['O-', 'A+', 'B-'],
    units: 12,
  },
  {
    id: '3',
    name: 'Red Cross Blood Centre',
    distance: '3.8 km',
    address: 'T Nagar, Chennai',
    bloodTypes: ['A+', 'AB+', 'O+'],
    units: 25,
  },
  {
    id: '4',
    name: 'City Care Blood Bank',
    distance: '5.1 km',
    address: 'Velachery, Chennai',
    bloodTypes: ['B+', 'AB-', 'O-'],
    units: 9,
  },
];

export default function MapScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const bloodGroup = route.params?.bloodGroup || 'A+';
  const units = route.params?.units || '1';

  const availableBanks = bloodBanks.filter((bank) =>
    bank.bloodTypes.includes(bloodGroup)
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('BloodBankDetails', {
          bank: item,
          requestedGroup: bloodGroup,
          requestedUnits: units,
        })
      }
    >
      <View style={styles.row}>
        <Text style={styles.icon}>🏥</Text>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>

          <Text style={styles.address}>
            {item.address}
          </Text>

          <Text style={styles.distance}>
            📍 {item.distance}
          </Text>

          <Text style={styles.stock}>
            Available Blood: {item.bloodTypes.join(', ')}
          </Text>

          <Text style={styles.units}>
            Total Units: {item.units}
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.heading}>
        Nearby Blood Banks
      </Text>

      <Text style={styles.subHeading}>
        Blood Group : {bloodGroup}
      </Text>

      <Text style={styles.subHeading}>
        Units Needed : {units}
      </Text>

      <FlatList
        data={availableBanks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No Blood Banks Found
            </Text>
          </View>
        }
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },

  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.primaryRed,
    marginBottom: 5,
  },

  subHeading: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 4,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.md,
    ...shadows.medium,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    fontSize: 32,
    marginRight: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
  },

  address: {
    color: colors.gray,
    marginTop: 3,
  },

  distance: {
    marginTop: 6,
    color: colors.primaryRed,
    fontWeight: '600',
  },

  stock: {
    marginTop: 6,
    color: colors.black,
  },

  units: {
    marginTop: 4,
    color: colors.black,
    fontWeight: '600',
  },

  arrow: {
    fontSize: 30,
    color: colors.primaryRed,
    fontWeight: '700',
  },

  empty: {
    marginTop: 80,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 18,
    color: colors.gray,
  },

});