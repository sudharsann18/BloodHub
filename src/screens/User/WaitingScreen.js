import React, { useEffect, useRef } from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

import { colors } from '../../constants/colors';
import {
  borderRadius,
  shadows,
  spacing,
} from '../../constants/theme';

const WaitingScreen = () => {
  const route = useRoute();

  const {
    type = 'reservation',
    hospital = 'Blood Bank',
    bloodGroup = '',
    units = '',
    date = '',
    time = '',
  } = route.params || {};

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, []);

  const isEmergency = type === 'emergency';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={styles.card}>

          <Animated.View
            style={[
              styles.iconCircle,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <Text style={styles.icon}>
              {isEmergency ? '🚨' : '🩸'}
            </Text>
          </Animated.View>

          <Text style={styles.title}>
            {isEmergency
              ? 'Emergency Request Sent'
              : 'Reservation Confirmed'}
          </Text>

          <Text style={styles.subtitle}>
            {isEmergency
              ? 'The blood bank is preparing your order immediately.'
              : 'Your blood reservation has been successfully scheduled.'}
          </Text>

          <View style={styles.infoBox}>

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
              value={String(units)}
            />

            {!isEmergency && (
              <>
                <InfoRow
                  label="Delivery Date"
                  value={date}
                />

                <InfoRow
                  label="Delivery Time"
                  value={time}
                />
              </>
            )}

          </View>

          <View style={styles.statusBox}>
            <Text style={styles.statusTitle}>
              Current Status
            </Text>

            <Text style={styles.statusText}>
              {isEmergency
                ? 'Searching for the nearest delivery partner...'
                : 'Waiting for the scheduled delivery process.'}
            </Text>
          </View>

        </View>

      </View>
    </SafeAreaView>
  );
};

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
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    ...shadows.medium,
  },

  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.lightRed,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },

  icon: {
    fontSize: 42,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.black,
    textAlign: 'center',
  },

  subtitle: {
    color: colors.gray,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },

  infoBox: {
    backgroundColor: '#FAFAFA',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
  },

  label: {
    color: colors.gray,
    fontWeight: '600',
  },

  value: {
    color: colors.black,
    fontWeight: '700',
  },

  statusBox: {
    marginTop: spacing.lg,
    backgroundColor: '#FFF4F4',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },

  statusTitle: {
    color: colors.primaryRed,
    fontWeight: '700',
    marginBottom: 8,
  },

  statusText: {
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 22,
  },

});

export default WaitingScreen;