import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../../services/api';

import { colors } from '../../constants/colors';
import {
  borderRadius,
  shadows,
  spacing,
} from '../../constants/theme';

export default function MapScreen() {

  const navigation = useNavigation();
  const route = useRoute();

  const bloodGroup = route.params?.bloodGroup || 'A+';
  const units = Number(route.params?.units || 1);

  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // GET INVENTORY FROM BACKEND
  // ==========================================

  const fetchInventory = async () => {

    try {

      const response = await api.get('/inventory');

      console.log('Inventory:', response.data);

      /*
       * Backend returns:
       *
       * {
       *   id,
       *   bloodGroup,
       *   units,
       *   bloodBankId,
       *   bloodBankName
       * }
       */

      const inventory = response.data;

      // Only show banks that have the requested blood group
      const filtered = inventory.filter(
        item =>
          item.bloodGroup === bloodGroup &&
          item.units >= units
      );

      // Convert inventory rows into blood-bank cards
      const bankMap = {};

      filtered.forEach(item => {

        const bankId = item.bloodBankId;

        if (!bankMap[bankId]) {

          bankMap[bankId] = {
            id: bankId.toString(),
            name: item.bloodBankName,
            bloodBankId: item.bloodBankId,
            bloodTypes: [],
            units: item.units,
          };

        }

        bankMap[bankId].bloodTypes.push(item.bloodGroup);
      });

      setBloodBanks(Object.values(bankMap));

    } catch (error) {

      console.log(
        'Inventory error:',
        error.response?.data || error
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchInventory();

  }, [bloodGroup, units]);

  // ==========================================
  // OPEN BLOOD BANK DETAILS
  // ==========================================

  const openBloodBank = (bank) => {

    navigation.navigate('BloodBankDetails', {

      bank: {
        ...bank,

        // Temporary display values
        address: 'Chennai',

        distance: 'Nearby',
      },

      requestedGroup: bloodGroup,

      requestedUnits: units,

    });
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <SafeAreaView style={styles.loader}>

        <ActivityIndicator
          size="large"
          color={colors.primaryRed}
        />

        <Text style={styles.loadingText}>
          Finding blood banks...
        </Text>

      </SafeAreaView>
    );
  }

  // ==========================================
  // RENDER BANK
  // ==========================================

  const renderItem = ({ item }) => (

    <View
      style={styles.card}
    >

      <View style={styles.row}>

        <Text style={styles.icon}>
          🏥
        </Text>

        <View style={styles.bankInfo}>

          <Text style={styles.name}>
            {item.name}
          </Text>

          <Text style={styles.address}>
            Chennai
          </Text>

          <Text style={styles.distance}>
            🩸 {bloodGroup}
          </Text>

          <Text style={styles.stock}>
            Available Units: {item.units}
          </Text>

        </View>

        <Text
          style={styles.arrow}
          onPress={() => openBloodBank(item)}
        >
          ›
        </Text>

      </View>

    </View>
  );

  // ==========================================
  // SCREEN
  // ==========================================

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

        data={bloodBanks}

        keyExtractor={(item) =>
          item.id.toString()
        }

        renderItem={renderItem}

        contentContainerStyle={{
          paddingBottom: 30,
        }}

        ListEmptyComponent={

          <View style={styles.empty}>

            <Text style={styles.emptyIcon}>
              🩸
            </Text>

            <Text style={styles.emptyText}>
              No Blood Banks Found
            </Text>

            <Text style={styles.emptySubText}>
              No blood bank currently has enough
              {` ${bloodGroup} `}blood.
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

  loader: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 12,
    color: colors.gray,
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

  bankInfo: {
    flex: 1,
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
    fontWeight: '600',
  },

  arrow: {
    fontSize: 32,
    color: colors.primaryRed,
    fontWeight: '700',
    paddingHorizontal: 10,
  },

  empty: {
    marginTop: 80,
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  emptyIcon: {
    fontSize: 50,
    marginBottom: 15,
  },

  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
  },

  emptySubText: {
    marginTop: 8,
    textAlign: 'center',
    color: colors.gray,
  },

});