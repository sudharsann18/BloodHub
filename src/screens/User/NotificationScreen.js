import React, { useCallback, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import {
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { getAvailableSOS } from '../../services/api';

import { colors } from '../../constants/colors';

import {
  spacing,
  borderRadius,
  shadows,
} from '../../constants/theme';

export default function NotificationScreen() {

  const navigation = useNavigation();

  const [sosRequests, setSOSRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadSOSRequests = async () => {

    try {

      setLoading(true);

      const token =
        await AsyncStorage.getItem('token');

      if (!token) {
        return;
      }

      const data =
        await getAvailableSOS(token);

      console.log(
        "Available SOS:",
        data
      );

      setSOSRequests(
        Array.isArray(data) ? data : []
      );

    } catch (error) {

      console.log(
        "SOS notification error:",
        error?.response?.data || error
      );

      Alert.alert(
        "Error",
        error?.response?.data?.message ||
        "Failed to load SOS requests."
      );

    } finally {

      setLoading(false);

    }
  };

  /*
   * Reload every time the Notifications tab
   * becomes active.
   */
  useFocusEffect(
    useCallback(() => {

      loadSOSRequests();

    }, [])
  );

  const openSOS = (sos) => {

    navigation.navigate(
      'Home',
      {
        screen: 'SOSResponse',
        params: {
          id: sos.id,

          patientName:
            sos.patientName,

          bloodGroup:
            sos.bloodGroup,

          hospital:
            sos.hospital,

          units:
            sos.units,

          phone:
            sos.phone,

          message:
            sos.message,

          status:
            sos.status,

          requestedBy:
            sos.requestedBy,

          requesterName:
            sos.requesterName,
        },
      }
    );
  };

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        padding: spacing.lg,
      }}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.title}>
        Notifications
      </Text>

      <Text style={styles.subtitle}>
        Emergency SOS Requests
      </Text>

      {loading ? (

        <View style={styles.emptyCard}>

          <Text style={styles.emptyText}>
            Loading SOS requests...
          </Text>

        </View>

      ) : sosRequests.length > 0 ? (

        sosRequests.map((sos) => (

          <TouchableOpacity
            key={sos.id}
            style={styles.card}
            onPress={() => openSOS(sos)}
          >

            <Text style={styles.icon}>
              🚨
            </Text>

            <View style={styles.content}>

              <Text style={styles.cardTitle}>
                Emergency Blood Request
              </Text>

              <Text style={styles.text}>
                Patient: {sos.patientName}
              </Text>

              <Text style={styles.text}>
                Blood Group: {sos.bloodGroup}
              </Text>

              <Text style={styles.text}>
                Units: {sos.units}
              </Text>

              <Text style={styles.text}>
                Hospital: {sos.hospital}
              </Text>

              {sos.message ? (
                <Text style={styles.text}>
                  Message: {sos.message}
                </Text>
              ) : null}

              <Text style={styles.status}>
                🔴 {sos.status}
              </Text>

              <Text style={styles.view}>
                Tap to Respond →
              </Text>

            </View>

          </TouchableOpacity>

        ))

      ) : (

        <View style={styles.emptyCard}>

          <Text style={styles.emptyIcon}>
            🔔
          </Text>

          <Text style={styles.emptyTitle}>
            No Notifications
          </Text>

          <Text style={styles.emptyText}>
            There are no emergency SOS requests
            from other users at the moment.
          </Text>

        </View>

      )}

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primaryRed,
    marginBottom: spacing.sm,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: spacing.lg,
  },

  card: {
    backgroundColor: '#FFF5F5',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    flexDirection: 'row',
    marginBottom: spacing.md,
    ...shadows.medium,
  },

  icon: {
    fontSize: 34,
    marginRight: spacing.md,
  },

  content: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaryRed,
    marginBottom: spacing.sm,
  },

  text: {
    fontSize: 15,
    color: colors.black,
    marginBottom: 6,
  },

  status: {
    marginTop: spacing.sm,
    color: colors.primaryRed,
    fontWeight: '700',
  },

  view: {
    marginTop: spacing.md,
    color: colors.primaryRed,
    fontWeight: '700',
  },

  emptyCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.medium,
  },

  emptyIcon: {
    fontSize: 50,
    marginBottom: spacing.md,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.black,
    marginBottom: spacing.sm,
  },

  emptyText: {
    textAlign: 'center',
    color: colors.gray,
    lineHeight: 22,
  },

});