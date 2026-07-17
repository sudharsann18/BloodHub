import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useSOS } from '../../context/SOSContext';

import { colors } from '../../constants/colors';
import {
  spacing,
  borderRadius,
  shadows,
} from '../../constants/theme';

export default function NotificationScreen() {
  const navigation = useNavigation();

  const { sosRequest } = useSOS();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: spacing.lg }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        Notifications
      </Text>

      <Text style={styles.subtitle}>
        Emergency SOS Requests
      </Text>

      {sosRequest ? (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('Home', {
              screen: 'SOSResponse',
              params: {
                patientName: sosRequest.patientName,
                bloodGroup: sosRequest.bloodGroup,
                hospital: sosRequest.hospitalName,
                units: sosRequest.units,
                distance: sosRequest.distance,
                phone: sosRequest.phone,
                message: sosRequest.message,
              },
            })
          }
        >
          <Text style={styles.icon}>🚨</Text>

          <View style={styles.content}>
            <Text style={styles.cardTitle}>
              Emergency Blood Request
            </Text>

            <Text style={styles.text}>
              Patient : {sosRequest.patientName}
            </Text>

            <Text style={styles.text}>
              Blood Group : {sosRequest.bloodGroup}
            </Text>

            <Text style={styles.text}>
              Units : {sosRequest.units}
            </Text>

            <Text style={styles.text}>
              Hospital : {sosRequest.hospitalName}
            </Text>

            <Text style={styles.text}>
              Status : {sosRequest.status}
            </Text>

            <Text style={styles.view}>
              Tap to View →
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>🔔</Text>

          <Text style={styles.emptyTitle}>
            No Notifications
          </Text>

          <Text style={styles.emptyText}>
            There are no emergency SOS requests at the moment.
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