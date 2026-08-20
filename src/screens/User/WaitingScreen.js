import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

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
  const [request, setRequest] = useState(null);
const [loading, setLoading] = useState(true);

  const fetchLatestRequest = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    let response;

    if (type === "reservation") {
      response = await api.get("/reservation/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequest(response.data);

    } else {
      response = await api.get("/request/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.length > 0) {
        setRequest(response.data[response.data.length - 1]);
      }
    }

  } catch (error) {
    console.log("Failed to fetch latest data:", error);
  } finally {
    setLoading(false);
  }
};


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
  useEffect(() => {

  fetchLatestRequest();

  const interval = setInterval(() => {
    fetchLatestRequest();
  }, 5000);

  return () => clearInterval(interval);

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
  label="Patient"
  value={request?.patientName || "Loading..."}
/>

<InfoRow
  label="Hospital"
  value={request?.hospital || "Loading..."}
/>

<InfoRow
  label="Blood Group"
  value={request?.bloodGroup || "Loading..."}
/>

<InfoRow
  label="Units"
  value={request ? String(request.units) : "Loading..."}
/>
<InfoRow
  label="Status"
  value={request?.status || "Loading..."}
/>

            {!isEmergency && (
              <>
                <InfoRow
  label="Delivery Date"
  value={
    request?.reservationDate
      ? request.reservationDate
      : date
  }
/>

<InfoRow
  label="Delivery Time"
  value={
    request?.reservationTime
      ? request.reservationTime
      : time
  }
/>
              </>
            )}

          </View>

          <View style={styles.statusBox}>
            <Text style={styles.statusTitle}>
              Current Status
            </Text>

            <Text style={styles.statusText}>
  {request?.status === "REQUESTED" &&
    (type === "reservation"
      ? "Waiting for blood bank approval..."
      : "Searching for the nearest delivery partner...")}

  {request?.status === "ACCEPTED" &&
    (type === "reservation"
      ? "Blood bank accepted your reservation. Preparing blood units..."
      : "Blood bank accepted your request. Preparing blood units...")}

  {request?.status === "COMPLETED" &&
    "Blood delivered successfully."}
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